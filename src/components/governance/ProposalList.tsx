import React from 'react'
import { ProposalCard } from './ProposalCard'
import { useProposals } from '../../hooks/useProposals'

export const ProposalList: React.FC = () => {
  const { proposals, isLoading, error } = useProposals()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-vault-bg2 border border-vault-border rounded-xl p-5 h-48 animate-pulse"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-vault-red/5 border border-vault-red/30 rounded-xl p-8 text-center">
        <p className="text-vault-red font-bold">Failed to load proposals</p>
        <p className="text-vault-muted text-sm mt-1">{error.message}</p>
      </div>
    )
  }

  if (proposals.length === 0) {
    return (
      <div className="bg-vault-bg2 border border-vault-border rounded-xl p-12 text-center text-vault-muted">
        <svg className="mx-auto h-12 w-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No proposals found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {proposals.map((p) => (
        <ProposalCard key={p.proposalId.toString()} proposal={p} />
      ))}
    </div>
  )
}
