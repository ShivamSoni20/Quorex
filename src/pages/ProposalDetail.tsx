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
    <div className="mesh-bg min-h-screen flex flex-col items-center justify-center p-8">
      <div className="glass-card p-10 text-center rounded-3xl sm:rounded-[40px] border-white/10">
        <div className="text-vault-muted text-base font-syne italic uppercase tracking-[0.2em] mb-6">Node Desynchronized</div>
        <Link to="/app/governance" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-[10px]">Re-establish Connection</Link>
      </div>
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
    <div className="mesh-bg min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-10 selection:bg-vault-indigo/30">
      <div className="max-w-[1200px] mx-auto">
        <Link to="/app/governance" className="inline-flex items-center gap-3 text-vault-muted hover:text-white mb-8 group transition-all text-[9px] font-black uppercase tracking-[0.3em]">
          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-vault-cyan transition-colors">
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </div>
          Return to Ledger
        </Link>

        <div className="flex flex-col xl:flex-row gap-10 items-start">
          {/* Left Column */}
          <div className="flex-grow xl:w-[65%] space-y-10 min-w-0">
             <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                   <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] glass ${
                     state === 1 ? 'border-vault-cyan text-vault-cyan' :
                     state === 7 ? 'border-vault-muted text-vault-muted' : 
                     'border-vault-indigo text-vault-indigo'
                   }`}>
                     {stateLabel}
                   </div>
                   <span className="text-vault-muted text-[9px] font-mono font-black uppercase tracking-widest bg-white/5 px-3 py-1.5 border border-white/5 rounded-lg">Index: {proposalId}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne text-white leading-tight tracking-tighter uppercase italic">
                  {proposal.description.split('\n')[0]}
                </h1>
                <div className="flex items-center gap-3 text-vault-muted text-[9px] font-black uppercase tracking-widest">
                  <div className="w-6 h-6 rounded-full glass border border-white/10 flex items-center justify-center text-vault-cyan italic text-[9px]">Q</div>
                  <span>Proposed by <span className="text-white font-mono">{formatAddress(proposal.proposer)}</span></span>
                </div>
             </div>

             {/* Execution Preview */}
             <div className="glass-card rounded-3xl sm:rounded-[40px] p-6 sm:p-8 space-y-6 border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-vault-indigo/5 blur-[80px] -mr-24 -mt-24 transition-colors group-hover:bg-vault-cyan/5"></div>
                <h3 className="text-lg sm:text-xl font-black font-syne text-white uppercase italic tracking-tighter border-b border-white/5 pb-3">Execution Protocol</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                   <div className="glass p-4 sm:p-5 rounded-2xl border border-white/5 space-y-2">
                      <p className="text-[8px] font-black text-vault-faint uppercase tracking-[0.2em] italic">Target Authority</p>
                      <code className="text-[10px] break-all text-vault-cyan font-mono">{proposal.targets[0]}</code>
                   </div>
                   <div className="glass p-4 sm:p-5 rounded-2xl border border-white/5 space-y-2">
                      <p className="text-[8px] font-black text-vault-faint uppercase tracking-[0.2em] italic">Operation Type</p>
                      <div className="text-sm font-black text-white uppercase tracking-tighter">{decoded.action}</div>
                   </div>
                   <div className="sm:col-span-2 glass p-4 sm:p-5 rounded-2xl border border-white/5 space-y-3">
                      <p className="text-[8px] font-black text-vault-faint uppercase tracking-[0.2em] italic">Raw Payload Stream</p>
                      <code className="text-[9px] break-all text-vault-muted/40 leading-relaxed max-h-24 block overflow-y-auto no-scrollbar font-mono uppercase">
                        {proposal.calldatas[0]}
                      </code>
                   </div>
                </div>
             </div>

             {/* Rationale */}
             <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-black font-syne text-white uppercase italic tracking-tighter">Proposition Details</h3>
                <div className="text-vault-muted text-sm leading-relaxed whitespace-pre-wrap glass p-6 sm:p-8 rounded-3xl sm:rounded-[40px] border border-white/5 font-light tracking-wider">
                   {proposal.description}
                </div>
             </div>

             {/* AI Insight */}
             <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                   <h3 className="text-lg sm:text-xl font-black font-syne text-white uppercase italic tracking-tighter flex items-center gap-3">
                      AI Risk Assessment
                      <span className="animate-pulse w-2 h-2 rounded-full bg-vault-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]"></span>
                   </h3>
                   <span className="text-[8px] px-3 py-1 bg-vault-cyan/10 text-vault-cyan rounded-full font-black uppercase border border-vault-cyan/20 tracking-widest italic">Secure</span>
                </div>
                <AIAnalysis strategyName={decoded.action} apy="Variable" />
             </div>
          </div>

          {/* Right Column */}
          <div className="w-full xl:w-[380px] space-y-8 xl:sticky xl:top-28">
             <div className="glass-card rounded-3xl sm:rounded-[40px] p-6 sm:p-8 shadow-2xl relative overflow-hidden group border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-vault-indigo/5 blur-3xl -mr-16 -mt-16 group-hover:bg-vault-indigo/10 transition-colors duration-1000"></div>
                <h3 className="text-lg sm:text-xl font-black mb-6 font-syne text-white uppercase italic tracking-tighter border-b border-white/5 pb-3">Consensus Tally</h3>
                <VoteTally proposalId={proposalId as string} />
                
                {state === 1 && (
                  <div className="space-y-4 mt-8 pt-6 border-t border-white/5">
                    {!voted ? (
                      <div className="grid grid-cols-1 gap-3">
                        <TxButton 
                          onClick={() => write.castVote(idBigInt, 1)}
                          isPending={write.isPending}
                          isSuccess={write.isSuccess}
                          error={write.error}
                          label="APPROVE PROPOSAL"
                          variant="primary"
                          className="py-4 rounded-2xl"
                        />
                        <TxButton 
                          onClick={() => write.castVote(idBigInt, 0)}
                          isPending={write.isPending}
                          isSuccess={write.isSuccess}
                          error={write.error}
                          label="REJECT PROPOSAL"
                          variant="danger"
                          className="py-4 rounded-2xl"
                        />
                      </div>
                    ) : (
                      <div className="p-6 bg-vault-cyan/5 border border-vault-cyan/20 rounded-2xl text-center shadow-2xl">
                         <p className="text-vault-cyan font-black text-[10px] flex items-center justify-center gap-2 uppercase tracking-[0.15em] italic">
                           <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           Consensus Signature Recorded
                         </p>
                      </div>
                    )}
                  </div>
                )}

                {state === 4 && (
                  <div className="mt-8">
                     <TxButton onClick={handleQueue} isPending={write.isPending} isSuccess={write.isSuccess} error={write.error} label="Queue in Timelock" className="w-full py-4 rounded-2xl" />
                  </div>
                )}
                {state === 5 && (
                  <div className="mt-8">
                     <TxButton onClick={handleExecute} isPending={write.isPending} isSuccess={write.isSuccess} error={write.error} label="Execute Strategy" variant="secondary" className="w-full py-4 rounded-2xl text-black font-black" />
                  </div>
                )}
             </div>

             <div className="glass rounded-3xl sm:rounded-[40px] p-6 sm:p-8 border border-white/5 relative overflow-hidden">
                <h4 className="text-[9px] font-black text-vault-faint uppercase tracking-[0.3em] mb-6 italic border-b border-white/5 pb-3">Operational Parameters</h4>
                <ul className="space-y-4">
                   <li className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Voting Window</span>
                      <span className="text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5 font-mono text-[9px]">24 Hours</span>
                   </li>
                   <li className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Quorum</span>
                      <span className="text-white bg-white/5 px-3 py-1 rounded-lg border border-white/5 font-mono text-[9px]">40.0 QX</span>
                   </li>
                   <li className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Execution Delay</span>
                      <span className="text-vault-indigo bg-vault-indigo/5 px-3 py-1 rounded-lg border border-vault-indigo/10 font-mono text-[9px]">48 Hours</span>
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
