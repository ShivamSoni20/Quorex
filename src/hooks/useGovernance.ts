import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { VaultGovernorABI } from '../abis/VaultGovernor.abi'
import { getAddresses } from '../constants/addresses'
import { polkadotHubTestnet } from '../constants/chains'

export function useGovernance() {
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  const governorConfig = {
    address: addresses.VAULT_GOVERNOR,
    abi: VaultGovernorABI,
  }

  const { writeContract: write, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({ hash })

  const castVote = (proposalId: bigint, support: number) => {
    write({
      ...governorConfig,
      functionName: 'castVote',
      args: [proposalId, support as any],
    })
  }

  const propose = (targets: string[], values: bigint[], calldatas: `0x${string}`[], description: string) => {
    write({
      ...governorConfig,
      functionName: 'propose',
      args: [targets as `0x${string}`[], values, calldatas, description],
    })
  }

  const queue = (targets: string[], values: bigint[], calldatas: `0x${string}`[], descriptionHash: `0x${string}`) => {
    write({
      ...governorConfig,
      functionName: 'queue',
      args: [targets as `0x${string}`[], values, calldatas, descriptionHash],
    })
  }

  const execute = (targets: string[], values: bigint[], calldatas: `0x${string}`[], descriptionHash: `0x${string}`) => {
    write({
      ...governorConfig,
      functionName: 'execute',
      args: [targets as `0x${string}`[], values, calldatas, descriptionHash],
    })
  }

  return {
    write: {
      castVote,
      propose,
      queue,
      execute,
      isPending: isPending || isWaiting,
      isSuccess,
      hash,
      error,
    }
  }
}

export function useProposalState(proposalId: bigint) {
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  return useReadContract({
    address: addresses.VAULT_GOVERNOR,
    abi: VaultGovernorABI,
    functionName: 'state',
    args: [proposalId],
  })
}

export function useProposalVotes(proposalId: bigint) {
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  return useReadContract({
    address: addresses.VAULT_GOVERNOR,
    abi: VaultGovernorABI,
    functionName: 'proposalVotes',
    args: [proposalId],
  })
}

export function useHasVoted(proposalId: bigint, userAddress: `0x${string}`) {
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  return useReadContract({
    address: addresses.VAULT_GOVERNOR,
    abi: VaultGovernorABI,
    functionName: 'hasVoted',
    args: [proposalId, userAddress],
    query: { enabled: !!userAddress },
  })
}
