import { polkadotHubTestnet } from './chains'

export const ADDRESSES = {
  [polkadotHubTestnet.id]: {
    VAULT_TOKEN:      import.meta.env.VITE_VAULT_TOKEN_ADDRESS as `0x${string}`,
    VAULT_GOVERNOR:   import.meta.env.VITE_VAULT_GOVERNOR_ADDRESS as `0x${string}`,
    VAULT_TIMELOCK:   import.meta.env.VITE_VAULT_TIMELOCK_ADDRESS as `0x${string}`,
    GOVERNED_VAULT:   import.meta.env.VITE_GOVERNED_VAULT_ADDRESS as `0x${string}`,
    MOCK_STRATEGY_A:  import.meta.env.VITE_MOCK_STRATEGY_A_ADDRESS as `0x${string}`,
    MOCK_STRATEGY_B:  import.meta.env.VITE_MOCK_STRATEGY_B_ADDRESS as `0x${string}`,
    ASSET_TOKEN:     import.meta.env.VITE_ASSET_TOKEN_ADDRESS as `0x${string}`,
  }
} as const

export const getAddresses = (chainId: number) => {
  return ADDRESSES[chainId as keyof typeof ADDRESSES] || ADDRESSES[polkadotHubTestnet.id]
}
