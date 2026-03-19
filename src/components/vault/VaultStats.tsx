import React from 'react'
import { useVault } from '../../hooks/useVault'
import { useStrategy } from '../../hooks/useStrategy'
import { useProposals } from '../../hooks/useProposals'
import { formatDOT, formatAPY } from '../../utils/format'

export const VaultStats: React.FC = () => {
  const { totalAssets, sharePrice, isLoading: vaultLoading } = useVault()
  const { apy, isLoading: strategyLoading } = useStrategy()
  const { proposals } = useProposals()

  const activeProposalsCount = (proposals || []).length

  const stats = [
    { label: 'Total Value Locked', value: `${formatDOT(totalAssets as bigint)} DOT`, sub: 'Vault Aggregation', icon: 'tvl' },
    { label: 'Dynamic APY', value: formatAPY(apy as bigint), sub: 'Live Strategy Output', highlight: true, icon: 'apy' },
    { label: 'Vault Token Price', value: `${formatDOT(sharePrice as bigint)} DOT`, sub: 'Current Index Value', icon: 'price' },
    { label: 'Active Governance', value: activeProposalsCount.toString(), sub: 'Pending Decisions', icon: 'proposal' },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <div key={i} className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 group relative overflow-hidden transition-all duration-500 hover:-translate-y-1">
          {/* Animated Accent Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-vault-indigo/5 blur-[50px] group-hover:bg-vault-cyan/10 transition-colors duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] ${stat.highlight ? 'text-vault-cyan' : 'text-vault-muted'}`}>
                {stat.label}
              </span>
              {stat.highlight && (
                <div className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              )}
            </div>

            <div className={`text-xl sm:text-2xl lg:text-3xl font-bold font-syne tracking-tight ${stat.highlight ? 'text-white' : 'text-white/90'}`}>
              {vaultLoading || strategyLoading ? (
                 <div className="animate-pulse bg-white/5 h-8 w-24 rounded-xl"></div>
              ) : stat.value}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-vault-faint group-hover:text-vault-muted transition-colors">
                {stat.sub}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 transition-transform text-vault-cyan">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          </div>

          {/* Bottom Edge Indicator */}
          <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 bg-gradient-to-r from-transparent via-vault-cyan to-transparent ${stat.highlight ? 'w-full opacity-60' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-40'}`}></div>
        </div>
      ))}
    </div>
  )
}
