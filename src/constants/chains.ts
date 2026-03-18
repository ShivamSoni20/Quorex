import { defineChain } from 'viem'

// Based on the prompt: https://polkadot-hub-testnet.drpc.org
// Chain ID is TBD, we will use a common placeholder or try to detect it.
// Many Polkadot Hub testnets use 1002 or similar, but we'll use a configurable constant.
export const polkadotHubTestnet = defineChain({
  id: Number(import.meta.env.VITE_CHAIN_ID) || 420420417,
  name: 'Polkadot Hub Testnet',
  nativeCurrency: { name: 'DOT', symbol: 'DOT', decimals: 18 },
  rpcUrls: {
    default: { http: [import.meta.env.VITE_POLKADOT_HUB_TESTNET_RPC || 'https://eth-rpc-testnet.polkadot.io'] },
  },
  blockExplorers: {
    default: { name: 'SocialScan', url: 'https://polkadot-hub-testnet.socialscan.io' },
  },
  testnet: true,
})
