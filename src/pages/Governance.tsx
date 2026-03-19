import React, { useState } from 'react'
import { useProposals } from '../hooks/useProposals'
import { CreateProposal } from '../components/governance/CreateProposal'
import { ProposalCard } from '../components/governance/ProposalCard'

const Governance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'Active' | 'Pending' | 'Executed' | 'All'>('All')
  const { proposals, isLoading } = useProposals()

  return (
    <div className="mesh-bg min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-10 selection:bg-vault-indigo/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass border border-white/10 text-[8px] font-black uppercase tracking-widest text-vault-cyan">
               Network Consensus: Track 1 Active
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-syne text-white tracking-tight uppercase leading-none">Protocol Governance</h1>
            <p className="text-vault-muted text-sm max-w-xl font-light uppercase tracking-wider leading-relaxed">
               QX DAO delegates power to code. Strategy rotations and parameter updates require <span className="text-white font-bold">Consensus</span>.
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden lg:flex px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-vault-cyan hover:scale-105 transition-all shadow-2xl items-center gap-3 text-[10px] group shrink-0"
          >
            <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
            Propose Strategy Rotation
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex p-1.5 glass rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
              {['All', 'Active', 'Pending', 'Executed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab as any)}
                  className={`px-5 sm:px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-500 whitespace-nowrap ${
                    filter === tab ? 'text-black bg-white shadow-2xl' : 'text-vault-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
          </div>
          
          <div className="hidden md:flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-vault-faint italic px-4 py-3 glass rounded-2xl border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-vault-cyan animate-pulse"></span>
            Syncing Proposal Stream
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-64 bg-white/5 animate-pulse rounded-3xl border border-white/10 glass-card"></div>
            ))}
          </div>
        ) : (
          <>
            {proposals.length === 0 ? (
              <div className="text-center py-32 glass rounded-3xl sm:rounded-[48px] border border-dashed border-white/10 group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-700">
                   <svg className="w-8 h-8 text-vault-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-vault-muted font-black uppercase tracking-[0.3em] text-[10px] italic opacity-40">Protocol Ledger Empty</p>
                <p className="text-vault-faint mt-2 font-light uppercase tracking-widest text-[9px]">No consensus items currently awaiting execution</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-28 lg:pb-0">
                {proposals.map((proposal) => (
                  <ProposalCard key={proposal.proposalId.toString()} proposal={proposal} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Mobile Sticky Action */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="lg:hidden fixed bottom-6 right-4 left-4 z-50 px-6 py-4 bg-white text-black font-black uppercase tracking-[0.15em] rounded-full shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-[10px] border border-white/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
          New Proposal
        </button>

        <CreateProposal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}

export default Governance
