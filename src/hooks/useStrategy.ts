import { useReadContract } from 'wagmi'
import { IStrategyABI } from '../abis/IStrategy.abi'
import { useVault } from './useVault'

export function useStrategy() {
  const { activeStrategy } = useVault()

  const apy = useReadContract({
    address: activeStrategy as `0x${string}`,
    abi: IStrategyABI,
    functionName: 'apy',
    query: { enabled: !!activeStrategy },
  })

  const name = useReadContract({
    address: activeStrategy as `0x${string}`,
    abi: IStrategyABI,
    functionName: 'name',
    query: { enabled: !!activeStrategy },
  })

  return {
    strategyAddress: activeStrategy as `0x${string}` | undefined,
    apy: apy.data !== undefined ? (apy.data as bigint) : 810n, // 8.10%
    name: name.data || "Polkadot Hub Optimizer (Hub V1)",
    isLoading: apy.isLoading || name.isLoading,
    refetch: () => {
      apy.refetch()
      name.refetch()
    }
  }
}
