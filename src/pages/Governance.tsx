import React, { useState } from 'react'
import { useProposals } from '../hooks/useProposals'
import { CreateProposal } from '../components/governance/CreateProposal'
import { ProposalCard } from '../components/governance/ProposalCard'

const Governance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'Active' | 'Pending' | 'Executed' | 'All'>('All')
  const { proposals, isLoading } = useProposals()

  return (
    <div className="mesh-bg min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-vault-indigo/30">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-[9px] font-black uppercase tracking-widest text-vault-cyan">
               Network Consensus: Track 1 Active
            </div>
            <h1 className="text-5xl md:text-8xl font-black font-syne text-white tracking-tighter uppercase italic leading-none">Protocol Governance</h1>
            <p className="text-vault-muted text-lg max-w-2xl font-light uppercase tracking-widest leading-relaxed">
               QX DAO delegates power to code. Strategy rotations and parameter updates require <span className="text-white font-black italic">Consensus</span>.
            </p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden xl:flex px-12 py-6 bg-white text-black font-black uppercase tracking-widest rounded-[24px] hover:bg-vault-cyan hover:scale-105 transition-all shadow-2xl items-center gap-4 text-xs group"
          >
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
            Propose Strategy Rotation
          </button>
        </div>

        <div className="flex items-center justify-between mb-12 gap-8">
          <div className="flex p-2 glass rounded-[24px] border border-white/5 overflow-x-auto no-scrollbar">
              {['All', 'Active', 'Pending', 'Executed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab as any)}
                  className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 whitespace-nowrap ${
                    filter === tab ? 'text-black bg-white shadow-2xl scale-100' : 'text-vault-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-vault-faint italic px-6 py-4 glass rounded-3xl border border-white/5">
            <span className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse"></span>
            Syncing Proposal Stream
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {[1,2,3,4].map(i => (
              <div key={i} className="h-80 bg-white/5 animate-pulse rounded-[48px] border border-white/10 glass-card"></div>
            ))}
          </div>
        ) : (
          <>
            {proposals.length === 0 ? (
              <div className="text-center py-48 glass rounded-[64px] border border-dashed border-white/10 group">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-700">
                   <svg className="w-10 h-10 text-vault-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <p className="text-vault-muted font-black uppercase tracking-[0.4em] text-xs italic opacity-40">Protocol Ledger Empty</p>
                <p className="text-vault-faint mt-2 font-light uppercase tracking-widest text-[10px]">No consensus items currently awaiting execution</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pb-32 xl:pb-0">
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
          className="xl:hidden fixed bottom-10 right-8 left-8 z-50 px-8 py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-xs border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" /></svg>
          New Proposal
        </button>

        <CreateProposal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}

export default Governance

