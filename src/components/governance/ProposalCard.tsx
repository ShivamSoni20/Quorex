import React from 'react'
import { Link } from 'react-router-dom'
import { useProposalState, useProposalVotes } from '../../hooks/useGovernance'
import { formatAddress } from '../../utils/format'
import type { ProposalEvent } from '../../hooks/useProposals'

interface ProposalCardProps {
  proposal: ProposalEvent
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {
  const { data: state } = useProposalState(proposal.proposalId)
  const { data: votes } = useProposalVotes(proposal.proposalId)

  const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed']
  const colors = [
    'bg-vault-amber/20 text-vault-amber border-vault-amber/30',
    'bg-vault-teal/20 text-vault-teal border-vault-teal/30',
    'bg-vault-faint/20 text-vault-faint border-vault-faint/30',
    'bg-vault-red/20 text-vault-red border-vault-red/30',
    'bg-vault-teal/20 text-vault-teal border-vault-teal/30',
    'bg-vault-amber/20 text-vault-amber border-vault-amber/30',
    'bg-vault-faint/20 text-vault-faint border-vault-faint/30',
    'bg-vault-purple/20 text-vault-purple border-vault-purple/30',
  ]

  const title = proposal.description.split('\n')[0].slice(0, 80)
  const forVotes = votes ? (votes as any)[1] : 0n
  const againstVotes = votes ? (votes as any)[0] : 0n
  const total = forVotes + againstVotes
  const forPercent = total > 0n ? Number((forVotes * 100n) / total) : 0

  return (
    <Link 
      to={`/governance/${proposal.proposalId.toString()}`}
      className="bg-vault-bg2 border border-vault-border rounded-xl p-5 hover:border-vault-purple/50 transition-all block group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${colors[state ?? 0]}`}>
          {states[state ?? 0]}
        </span>
        <span className="text-vault-faint text-[10px] font-mono">ID: {proposal.proposalId.toString().slice(0, 8)}...</span>
      </div>

      <h4 className="text-lg font-bold text-vault-text mb-2 group-hover:text-vault-purple transition-colors">
        {title}{proposal.description.length > 80 ? '...' : ''}
      </h4>
      
      <p className="text-vault-muted text-xs mb-4">
        Proposer: {formatAddress(proposal.proposer)}
      </p>

      <div className="space-y-3">
        <div className="flex justify-between text-[10px] text-vault-muted uppercase font-bold">
          <span>For ({forPercent}%)</span>
          <span>Against ({100 - forPercent}%)</span>
        </div>
        <div className="h-1.5 w-full bg-vault-bg shadow-inner rounded-full overflow-hidden flex">
          <div className="h-full bg-vault-teal" style={{ width: `${forPercent}%` }}></div>
          <div className="h-full bg-vault-red" style={{ width: `${100 - forPercent}%` }}></div>
        </div>
      </div>
    </Link>
  )
}
