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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-6 md:p-8 hover:bg-white/5 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-vault-purple blur-xl"></div>
          </div>
          <p className="text-vault-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4 group-hover:text-white transition-colors">{stat.label}</p>
          <p className={`text-2xl md:text-3xl font-mono font-black ${stat.highlight ? 'text-vault-teal' : 'text-white'}`}>
            {vaultLoading || strategyLoading ? (
               <span className="animate-pulse bg-white/5 h-8 w-24 rounded-lg inline-block"></span>
            ) : stat.value}
          </p>
          <p className="text-vault-faint text-[10px] mt-2 font-medium tracking-tight uppercase">{stat.sub}</p>
        </div>
      ))}
    </div>
  )
}
