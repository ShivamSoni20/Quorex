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
      to={`/app/governance/${proposal.proposalId.toString()}`}
      className="bg-vault-bg2 border border-white/5 rounded-[32px] p-8 hover:bg-white/5 transition-all block group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-vault-purple/5 blur-3xl -mr-16 -mt-16 group-hover:bg-vault-purple/10 transition-colors"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[state ?? 0]}`}>
          {states[state ?? 0]}
        </span>
        <span className="text-vault-faint text-[10px] font-mono font-bold tracking-widest">#{proposal.proposalId.toString().slice(0, 8)}</span>
      </div>

      <h4 className="text-xl font-black font-syne text-white mb-4 group-hover:text-vault-purple transition-colors leading-tight relative z-10">
        {title}{proposal.description.length > 80 ? '...' : ''}
      </h4>
      
      <div className="flex items-center gap-2 mb-8 relative z-10">
         <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-vault-purple"></div>
         </div>
         <span className="text-vault-muted text-[10px] font-bold uppercase tracking-widest">{formatAddress(proposal.proposer)}</span>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between text-[10px] text-vault-muted uppercase font-black tracking-[0.2em]">
          <span className="text-vault-teal">For {forPercent}%</span>
          <span className="text-vault-red">Against {100 - forPercent}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex">
          <div className="h-full bg-vault-teal shadow-[0_0_10px_rgba(163,230,53,0.5)]" style={{ width: `${forPercent}%` }}></div>
          <div className="h-full bg-vault-red shadow-[0_0_10px_rgba(255,75,92,0.5)]" style={{ width: `${100 - forPercent}%` }}></div>
        </div>
      </div>
    </Link>
  )
}
