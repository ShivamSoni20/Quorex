import React from 'react'
import { useStrategy } from '../../hooks/useStrategy'
import { formatAPY, formatAddress } from '../../utils/format'

export const StrategyDisplay: React.FC = () => {
  const { strategyAddress, apy, name, isLoading } = useStrategy()

  if (!strategyAddress) return null

  return (
    <div className="bg-vault-bg2 border border-vault-purple/30 bg-vault-purple/5 rounded-xl p-5 mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
           <span className="text-[10px] bg-vault-purple text-white px-2 py-0.5 rounded font-bold uppercase mb-2 inline-block">Active Strategy</span>
           <h3 className="text-xl font-bold text-vault-text">{isLoading ? 'Loading...' : (name || 'Mock Strategy')}</h3>
        </div>
        <div className="text-right">
           <p className="text-vault-teal text-2xl font-bold">{formatAPY(apy as bigint)}</p>
           <p className="text-vault-muted text-[10px]">CURRENT APY</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-vault-faint">
         <div className="flex items-center gap-1">
            <span>Address:</span>
            <span className="font-mono text-vault-muted hover:text-vault-purple cursor-pointer transition-colors">
               {formatAddress(strategyAddress as string)}
            </span>
         </div>
         <div className="flex items-center gap-1">
            <span>Status:</span>
            <span className="text-vault-teal font-bold uppercase">Optimizing</span>
         </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-vault-border">
         <p className="text-xs text-vault-muted leading-relaxed">
            This strategy generates yield by lending DOT on Polkadot Hub's native money market. 
            All changes to this strategy must be approved by the DAO through the governance process.
         </p>
      </div>
    </div>
  )
}
