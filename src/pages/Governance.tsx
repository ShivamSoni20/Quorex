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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold font-syne text-vault-text">DAO Governance</h1>
          <p className="text-vault-muted text-sm md:text-base max-w-xl">
            GovernedVault is controlled by the community. Propose and vote on yield strategies.
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex px-6 py-3 bg-vault-teal text-vault-bg font-bold rounded-xl hover:bg-vault-teal/80 transition-all shadow-[0_0_20px_rgba(45,212,160,0.3)] items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Propose Strategy Change
        </button>
      </div>

      <div className="flex border-b border-vault-border mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex min-w-full sm:min-w-0">
          {['All', 'Active', 'Pending', 'Executed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                filter === tab ? 'text-vault-purple border-vault-purple bg-vault-purple/5' : 'text-vault-muted border-transparent hover:text-vault-text hover:bg-vault-bg2'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="h-64 bg-vault-bg2/50 animate-pulse rounded-2xl border border-vault-border"></div>
          ))}
        </div>
      ) : (
        <>
          {proposals.length === 0 ? (
            <div className="text-center py-20 bg-vault-bg2/30 rounded-3xl border border-dashed border-vault-border">
              <p className="text-vault-muted italic">No proposals found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24 md:pb-0">
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
        className="md:hidden fixed bottom-6 right-4 left-4 z-40 px-6 py-4 bg-vault-teal text-vault-bg font-bold rounded-2xl shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        New Proposal
      </button>

      <CreateProposal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default Governance
