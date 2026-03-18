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
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-vault-purple">Liquidity Input</h3>
        <span className="text-[10px] font-mono font-bold text-vault-muted">
          BAL: {formatDOT(assetBalance as bigint)}
        </span>
      </div>

      <div className="flex-grow space-y-8">
        <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-vault-purple to-vault-teal rounded-3xl blur opacity-5 group-focus-within:opacity-20 transition duration-500"></div>
           <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/40 text-4xl font-mono font-black rounded-3xl border border-white/5 p-8 feedback-shadow focus:border-vault-purple outline-none transition-all placeholder:text-vault-faint text-white"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4">
                <button 
                  onClick={() => setAmount(formatDOT(assetBalance as bigint))}
                  className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-black hover:bg-white/10 text-vault-purple transition-all uppercase tracking-widest"
                >
                  MAX
                </button>
                <span className="text-vault-muted font-black text-xs tracking-tighter">DOT</span>
              </div>
           </div>
        </div>

        <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-vault-muted">Estimated shares</span>
              <span className="text-white font-mono">-- QX</span>
           </div>
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-vault-muted">Protocol Fee</span>
              <span className="text-vault-teal">PLATINUM (0%)</span>
           </div>
           <div className="h-px bg-white/5 w-full"></div>
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span className="text-vault-muted">Security Tier</span>
              <span className="text-vault-purple">PVM ENFORCED</span>
           </div>
        </div>
      </div>

      <div className="mt-8">
        <TxButton
          onClick={handleAction}
          isPending={write.isPending}
          isSuccess={write.isSuccess}
          error={write.error}
          variant={needsApproval ? 'secondary' : 'primary'}
          label={needsApproval ? 'Authorize Asset Hub' : 'Enter Position'}
          pendingLabel={needsApproval ? 'Authorizing...' : 'Executing...'}
          disabled={!amount || amountBigInt === 0n || amountBigInt > (assetBalance || 0n)}
        />
      </div>
    </div>
  )
}
