const fetch = require('like-fetch')
const Xache = require('xache')
const { jsonrepair } = require('jsonrepair')

class Chainlist {
  constructor () {
    this._cacheIcons = new Xache({ maxSize: 8192, maxAge: 7 * 86400 })
  }

  async list () {
    return fetch('https://chainid.network/chains.json', { responseType: 'json' })
  }

  async networks () {
    const response = await fetch('https://raw.githubusercontent.com/DefiLlama/chainlist/main/constants/extraRpcs.js')
    const file = await response.text()

    const match = file.match(/extraRpcs = ({[\s\S]+});/i)

    if (!match || !match[1]) {
      throw new Error('Could not match extra RPCs')
    }

    let extraRpcs = match[1].replace(/.*trackingDetails:.*/ig, '')
    // extraRpcs = extraRpcs.replace(/(\n)([\s]+\/\/.*)/ig, '$1') // Remove comments
    // extraRpcs = extraRpcs.replace(/(.*?),\s*(\}|])/g, "$1$2") // Remove trailing commas
    extraRpcs = jsonrepair(extraRpcs) // Fixes quotes (also comments and trailing commas as well)
    extraRpcs = JSON.parse(extraRpcs)

    for (const id in extraRpcs) {
      extraRpcs[id] = extraRpcs[id].rpcs.map(rpc => rpc.url || rpc)
    }

    return extraRpcs
  }

  async icon (name) {
    if (this._cacheIcons.has(name)) return this._cacheIcons.get(name)

    const response = await fetch('https://icons.llamao.fi/icons/chains/rsz_' + name + '.jpg')
    const data = response.status === 200 ? await response.arrayBuffer() : null

    const buf = data ? Buffer.from(data) : null

    this._cacheIcons.set(name, buf)

    return buf
  }
}

module.exports = new Chainlist()
