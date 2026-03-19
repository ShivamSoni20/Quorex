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
    <div className="mesh-bg min-h-screen flex flex-col items-center justify-center p-12">
      <div className="glass-card p-12 text-center rounded-[48px] border-white/10">
        <div className="text-vault-muted text-lg font-syne italic uppercase tracking-[0.3em] mb-8">Node Desynchronized</div>
        <Link to="/app/governance" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-xs">Re-establish Connection</Link>
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
    <div className="mesh-bg min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-vault-indigo/30">
      <div className="max-w-[1400px] mx-auto">
        <Link to="/app/governance" className="inline-flex items-center gap-4 text-vault-muted hover:text-white mb-12 group transition-all text-[10px] font-black uppercase tracking-[0.4em]">
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-vault-cyan transition-colors">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
          </div>
          Return to Ledger
        </Link>

        <div className="flex flex-col xl:flex-row gap-16 items-start">
          {/* Left Column (Main Info) */}
          <div className="flex-grow xl:w-[65%] space-y-16">
             <div className="space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                   <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] glass ${
                     state === 1 ? 'border-vault-cyan text-vault-cyan' :
                     state === 7 ? 'border-vault-muted text-vault-muted' : 
                     'border-vault-indigo text-vault-indigo'
                   }`}>
                     {stateLabel}
                   </div>
                   <span className="text-vault-muted text-[10px] font-mono font-black uppercase tracking-widest bg-white/5 px-4 py-2 border border-white/5 rounded-xl">Index: {proposalId}</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-syne text-white leading-none tracking-tighter uppercase italic">
                  {proposal.description.split('\n')[0]}
                </h1>
                <div className="flex items-center gap-4 text-vault-muted text-[10px] font-black uppercase tracking-widest">
                  <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-vault-cyan italic">Q</div>
                  <span>Proposed by <span className="text-white font-mono">{formatAddress(proposal.proposer)}</span></span>
                </div>
             </div>

             {/* Execution Preview */}
             <div className="glass-card rounded-[48px] p-10 space-y-10 border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-vault-indigo/5 blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-vault-cyan/5"></div>
                <h3 className="text-2xl font-black font-syne text-white uppercase italic tracking-tighter border-b border-white/5 pb-4">Execution Protocol</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="glass p-6 rounded-3xl border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-vault-faint uppercase tracking-[0.3em] italic">Target Authority</p>
                      <code className="text-xs break-all text-vault-cyan font-mono">{proposal.targets[0]}</code>
                   </div>
                   <div className="glass p-6 rounded-3xl border border-white/5 space-y-3">
                      <p className="text-[9px] font-black text-vault-faint uppercase tracking-[0.3em] italic">Operation Type</p>
                      <div className="text-base font-black text-white uppercase tracking-tighter">{decoded.action}</div>
                   </div>
                   <div className="md:col-span-2 glass p-6 rounded-3xl border border-white/5 space-y-4">
                      <p className="text-[9px] font-black text-vault-faint uppercase tracking-[0.3em] italic">Raw Payload Stream</p>
                      <code className="text-[10px] break-all text-vault-muted/40 leading-relaxed max-h-32 block overflow-y-auto no-scrollbar font-mono uppercase">
                        {proposal.calldatas[0]}
                      </code>
                   </div>
                </div>
             </div>

             {/* Rationale */}
             <div className="space-y-6">
                <h3 className="text-2xl font-black font-syne text-white uppercase italic tracking-tighter">Proposition Details</h3>
                <div className="text-vault-muted text-sm md:text-lg leading-relaxed whitespace-pre-wrap glass p-10 rounded-[48px] border border-white/5 font-light trackin-widest">
                   {proposal.description}
                </div>
             </div>

             {/* AI Insight */}
             <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-6">
                   <h3 className="text-2xl font-black font-syne text-white uppercase italic tracking-tighter flex items-center gap-4">
                      AI Risk Assessment
                      <span className="animate-pulse w-2 h-2 rounded-full bg-vault-cyan shadow-[0_0_15px_rgba(34,211,238,0.5)]"></span>
                   </h3>
                   <span className="text-[9px] px-4 py-1.5 bg-vault-cyan/10 text-vault-cyan rounded-full font-black uppercase border border-vault-cyan/20 tracking-widest italic">Secure Vector</span>
                </div>
                <AIAnalysis strategyName={decoded.action} apy="Variable" />
             </div>
          </div>

          {/* Right Column (Sidebar/Card) */}
          <div className="w-full xl:w-[450px] space-y-12 xl:sticky xl:top-32">
             <div className="glass-card rounded-[48px] p-10 shadow-2xl relative overflow-hidden group border-white/10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-vault-indigo/5 blur-3xl -mr-20 -mt-20 group-hover:bg-vault-indigo/10 transition-colors duration-1000"></div>
                <h3 className="text-2xl font-black mb-10 font-syne text-white uppercase italic tracking-tighter border-b border-white/5 pb-4">Consensus Tally</h3>
                <VoteTally proposalId={proposalId as string} />
                
                {state === 1 && (
                  <div className="space-y-6 mt-12 pt-8 border-t border-white/5">
                    {!voted ? (
                      <div className="grid grid-cols-1 gap-4">
                        <TxButton 
                          onClick={() => write.castVote(idBigInt, 1)}
                          isPending={write.isPending}
                          isSuccess={write.isSuccess}
                          error={write.error}
                          label="APPROVE PROPOSAL"
                          variant="primary"
                          className="py-6 rounded-[24px]"
                        />
                        <TxButton 
                          onClick={() => write.castVote(idBigInt, 0)}
                          isPending={write.isPending}
                          isSuccess={write.isSuccess}
                          error={write.error}
                          label="REJECT PROPOSAL"
                          variant="danger"
                          className="py-6 rounded-[24px]"
                        />
                      </div>
                    ) : (
                      <div className="p-8 bg-vault-cyan/5 border border-vault-cyan/20 rounded-[32px] text-center shadow-2xl">
                         <p className="text-vault-cyan font-black text-xs flex items-center justify-center gap-3 uppercase tracking-[0.2em] italic">
                           <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           Consensus Signature Recorded
                         </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Queue/Execute Controls */}
                {state === 4 && (
                  <div className="mt-12">
                     <TxButton 
                       onClick={handleQueue}
                       isPending={write.isPending}
                       isSuccess={write.isSuccess}
                       error={write.error}
                       label="Queue in Timelock"
                       className="w-full py-6 rounded-[24px]"
                     />
                  </div>
                )}
                {state === 5 && (
                  <div className="mt-12">
                     <TxButton 
                       onClick={handleExecute}
                       isPending={write.isPending}
                       isSuccess={write.isSuccess}
                       error={write.error}
                       label="Execute Strategy"
                       variant="secondary"
                       className="w-full py-6 rounded-[24px] text-black font-black"
                     />
                  </div>
                )}
             </div>

             <div className="glass rounded-[48px] p-10 border border-white/5 relative overflow-hidden">
                <h4 className="text-[10px] font-black text-vault-faint uppercase tracking-[0.4em] mb-8 italic border-b border-white/5 pb-4">Operational Parameters</h4>
                <ul className="space-y-6">
                   <li className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Voting Window</span>
                      <span className="text-white bg-white/5 px-4 py-1.5 rounded-lg border border-white/5 font-mono">24 Hours</span>
                   </li>
                   <li className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Quorum Requirement</span>
                      <span className="text-white bg-white/5 px-4 py-1.5 rounded-lg border border-white/5 font-mono">40.0 QX</span>
                   </li>
                   <li className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest group">
                      <span className="text-vault-muted group-hover:text-white transition-colors">Execution Delay</span>
                      <span className="text-vault-indigo bg-vault-indigo/5 px-4 py-1.5 rounded-lg border border-vault-indigo/10 font-mono">48 Hours</span>
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

