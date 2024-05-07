const test = require('brittle')
const chainlist = require('./index.js')

test('list', async function (t) {
  t.plan(10)

  const list = await chainlist.list()

  const chain = list.find(chain => chain.name === 'Ethereum Mainnet')

  t.is(chain.name, 'Ethereum Mainnet')
  t.is(chain.chain, 'ETH')
  t.is(chain.icon, 'ethereum')

  t.is(chain.chainId, 1)
  t.is(chain.networkId, 1)

  t.is(chain.nativeCurrency.name, 'Ether')
  t.is(chain.nativeCurrency.symbol, 'ETH')
  t.is(chain.nativeCurrency.decimals, 18)

  t.ok(chain.rpc.length > 0)
  t.ok(chain.explorers.length > 0)
})

test('networks', async function (t) {
  t.plan(1)

  const networks = await chainlist.networks()
  const rpcs = networks[1] // Chain ID of Ethereum

  t.ok(rpcs.length > 0)
})

test('icon', async function (t) {
  t.plan(2)

  const image = await chainlist.icon('ethereum')
  t.ok(image.byteLength > 128)

  const image2 = await chainlist.icon('this-does-not-exists')
  t.is(image2, null)
})
