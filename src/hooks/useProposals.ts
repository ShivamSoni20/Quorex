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
    proposalId: 1004n,
    proposer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 100n,
    voteEnd: 999999999n,
    description: 'BILATERALPROOF: GRANT MINTER RISK_ADMIN RELAY_CALLER TO DEPLOYER FOR BILATERAL A...\n\nThis security-focused proposal grants the Risk Admin role to the main deployer address for the Bilateral A adapter within the PVM security framework.'
  },
  {
    proposalId: 1003n,
    proposer: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 200n,
    voteEnd: 999999999n,
    description: 'INCREASE DOT DEBT CEILING TO 20M PUSD [SEED 2026-03-20T14:35:32Z]\n\nFinancial parameter update to increase the maximum DOT allowed for debt collateral within the Polkadot Hub vaults by 5M tokens.'
  },
  {
    proposalId: 1002n,
    proposer: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 300n,
    voteEnd: 999999999n,
    description: 'V2 REGISTRATION: REGISTER+ACTIVATE MARKET V2, WIRE ROUTER ROLE, SET ORACLE MAXAG...\n\nMigration infrastructure: Registering the V2 market contracts and configuring oracle safety parameters for native Polkadot liquidity.'
  },
  {
    proposalId: 1001n,
    proposer: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 400n,
    voteEnd: 999999999n,
    description: 'ROTATE TO MOCK STRATEGY B (8.1% APY)\n\nCapturing higher yield opportunities on Polkadot Hub through Strategy B. AI Consensus verified: 98/100 Safety Score.'
  },
  {
    proposalId: 1000n,
    proposer: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
    targets: ['0x0000000000000000000000000000000000000000'],
    values: [0n],
    calldatas: ['0x' as `0x${string}`],
    voteStart: 500n,
    voteEnd: 999999999n,
    description: 'MIGRATION PROOF: WIRE MARKET V2, REGISTER, ACTIVATE, GRANT COORDINATOR ADMIN, OPEN ROUTER...\n\nFinalizing the V2 infrastructure rollout across the GovernedVault ecosystem.'
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
