import { createPublicClient, http } from 'viem'
import { polkadotHubTestnet } from '../constants/chains'

export const publicClient = createPublicClient({
  chain: polkadotHubTestnet,
  transport: http(import.meta.env.VITE_POLKADOT_HUB_TESTNET_RPC || 'https://testnet-passet-hub-eth-rpc.polkadot.io'),
})
