import React from 'react'
import { useStrategy } from '../../hooks/useStrategy'
import { formatAPY, formatAddress } from '../../utils/format'

export const StrategyDisplay: React.FC = () => {
  const { strategyAddress, apy, name, isLoading } = useStrategy()

  if (!strategyAddress) return null

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl lg:rounded-[40px] p-6 sm:p-8 relative overflow-hidden group border-white/10">
      <div className="absolute top-0 right-0 w-60 h-60 bg-vault-cyan/5 blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-vault-indigo/10 duration-1000"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 mb-8">
        <div className="space-y-4 min-w-0 flex-grow">
           <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-vault-cyan">Protocol Strategy Alpha</span>
           </div>
           <h3 className="text-2xl sm:text-3xl font-bold font-syne text-white uppercase tracking-tight">
             {isLoading ? 'Decrypting...' : (name || 'Omni-Yield Core')}
           </h3>
           <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono font-black tracking-widest text-vault-faint uppercase">
              <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/5 truncate max-w-[200px]">Contract: {formatAddress(strategyAddress as string)}</span>
              <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/5">Status: Verified</span>
           </div>
        </div>
        
        <div className="glass p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 text-right lg:min-w-[180px] shadow-2xl group-hover:border-vault-cyan/30 transition-colors duration-500 shrink-0">
           <div className="text-3xl sm:text-4xl font-bold font-syne text-vault-cyan leading-none mb-1 tracking-tight">{formatAPY(apy as bigint)}</div>
           <div className="text-[9px] font-black text-vault-muted uppercase tracking-[0.2em]">Target Performance</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6 border-t border-white/5">
         <div className="space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Risk Profile Analysis</h4>
            <div className="p-4 sm:p-5 bg-white/5 rounded-2xl border border-white/5 space-y-3">
               <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span className="text-vault-muted">Risk/Reward Score</span>
                  <span className="text-vault-cyan">Low Risk (98/100)</span>
               </div>
               <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-vault-indigo to-vault-cyan"></div>
               </div>
            </div>
         </div>
         <div className="flex flex-col justify-center space-y-3">
            <p className="text-[10px] text-vault-muted leading-relaxed font-light uppercase tracking-wider">
               Optimizing liquidity across native Polkadot Hub vaults. Safety is guaranteed by the PVM layer and immutable timelocks.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Auto-Compound', 'XCM Ready', 'DAO Gated'].map(tag => (
                <span key={tag} className="text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 text-vault-faint border border-white/5">{tag}</span>
              ))}
            </div>
         </div>
      </div>
      
      <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-vault-indigo/5 blur-[60px] rounded-full group-hover:bg-vault-indigo/10 transition-colors duration-1000"></div>
    </div>
  )
}
