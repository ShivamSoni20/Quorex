import React from 'react'
import { useVault } from '../../hooks/useVault'
import { useVaultToken } from '../../hooks/useVaultToken'
import { formatDOT } from '../../utils/format'
import { TxButton } from '../shared/TxButton'

export const UserPosition: React.FC = () => {
  const { userShares, sharePrice } = useVault()
  const { balance, votingPower, delegatee, write } = useVaultToken()

  const dotValue = (userShares && sharePrice) 
    ? (BigInt(userShares) * BigInt(sharePrice)) / (10n**18n) 
    : 0n

  const needsDelegation = balance !== undefined && balance > 0n && (!delegatee || delegatee === '0x0000000000000000000000000000000000000000')

  return (
    <div className="bg-vault-bg2 border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-60 h-60 bg-vault-purple/5 blur-[80px] -mr-32 -mt-32 transition-colors group-hover:bg-vault-purple/10"></div>
      
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 sm:gap-8">
         <div className="space-y-4 min-w-0">
            <div className="flex items-center gap-2">
               <div className="w-1 h-5 bg-vault-purple rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
               <h3 className="text-lg sm:text-xl font-black font-syne text-white uppercase tracking-tighter">Asset Custody</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="space-y-1.5">
                  <p className="text-vault-muted text-[9px] font-black uppercase tracking-[0.15em]">Vault Equity</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-xl sm:text-2xl font-mono font-black text-white">{formatDOT(userShares as bigint, 18)}</span>
                     <span className="text-[10px] font-bold text-vault-faint tracking-widest uppercase">QX Shares</span>
                  </div>
                  <p className="text-xs font-bold text-vault-teal font-mono">≈ {formatDOT(dotValue)} DOT</p>
               </div>

               <div className="space-y-1.5">
                  <p className="text-vault-muted text-[9px] font-black uppercase tracking-[0.15em]">Protocol Governance</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-xl sm:text-2xl font-mono font-black text-white">{formatDOT(balance as bigint, 18)}</span>
                     <span className="text-[10px] font-bold text-vault-faint tracking-widest uppercase">QX TVL</span>
                  </div>
                  <p className="text-xs font-bold text-vault-muted uppercase tracking-tighter">On-chain Voting Power</p>
               </div>
            </div>
         </div>

         <div className="lg:w-px lg:h-20 bg-white/5"></div>

         <div className="lg:min-w-[240px] space-y-3">
            <div className="bg-black/20 rounded-2xl p-4 sm:p-5 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-0.5 bg-vault-purple/20"></div>
               <p className="text-vault-muted text-[9px] font-black uppercase tracking-[0.15em] mb-3">Consensus Power</p>
               <div className="text-2xl sm:text-3xl font-mono font-black text-vault-purple mb-4">{formatDOT(votingPower as bigint, 18)}</div>
               
               {needsDelegation && (
                  <TxButton
                    onClick={() => write.delegate((window as any).ethereum?.selectedAddress || '')}
                    isPending={write.isPending}
                    isSuccess={write.isSuccess}
                    error={write.error}
                    label="ACTIVATE CONSENSUS"
                    className="py-3 px-4 text-[9px] w-full bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-vault-teal transition-all"
                    variant="primary"
                  />
               )}
               {!needsDelegation && (
                  <div className="flex items-center gap-2 text-[9px] font-black text-vault-teal uppercase tracking-widest">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     Power Verified
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  )
}
