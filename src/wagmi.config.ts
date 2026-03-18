import { createConfig, http } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { polkadotHubTestnet } from './constants/chains'

export const wagmiConfig = createConfig({
  chains: [polkadotHubTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [polkadotHubTestnet.id]: http(),
  },
})
