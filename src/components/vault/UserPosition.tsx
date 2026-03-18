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
    <div className="bg-vault-bg2 border border-white/5 rounded-[40px] p-8 md:p-10 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-80 h-80 bg-vault-purple/5 blur-[100px] -mr-40 -mt-40 transition-colors group-hover:bg-vault-purple/10"></div>
      
      <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-10">
         <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-1.5 h-6 bg-vault-purple rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
               <h3 className="text-2xl font-black font-syne text-white uppercase tracking-tighter">Asset Custody</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
               <div className="space-y-2">
                  <p className="text-vault-muted text-[10px] font-black uppercase tracking-[0.2em]">Vault Equity</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-mono font-black text-white">{formatDOT(userShares as bigint, 18)}</span>
                     <span className="text-xs font-bold text-vault-faint tracking-widest uppercase">QX Shares</span>
                  </div>
                  <p className="text-sm font-bold text-vault-teal font-mono">≈ {formatDOT(dotValue)} DOT</p>
               </div>

               <div className="space-y-2">
                  <p className="text-vault-muted text-[10px] font-black uppercase tracking-[0.2em]">Protocol Governance</p>
                  <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-mono font-black text-white">{formatDOT(balance as bigint, 18)}</span>
                     <span className="text-xs font-bold text-vault-faint tracking-widest uppercase">QX TVL</span>
                  </div>
                  <p className="text-sm font-bold text-vault-muted uppercase tracking-tighter">On-chain Voting Power</p>
               </div>
            </div>
         </div>

         <div className="xl:w-px xl:h-24 bg-white/5"></div>

         <div className="xl:min-w-[280px] space-y-4">
            <div className="bg-black/20 rounded-3xl p-6 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-vault-purple/20"></div>
               <p className="text-vault-muted text-[10px] font-black uppercase tracking-[0.2em] mb-4">Consensus Power</p>
               <div className="text-4xl font-mono font-black text-vault-purple mb-6">{formatDOT(votingPower as bigint, 18)}</div>
               
               {needsDelegation && (
                  <TxButton
                    onClick={() => write.delegate((window as any).ethereum?.selectedAddress || '')}
                    isPending={write.isPending}
                    isSuccess={write.isSuccess}
                    error={write.error}
                    label="ACTIVATE CONSENSUS"
                    className="py-4 px-6 text-[10px] w-full bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-vault-teal transition-all"
                    variant="primary"
                  />
               )}
               {!needsDelegation && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-vault-teal uppercase tracking-widest">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     Power Verified
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  )
}
