# like-chainlist

Get RPC providers for any blockchain

```
npm i like-chainlist
```

Depends on third-party API requests. Open an issue if it breaks, will fix.

## Usage

```js
const chainlist = require('like-chainlist')

const list = await chainlist.list()
// => [{ name, chain, icon, chainId, networkId, nativeCurrency, rpc, explorers }]

const selected = list.find(c => c.name === 'Ethereum Mainnet')

const networks = await chainlist.networks()
const rpcs = networks[selected.chainId]
// => ['https://...']

const image = await chainlist.icon(selected.icon)
// => <Buffer ...> or null
```

The `list()` and `networks()` uses different remote APIs.

You might get `networks` that are not in the `list`, and vice versa.

For common networks you should always have a match.

## License

MIT
