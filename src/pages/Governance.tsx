import React, { useState } from 'react'
import { useProposals } from '../hooks/useProposals'
import { CreateProposal } from '../components/governance/CreateProposal'
import { ProposalCard } from '../components/governance/ProposalCard'

const Governance: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filter, setFilter] = useState<'Active' | 'Pending' | 'Executed' | 'All'>('All')
  const { proposals, isLoading } = useProposals()

  // For the MVP, we'll just show all proposals or implement a simple filter if needed.
  // Real status filtering would require calling 'state(id)' for each proposal.
  // We'll keep the UI for tabs but default to 'All' for reliability.
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in zoom-in-95 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-syne text-white tracking-tighter">Consensus</h1>
          <p className="text-vault-muted text-lg max-w-xl">
             Quorex is an autonomous protocol. Strategy rotations require a passing vote from QX token holders.
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex px-10 py-5 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:bg-vault-teal hover:scale-105 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] items-center gap-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
          New Strategy Proposal
        </button>
      </div>

      <div className="flex p-2 bg-white/5 rounded-3xl mb-12 overflow-x-auto no-scrollbar max-w-2xl">
          {['All', 'Active', 'Pending', 'Executed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all ${
                filter === tab ? 'text-black bg-vault-purple shadow-lg scale-105' : 'text-vault-muted hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 bg-white/5 animate-pulse rounded-[40px] border border-white/5"></div>
          ))}
        </div>
      ) : (
        <>
          {proposals.length === 0 ? (
            <div className="text-center py-32 bg-white/[0.02] rounded-[48px] border border-dashed border-white/10">
              <p className="text-vault-muted font-bold italic opacity-50 uppercase tracking-widest text-xs">No active consensus items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-24 md:pb-0">
              {proposals.map((proposal) => (
                <ProposalCard key={proposal.proposalId.toString()} proposal={proposal} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Mobile Sticky Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="md:hidden fixed bottom-10 right-4 left-4 z-40 px-6 py-5 bg-vault-teal text-black font-black uppercase tracking-widest rounded-full shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
        New Proposal
      </button>

      <CreateProposal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default Governance
