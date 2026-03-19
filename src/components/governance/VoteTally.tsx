import React from 'react'
import { useProposalVotes } from '../../hooks/useGovernance'
import { formatDOT } from '../../utils/format'

interface VoteTallyProps {
  proposalId: string
}

export const VoteTally: React.FC<VoteTallyProps> = ({ proposalId }) => {
  const { data: votes, isLoading } = useProposalVotes(BigInt(proposalId))
  
  const againstVotes = votes ? (votes as any)[0] : 0n
  const forVotes = votes ? (votes as any)[1] : 0n
  const abstainVotes = votes ? (votes as any)[2] : 0n

  const total = forVotes + againstVotes + abstainVotes
  const getPercent = (val: bigint) => total > 0n ? Number((val * 100n) / total) : 0
  
  const forP = getPercent(forVotes)
  const againstP = getPercent(againstVotes)
  const abstainP = getPercent(abstainVotes)

  if (isLoading) return <div className="h-40 bg-white/5 animate-pulse rounded-[32px] border border-white/5 shadow-2xl"></div>

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] italic">
          <span className="text-vault-cyan">Ascent Consensus ({forP}%)</span>
          <span className="text-white font-mono">{formatDOT(forVotes, 18)} <span className="text-vault-faint text-[8px]">QX</span></span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative shadow-inner">
           <div className="h-full bg-gradient-to-r from-vault-indigo to-vault-cyan shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-1000" style={{ width: `${forP}%` }}></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] italic">
          <span className="text-vault-rose">Dissent Vector ({againstP}%)</span>
          <span className="text-white font-mono">{formatDOT(againstVotes, 18)} <span className="text-vault-faint text-[8px]">QX</span></span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-vault-rose/40 shadow-[0_0_20px_rgba(251,113,133,0.4)] transition-all duration-1000" style={{ width: `${againstP}%` }}></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] italic">
          <span className="text-vault-muted">Neutral Buffer ({abstainP}%)</span>
          <span className="text-white font-mono">{formatDOT(abstainVotes, 18)} <span className="text-vault-faint text-[8px]">QX</span></span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-white/10 transition-all duration-1000" style={{ width: `${abstainP}%` }}></div>
        </div>
      </div>

      <div className="pt-8 mt-8 border-t border-white/5 relative">
        <div className="flex justify-between items-center text-[10px] text-vault-faint font-black uppercase tracking-[0.4em] italic">
          <span>Aggregate Participation</span>
          <span className="font-mono text-white/60">{formatDOT(total, 18)} <span className="text-[8px] text-vault-faint">QX-VOTES</span></span>
        </div>
        {/* Decorative Internal Glow */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vault-indigo to-transparent opacity-20"></div>
      </div>
    </div>
  )
}
