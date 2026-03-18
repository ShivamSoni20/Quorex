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
    apy: apy.data as bigint | undefined,
    name: name.data as string | undefined,
    isLoading: apy.isLoading || name.isLoading,
    refetch: () => {
      apy.refetch()
      name.refetch()
    }
  }
}
