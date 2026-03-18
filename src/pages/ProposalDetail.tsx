import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProposalState, useHasVoted, useGovernance } from '../hooks/useGovernance'
import { useProposals } from '../hooks/useProposals'
import { useAccount } from 'wagmi'
import { formatAddress } from '../utils/format'
import { decodeStrategyCalldata } from '../utils/proposals'
import { VoteTally } from '../components/governance/VoteTally'
import { TxButton } from '../components/shared/TxButton'
import { AIAnalysis } from '../components/governance/AIAnalysis'
import { keccak256, toBytes } from 'viem'

const ProposalDetail: React.FC = () => {
  const { proposalId } = useParams<{ proposalId: string }>()
  const { proposals } = useProposals()
  const { address } = useAccount()
  const { write } = useGovernance()

  const proposal = proposals.find(p => p.proposalId.toString() === proposalId)
  const idBigInt = BigInt(proposalId || '0')

  const { data: state } = useProposalState(idBigInt)
  const { data: voted } = useHasVoted(idBigInt, address!)

  if (!proposal) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-vault-muted text-lg font-syne italic">Proposal not found or still loading...</div>
      <Link to="/app/governance" className="text-vault-purple hover:underline text-sm font-bold">Return to Governance</Link>
    </div>
  )

  const decoded = decodeStrategyCalldata(proposal.calldatas[0])
  const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed']
  const stateLabel = states[state as number] || 'Unknown'

  const handleQueue = () => {
    const descriptionHash = keccak256(toBytes(proposal.description))
     write.queue(
      proposal.targets as string[],
      proposal.values as bigint[],
      proposal.calldatas as `0x${string}`[],
      descriptionHash
    )
  }

  const handleExecute = () => {
    const descriptionHash = keccak256(toBytes(proposal.description))
    write.execute(
      proposal.targets as string[],
      proposal.values as bigint[],
      proposal.calldatas as `0x${string}`[],
      descriptionHash
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      <Link to="/app/governance" className="inline-flex items-center gap-2 text-vault-muted hover:text-vault-text mb-8 group transition-colors">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back to Governance
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column (Main Info) */}
        <div className="flex-grow lg:w-[65%] space-y-8">
           <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                 <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                   state === 1 ? 'bg-vault-teal/20 text-vault-teal border border-vault-teal/30' :
                   state === 7 ? 'bg-vault-muted/20 text-vault-muted border border-vault-muted/30' : 
                   'bg-vault-purple/20 text-vault-purple border border-vault-purple/30'
                 }`}>
                   {stateLabel}
                 </span>
                 <span className="text-vault-faint text-xs font-mono">ID: {proposalId}</span>
              </div>
              <h1 className="text-2xl md:text-5xl font-bold font-syne text-vault-text leading-tight">
                {proposal.description.split('\n')[0]}
              </h1>
              <div className="flex items-center gap-2 text-vault-muted text-xs">
                <span>Proposed by</span>
                <span className="text-vault-faint font-mono">{formatAddress(proposal.proposer)}</span>
              </div>
           </div>

           {/* Execution Preview */}
           <div className="bg-vault-bg2 border border-vault-border rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-bold font-syne">Execution Details</h3>
              <div className="space-y-4">
                 <div className="bg-vault-bg p-4 rounded-xl border border-vault-border">
                    <p className="text-xs font-bold text-vault-muted uppercase tracking-widest mb-2">Target Address</p>
                    <code className="text-xs break-all text-vault-teal">{proposal.targets[0]}</code>
                 </div>
                 <div className="bg-vault-bg p-4 rounded-xl border border-vault-border overflow-hidden">
                    <p className="text-xs font-bold text-vault-muted uppercase tracking-widest mb-2">Decoded Action</p>
                    <div className="text-sm font-bold text-vault-purple">{decoded.action}</div>
                    <div className="text-xs text-vault-faint mt-1 truncate">{decoded.strategy}</div>
                 </div>
                 <div className="bg-vault-bg p-4 rounded-xl border border-vault-border">
                    <p className="text-xs font-bold text-vault-muted uppercase tracking-widest mb-2">Raw Calldata</p>
                    <code className="text-[10px] break-all text-vault-muted/50 leading-relaxed max-h-24 block overflow-y-auto no-scrollbar font-mono">
                      {proposal.calldatas[0]}
                    </code>
                 </div>
              </div>
           </div>

           {/* Rationale */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold font-syne">Rationale</h3>
              <div className="text-vault-muted text-sm md:text-base leading-relaxed whitespace-pre-wrap bg-vault-bg2/30 p-6 md:p-10 rounded-3xl border border-vault-border">
                 {proposal.description}
              </div>
           </div>

           {/* AI Insight (Hackathon winning feature) */}
           <div className="space-y-4">
              <h3 className="text-lg font-bold font-syne flex items-center gap-2">
                 AI Risk Analysis
                 <span className="text-[10px] px-2 py-0.5 bg-vault-teal/10 text-vault-teal rounded-full font-bold uppercase border border-vault-teal/20">Optional Tool</span>
              </h3>
              <AIAnalysis strategyName={decoded.action} apy="Variable" />
           </div>
        </div>

        {/* Right Column (Sidebar/Card) */}
        <div className="lg:w-[35%] space-y-8">
           <div className="lg:sticky lg:top-24 space-y-8">
              <div className="bg-vault-bg2 border border-vault-border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-vault-purple/5 blur-3xl -mr-16 -mt-16 group-hover:bg-vault-purple/10 transition-colors"></div>
                 <h3 className="text-lg font-bold mb-6 font-syne">Vote Tally</h3>
                 <VoteTally proposalId={proposalId as string} />
                 
                 {state === 1 && (
                   <div className="space-y-4 mt-8">
                     {!voted ? (
                       <div className="grid grid-cols-2 gap-3">
                         <TxButton 
                           onClick={() => write.castVote(idBigInt, 1)}
                           isPending={write.isPending}
                           isSuccess={write.isSuccess}
                           error={write.error}
                           label="FOR"
                           variant="secondary"
                           className="py-4"
                         />
                         <TxButton 
                           onClick={() => write.castVote(idBigInt, 0)}
                           isPending={write.isPending}
                           isSuccess={write.isSuccess}
                           error={write.error}
                           label="AGAINST"
                           variant="danger"
                           className="py-4"
                         />
                       </div>
                     ) : (
                       <div className="p-4 bg-vault-teal/10 border border-vault-teal/20 rounded-xl text-center">
                          <p className="text-vault-teal font-bold text-sm flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Vote Cast Recorded
                          </p>
                       </div>
                     )}
                   </div>
                 )}

                 {/* Queue/Execute Controls */}
                 {state === 4 && (
                   <div className="mt-8">
                      <TxButton 
                        onClick={handleQueue}
                        isPending={write.isPending}
                        isSuccess={write.isSuccess}
                        error={write.error}
                        label="Queue in Timelock"
                        className="w-full py-4"
                      />
                   </div>
                 )}
                 {state === 5 && (
                   <div className="mt-8">
                      <TxButton 
                        onClick={handleExecute}
                        isPending={write.isPending}
                        isSuccess={write.isSuccess}
                        error={write.error}
                        label="Execute Strategy"
                        variant="secondary"
                        className="w-full py-4 text-vault-bg"
                      />
                   </div>
                 )}
              </div>

              <div className="bg-vault-bg2/50 border border-vault-border rounded-3xl p-6">
                 <h4 className="text-xs font-bold text-vault-muted uppercase tracking-widest mb-4">Governance Rules</h4>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-xs text-vault-muted">
                       <span className="w-1.5 h-1.5 rounded-full bg-vault-purple"></span>
                       Voting Period: 1 Day
                    </li>
                    <li className="flex items-center gap-2 text-xs text-vault-muted">
                       <span className="w-1.5 h-1.5 rounded-full bg-vault-purple"></span>
                       Quorum: 4% of total supply
                    </li>
                    <li className="flex items-center gap-2 text-xs text-vault-muted">
                       <span className="w-1.5 h-1.5 rounded-full bg-vault-teal"></span>
                       Timelock Delay: 48 Hours
                    </li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalDetail
