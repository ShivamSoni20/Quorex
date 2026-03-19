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
    'border-vault-amber/30 text-vault-amber bg-vault-amber/5',
    'border-vault-cyan/30 text-vault-cyan bg-vault-cyan/5',
    'border-white/10 text-vault-faint bg-white/5',
    'border-vault-rose/30 text-vault-rose bg-vault-rose/5',
    'border-vault-emerald/30 text-vault-emerald bg-vault-emerald/5',
    'border-vault-indigo/30 text-vault-indigo bg-vault-indigo/5',
    'border-white/10 text-vault-faint bg-white/5',
    'border-vault-cyan/30 text-vault-cyan bg-vault-cyan/5',
  ]

  const title = proposal.description.split('\n')[0].slice(0, 80)
  const forVotes = votes ? (votes as any)[1] : 0n
  const againstVotes = votes ? (votes as any)[0] : 0n
  const total = forVotes + againstVotes
  const forPercent = total > 0n ? Number((forVotes * 100n) / total) : 0

  return (
    <Link 
      to={`/app/governance/${proposal.proposalId.toString()}`}
      className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all block group relative overflow-hidden border-white/10 hover:-translate-y-1 duration-500"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-vault-cyan/5 blur-3xl -mr-12 -mt-12 group-hover:bg-vault-indigo/10 transition-colors duration-700"></div>
      
      <div className="flex justify-between items-center mb-5 relative z-10">
        <span className={`px-3 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border shadow-xl ${colors[state ?? 0]}`}>
          {states[state ?? 0]}
        </span>
        <span className="text-vault-faint text-[8px] font-mono font-black tracking-widest uppercase">ID: {proposal.proposalId.toString().slice(0, 8)}</span>
      </div>

      <h4 className="text-base sm:text-lg font-bold font-syne text-white mb-4 group-hover:text-vault-cyan transition-colors leading-tight relative z-10 uppercase tracking-tight">
        {title}{proposal.description.length > 80 ? '...' : ''}
      </h4>
      
      <div className="flex items-center gap-2 mb-6 relative z-10">
         <div className="w-5 h-5 rounded-md glass border border-white/10 flex items-center justify-center text-[7px] text-vault-cyan italic font-black">
            Q
         </div>
         <span className="text-vault-muted text-[8px] font-black uppercase tracking-widest">{formatAddress(proposal.proposer)}</span>
      </div>

      <div className="space-y-3 relative z-10 border-t border-white/5 pt-4">
        <div className="flex justify-between text-[8px] font-black uppercase tracking-[0.3em]">
          <span className="text-vault-cyan italic">Approval {forPercent}%</span>
          <span className="text-vault-rose italic">Dissent {100 - forPercent}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex shadow-inner">
          <div className="h-full bg-gradient-to-r from-vault-indigo to-vault-cyan shadow-[0_0_10px_rgba(34,211,238,0.4)] transition-all duration-1000" style={{ width: `${forPercent}%` }}></div>
          <div className="h-full bg-vault-rose/40 shadow-[0_0_10px_rgba(251,113,133,0.3)] transition-all duration-1000" style={{ width: `${100 - forPercent}%` }}></div>
        </div>
      </div>
    </Link>
  )
}
