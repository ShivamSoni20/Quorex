import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { VaultTokenABI } from '../abis/VaultToken.abi'
import { getAddresses } from '../constants/addresses'
import { polkadotHubTestnet } from '../constants/chains'

export function useVaultToken() {
  const { address } = useAccount()
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  const tokenConfig = {
    address: addresses.VAULT_TOKEN,
    abi: VaultTokenABI,
  }

  const balance = useReadContract({
    ...tokenConfig,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address },
  })

  const votingPower = useReadContract({
    ...tokenConfig,
    functionName: 'getVotes',
    args: [address!],
    query: { enabled: !!address },
  })

  const delegatee = useReadContract({
    ...tokenConfig,
    functionName: 'delegates',
    args: [address!],
    query: { enabled: !!address },
  })

  const { writeContract: write, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({ hash })

  const delegate = (target: string) => {
    write({
      ...tokenConfig,
      functionName: 'delegate',
      args: [target as `0x${string}`],
    })
  }

  return {
    balance: balance.data,
    votingPower: votingPower.data,
    delegatee: delegatee.data,
    isLoading: balance.isLoading || votingPower.isLoading,
    write: {
      delegate,
      isPending: isPending || isWaiting,
      isSuccess,
      hash,
      error,
    },
    refetch: () => {
      balance.refetch()
      votingPower.refetch()
      delegatee.refetch()
    }
  }
}
