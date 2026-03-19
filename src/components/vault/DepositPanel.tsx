import React, { useState } from 'react'
import { parseUnits } from 'viem'
import { useVault } from '../../hooks/useVault'
import { formatDOT } from '../../utils/format'
import { TxButton } from '../shared/TxButton'

export const DepositPanel: React.FC = () => {
  const [amount, setAmount] = useState('')
  const { assetBalance, assetAllowance, write, refetch } = useVault()

  const amountBigInt = amount ? parseUnits(amount, 10) : 0n
  const needsApproval = assetAllowance !== undefined && assetAllowance < amountBigInt

  const handleAction = async () => {
    if (needsApproval) {
      write.approve(amountBigInt)
    } else {
      write.deposit(amountBigInt)
    }
  }

  React.useEffect(() => {
    if (write.isSuccess) {
      refetch()
      setAmount('')
    }
  }, [write.isSuccess])

  return (
    <div className="bg-transparent h-full flex flex-col">
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-vault-cyan">Liquidity Entry</h3>
          <p className="text-[9px] font-black text-vault-faint uppercase tracking-[0.2em]">Polkadot Asset Hub</p>
        </div>
        <div className="text-right">
          <span className="block text-[8px] font-black text-vault-faint uppercase tracking-widest mb-1">Available balance</span>
          <span className="text-xs font-mono font-black text-white">
            {formatDOT(assetBalance as bigint)} <span className="text-vault-muted text-[10px]">DOT</span>
          </span>
        </div>
      </div>

      <div className="flex-grow space-y-10">
        <div className="relative group">
           {/* Animated Internal Glow */}
           <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-vault-cyan to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
           
           <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white/5 text-5xl font-black font-syne rounded-3xl border border-white/5 p-10 focus:bg-white/[0.08] focus:border-white/10 outline-none transition-all placeholder:text-vault-faint text-white tracking-tighter"
              />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2">
                <button 
                  onClick={() => setAmount(formatDOT(assetBalance as bigint))}
                  className="px-4 py-2 bg-white/10 rounded-xl text-[10px] font-black hover:bg-white text-black transition-all uppercase tracking-widest shadow-2xl"
                >
                  MAX
                </button>
                <span className="text-vault-faint font-black text-[10px] uppercase tracking-widest">Token: DOT</span>
              </div>
           </div>
        </div>

        <div className="glass rounded-[32px] p-8 space-y-5 border border-white/5 relative overflow-hidden">
           <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em]">
              <span className="text-vault-muted italic">Share Projection</span>
              <span className="text-white font-mono">-- QX-SHARES</span>
           </div>
           <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em]">
              <span className="text-vault-muted italic">Execution Fee</span>
              <span className="text-vault-cyan">VIP EXEMPT (0%)</span>
           </div>
           <div className="h-px bg-white/5 w-full"></div>
           <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.3em]">
              <span className="text-vault-muted italic">Safety Protocol</span>
              <span className="text-vault-indigo">PVM-01 VERIFIED</span>
           </div>
        </div>
      </div>

      <div className="mt-10">
        <TxButton
          onClick={handleAction}
          isPending={write.isPending}
          isSuccess={write.isSuccess}
          error={write.error}
          variant={needsApproval ? 'secondary' : 'primary'}
          label={needsApproval ? 'Authorize DOT Hub' : 'Initiate Position'}
          pendingLabel={needsApproval ? 'Authorizing...' : 'Transmitting...'}
          disabled={!amount || amountBigInt === 0n || amountBigInt > (assetBalance || 0n)}
        />
      </div>
    </div>
  )
}
