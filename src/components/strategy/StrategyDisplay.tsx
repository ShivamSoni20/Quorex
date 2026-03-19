import React from 'react'
import { useStrategy } from '../../hooks/useStrategy'
import { formatAPY, formatAddress } from '../../utils/format'

export const StrategyDisplay: React.FC = () => {
  const { strategyAddress, apy, name, isLoading } = useStrategy()

  if (!strategyAddress) return null

  return (
    <div className="glass-card rounded-[48px] p-10 relative overflow-hidden group border-white/10">
      <div className="absolute top-0 right-0 w-80 h-80 bg-vault-cyan/5 blur-[100px] -mr-40 -mt-40 transition-colors group-hover:bg-vault-indigo/10 duration-1000"></div>
      
      <div className="flex flex-col xl:flex-row justify-between items-start gap-10 mb-12">
        <div className="space-y-6">
           <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-vault-cyan animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.6)]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-vault-cyan">Protocol Strategy Alpha</span>
           </div>
           <h3 className="text-4xl md:text-5xl font-black font-syne text-white uppercase italic tracking-tighter">
             {isLoading ? 'Decrypting...' : (name || 'Omni-Yield Core')}
           </h3>
           <div className="flex items-center gap-4 text-[10px] font-mono font-black tracking-widest text-vault-faint uppercase">
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">Contract: {formatAddress(strategyAddress as string)}</span>
              <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">Status: Verified</span>
           </div>
        </div>
        
        <div className="glass p-8 rounded-[36px] border border-white/10 text-right xl:min-w-[220px] shadow-2xl group-hover:border-vault-cyan/30 transition-colors duration-500">
           <div className="text-5xl font-black font-syne text-vault-cyan leading-none mb-2 tracking-tighter">{formatAPY(apy as bigint)}</div>
           <div className="text-[10px] font-black text-vault-muted uppercase tracking-[0.3em]">Target Performance</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-white/5">
         <div className="space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 italic">Risk Profile Analysis</h4>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-vault-muted">Risk/Reward Score</span>
                  <span className="text-vault-cyan">Low Risk (98/100)</span>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-gradient-to-r from-vault-indigo to-vault-cyan"></div>
               </div>
            </div>
         </div>
         <div className="flex flex-col justify-center space-y-4">
            <p className="text-xs text-vault-muted leading-relaxed font-light uppercase tracking-widest">
               Optimizing liquidity across native Polkadot Hub vaults. Safety is guaranteed by the PVM layer and immutable timelocks.
            </p>
            <div className="flex gap-3">
              {['Auto-Compound', 'XCM Ready', 'DAO Gated'].map(tag => (
                <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 text-vault-faint border border-white/5">{tag}</span>
              ))}
            </div>
         </div>
      </div>
      
      {/* Decorative Corner Glow */}
      <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-vault-indigo/5 blur-[80px] rounded-full group-hover:bg-vault-indigo/10 transition-colors duration-1000"></div>
    </div>
  )
}
