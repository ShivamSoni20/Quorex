import { useEffect, useState } from 'react'
import { usePublicClient } from 'wagmi'
import { parseAbiItem } from 'viem'
import { getAddresses } from '../constants/addresses'
import { polkadotHubTestnet } from '../constants/chains'

export type ProposalEvent = {
  proposalId: bigint
  proposer: `0x${string}`
  targets: `0x${string}`[]
  values: bigint[]
  calldatas: `0x${string}`[]
  voteStart: bigint
  voteEnd: bigint
  description: string
}

const MOCK_PROPOSALS: ProposalEvent[] = [
  {
    proposalId: 1n,
    proposer: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 100n,
    voteEnd: 999999999n,
    description: 'Rotate to Mock Strategy B (8.1% APY)\n\nThis proposal rotates our active yield strategy from Strategy A to Strategy B to capture higher DOT staking yields available on the Polkadot Hub. Risk assessment is Low.'
  },
  {
    proposalId: 2n,
    proposer: '0x1234567890123456789012345678901234567890',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 200n,
    voteEnd: 999999999n,
    description: 'Stabilize Yield with Strategy A\n\nRecent volatility in Polkadot Hub rewards suggests it is safer to revert to Strategy A temporarily. AI analysis indicates a 0.5% lower risk profile for this change.'
  }
]

export function useProposals() {
  const [proposals, setProposals] = useState<ProposalEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const publicClient = usePublicClient()
  const addresses = getAddresses(polkadotHubTestnet.id)

  useEffect(() => {
    async function fetchProposals() {
      // Always clear first
      setIsLoading(true)

      try {
        if (!publicClient) throw new Error("No public client")
        
        const logs = await publicClient.getLogs({
          address: addresses.VAULT_GOVERNOR,
          event: parseAbiItem(
            'event ProposalCreated(uint256 proposalId, address proposer, address[] targets, uint256[] values, string[] signatures, bytes[] calldatas, uint256 voteStart, uint256 voteEnd, string description)'
          ),
          fromBlock: BigInt(import.meta.env.VITE_DEPLOY_BLOCK || '0'),
          toBlock: 'latest',
        })

        if (!logs || logs.length === 0) {
          throw new Error("No logs found, using mocks")
        }

        const fetched = logs.map(log => {
          const { proposalId, proposer, targets, values, calldatas, voteStart, voteEnd, description } = log.args as any
          return {
            proposalId,
            proposer,
            targets,
            values,
            calldatas,
            voteStart,
            voteEnd,
            description,
          }
        })

        setProposals(fetched.reverse())
      } catch (e) {
        console.warn("Falling back to mock proposals due to RPC issue:", e)
        setProposals(MOCK_PROPOSALS)
        setError(e as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposals()
  }, [publicClient, addresses.VAULT_GOVERNOR])

  return { proposals, isLoading, error }
}
