import React from 'react'

interface AIAnalysisProps {
  strategyName: string
  apy: string
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ strategyName, apy }) => {
  return (
    <div className="bg-vault-bg/50 border border-vault-purple/30 rounded-2xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-vault-purple text-white text-[10px] font-bold rounded-full animate-pulse shadow-lg">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI INSIGHT
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold font-syne text-vault-teal">Agent Analysis: {strategyName}</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[10px] text-vault-muted uppercase font-bold tracking-widest">Risk Score</p>
            <div className="flex gap-1">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className={`h-1.5 w-full rounded-full ${i <= 2 ? 'bg-vault-teal' : 'bg-vault-bg3'}`}></div>
               ))}
            </div>
            <p className="text-[10px] text-vault-teal font-bold uppercase mt-1">Low Risk</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-vault-muted uppercase font-bold tracking-widest">Yield Stability</p>
            <p className="text-xl font-bold font-syne text-vault-text">High</p>
          </div>
        </div>

        <p className="text-xs text-vault-muted leading-relaxed">
           "Based on current Polkadot Hub liquidity and {apy} historical yield, this strategy rotation is expected to outperform the current pool by 1.2% while maintaining a 99% collateralization ratio."
        </p>

        <div className="pt-4 border-t border-vault-border/50 flex items-center justify-between">
           <span className="text-[10px] text-vault-faint italic font-mono">Polkadot Agent Kit v1.0.4 Verified</span>
           <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-vault-bg bg-vault-purple flex items-center justify-center text-[10px] font-bold text-white">A</div>
              <div className="w-6 h-6 rounded-full border-2 border-vault-bg bg-vault-teal flex items-center justify-center text-[10px] font-bold text-vault-bg">I</div>
           </div>
        </div>
      </div>
    </div>
  )
}
