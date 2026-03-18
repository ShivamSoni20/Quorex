import React from 'react'
import { useStrategy } from '../../hooks/useStrategy'
import { formatAPY, formatAddress } from '../../utils/format'

export const StrategyDisplay: React.FC = () => {
  const { strategyAddress, apy, name, isLoading } = useStrategy()

  if (!strategyAddress) return null

  return (
    <div className="bg-vault-bg2 border border-white/5 rounded-[40px] p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-vault-purple/5 blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-vault-purple/10"></div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="space-y-3">
           <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-vault-teal animate-pulse shadow-[0_0_10px_rgba(163,230,53,0.5)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-vault-teal">Active Protocol Strategy</span>
           </div>
           <h3 className="text-3xl font-black font-syne text-white">{isLoading ? 'Syncing...' : (name || 'Mock Strategy')}</h3>
           <div className="flex items-center gap-2 text-xs font-mono text-vault-muted">
              <span>DEPLOYED AT</span>
              <span className="text-white hover:text-vault-purple transition-colors cursor-pointer">{formatAddress(strategyAddress as string)}</span>
           </div>
        </div>
        
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-right min-w-[160px]">
           <div className="text-4xl font-mono font-black text-vault-teal leading-none mb-1">{formatAPY(apy as bigint)}</div>
           <div className="text-[10px] font-bold text-vault-muted uppercase tracking-widest">Target APY</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
         <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Execution Parameters</h4>
            <div className="p-4 bg-black/20 rounded-2xl border border-white/5 space-y-3">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-vault-muted">Risk Score</span>
                  <span className="text-vault-teal">Low (Stable)</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-vault-teal"></div>
               </div>
            </div>
         </div>
         <div className="flex items-center">
            <p className="text-xs text-vault-muted leading-relaxed italic">
               Aggregating yield across Polkadot Hub's native liquidity pools. All re-allocations are gated by DAO consensus.
            </p>
         </div>
      </div>
    </div>
  )
}
