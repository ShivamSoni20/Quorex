import React, { useState } from 'react'
import { parseUnits } from 'viem'
import { useVault } from '../../hooks/useVault'
import { formatDOT } from '../../utils/format'
import { TxButton } from '../shared/TxButton'

export const WithdrawPanel: React.FC = () => {
  const [amount, setAmount] = useState('')
  const { userShares, write, refetch } = useVault()

  const amountBigInt = amount ? parseUnits(amount, 18) : 0n

  const handleWithdraw = () => {
    write.redeem(amountBigInt)
  }

  React.useEffect(() => {
    if (write.isSuccess) {
      refetch()
      setAmount('')
    }
  }, [write.isSuccess])

  return (
    <div className="bg-vault-bg2 border border-vault-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Withdraw</h3>
        <span className="text-vault-muted text-xs">
          Shares: {formatDOT(userShares as bigint, 18)} gvTOKEN
        </span>
      </div>

      <div className="flex-grow">
        <div className="relative mb-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-vault-bg text-3xl font-bold rounded-xl border border-vault-border p-4 focus:border-vault-purple outline-none transition-all placeholder:text-vault-faint"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
             <button 
              onClick={() => setAmount(formatDOT(userShares as bigint, 18))}
              className="text-vault-purple text-xs font-bold hover:text-white"
            >
              MAX
            </button>
            <span className="text-vault-muted font-bold">gvTOKEN</span>
          </div>
        </div>

        <div className="bg-vault-bg3 rounded-xl p-4 mb-6">
           <div className="flex justify-between text-xs mb-2">
              <span className="text-vault-muted">Estimated DOT</span>
              <span className="text-vault-text font-bold">-- DOT</span>
           </div>
           <div className="flex justify-between text-xs">
              <span className="text-vault-muted">Withdrawal Fee</span>
              <span className="text-vault-teal font-bold">0.0%</span>
           </div>
        </div>
      </div>

      <TxButton
        onClick={handleWithdraw}
        isPending={write.isPending}
        isSuccess={write.isSuccess}
        error={write.error}
        label="Withdraw"
        pendingLabel="Withdrawing..."
        disabled={!amount || amountBigInt === 0n || amountBigInt > (userShares || 0n)}
      />
    </div>
  )
}
