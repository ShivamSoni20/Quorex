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
    <div className="bg-vault-bg2 border border-vault-border rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-vault-teal/5 blur-3xl -mr-32 -mt-32 transition-opacity opacity-50 group-hover:opacity-100"></div>
      
      <h3 className="text-xl font-bold mb-8 font-syne flex items-center gap-2">
        <div className="w-1.5 h-6 bg-vault-teal rounded-full"></div>
        Your Active Position
      </h3>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 space-y-1">
          <p className="text-vault-muted text-[10px] uppercase font-bold tracking-widest">Vault Balance</p>
          <p className="text-2xl font-bold text-vault-text font-syne">{formatDOT(userShares as bigint, 18)} <span className="text-xs text-vault-muted font-normal">qxTOKEN</span></p>
          <p className="text-xs text-vault-teal/80 font-mono">≈ {formatDOT(dotValue)} DOT</p>
        </div>

        <div className="h-px md:h-12 w-full md:w-px bg-vault-border"></div>

        <div className="flex-1 space-y-1">
           <p className="text-vault-muted text-[10px] uppercase font-bold tracking-widest">QX (Gov) Token</p>
           <p className="text-2xl font-bold text-vault-text font-syne">{formatDOT(balance as bigint, 18)} <span className="text-xs text-vault-muted font-normal">QX</span></p>
           <p className="text-xs text-vault-faint">Hold for governance power</p>
        </div>

        <div className="h-px md:h-12 w-full md:w-px bg-vault-border"></div>

        <div className="flex-1 space-y-1 relative">
           <p className="text-vault-muted text-[10px] uppercase font-bold tracking-widest">Voting Power</p>
           <p className="text-2xl font-bold text-vault-teal font-syne">{formatDOT(votingPower as bigint, 18)}</p>
           
           {needsDelegation && (
             <div className="mt-3 flex items-start gap-2">
                <div className="flex-grow">
                   <TxButton
                     onClick={() => write.delegate((window as any).ethereum?.selectedAddress || '')}
                     isPending={write.isPending}
                     isSuccess={write.isSuccess}
                     error={write.error}
                     label="Activate Voting"
                     className="py-1.5 px-4 text-[10px] w-auto inline-flex"
                     variant="secondary"
                   />
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  )
}
