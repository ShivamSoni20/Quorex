import React from 'react'
import { useVault } from '../../hooks/useVault'
import { useStrategy } from '../../hooks/useStrategy'
import { useProposals } from '../../hooks/useProposals'
import { formatDOT, formatAPY } from '../../utils/format'

export const VaultStats: React.FC = () => {
  const { totalAssets, sharePrice, isLoading: vaultLoading } = useVault()
  const { apy, isLoading: strategyLoading } = useStrategy()
  const { proposals } = useProposals()

  const activeProposalsCount = (proposals || []).length // Should filter by state in real impl

  const stats = [
    { label: 'Total Value Locked', value: `${formatDOT(totalAssets as bigint)} DOT`, sub: 'Across all depositors' },
    { label: 'Current APY', value: formatAPY(apy as bigint), sub: 'Variable strategy yield', highlight: true },
    { label: 'Share Price', value: `${formatDOT(sharePrice as bigint)} DOT`, sub: 'Value per gvTOKEN share' },
    { label: 'Active Proposals', value: activeProposalsCount.toString(), sub: 'Pending governance votes' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-vault-bg2 border border-vault-border rounded-2xl p-4 md:p-6 hover:border-vault-purple/50 transition-all hover:bg-vault-bg3 group">
          <p className="text-vault-muted text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.highlight ? 'text-vault-teal' : 'text-vault-text'}`}>
            {vaultLoading || strategyLoading ? (
               <span className="animate-pulse bg-vault-bg3 h-8 w-24 rounded inline-block"></span>
            ) : stat.value}
          </p>
          <p className="text-vault-faint text-[10px] mt-1">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}
