import React from 'react'
import { useProposalVotes } from '../../hooks/useGovernance'
import { formatDOT } from '../../utils/format'

interface VoteTallyProps {
  proposalId: string
}

export const VoteTally: React.FC<VoteTallyProps> = ({ proposalId }) => {
  const { data: votes, isLoading } = useProposalVotes(BigInt(proposalId))
  
  // votes is typically [against, for, abstain]
  const againstVotes = votes ? (votes as any)[0] : 0n
  const forVotes = votes ? (votes as any)[1] : 0n
  const abstainVotes = votes ? (votes as any)[2] : 0n

  const total = forVotes + againstVotes + abstainVotes
  const getPercent = (val: bigint) => total > 0n ? Number((val * 100n) / total) : 0
  
  const forP = getPercent(forVotes)
  const againstP = getPercent(againstVotes)
  const abstainP = getPercent(abstainVotes)

  if (isLoading) return <div className="h-24 bg-vault-bg3/20 animate-pulse rounded-xl"></div>

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-vault-teal">For ({forP}%)</span>
          <span className="text-vault-text font-mono">{formatDOT(forVotes, 18)}</span>
        </div>
        <div className="h-2.5 w-full bg-vault-bg3 rounded-full overflow-hidden relative shadow-inner">
           <div className="h-full bg-vault-teal shadow-[0_0_15px_rgba(45,212,160,0.4)] transition-all duration-1000" style={{ width: `${forP}%` }}></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-vault-red">Against ({againstP}%)</span>
          <span className="text-vault-text font-mono">{formatDOT(againstVotes, 18)}</span>
        </div>
        <div className="h-2.5 w-full bg-vault-bg3 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-vault-red shadow-[0_0_15px_rgba(226,75,74,0.4)] transition-all duration-1000" style={{ width: `${againstP}%` }}></div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
          <span className="text-vault-muted">Abstain ({abstainP}%)</span>
          <span className="text-vault-text font-mono">{formatDOT(abstainVotes, 18)}</span>
        </div>
        <div className="h-2.5 w-full bg-vault-bg3 rounded-full overflow-hidden shadow-inner">
           <div className="h-full bg-vault-muted/30 transition-all duration-1000" style={{ width: `${abstainP}%` }}></div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-vault-border/50">
        <div className="flex justify-between items-center text-[10px] text-vault-faint uppercase tracking-widest">
          <span>Total Votes</span>
          <span className="font-mono">{formatDOT(total, 18)} VAULT</span>
        </div>
      </div>
    </div>
  )
}
