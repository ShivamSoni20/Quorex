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
    <div className="bg-vault-bg2 border border-vault-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold">Deposit</h3>
        <span className="text-vault-muted text-xs">
          Balance: {formatDOT(assetBalance as bigint)} DOT
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
              onClick={() => setAmount(formatDOT(assetBalance as bigint))}
              className="text-vault-purple text-xs font-bold hover:text-white"
            >
              MAX
            </button>
            <span className="text-vault-muted font-bold">DOT</span>
          </div>
        </div>

        <div className="bg-vault-bg3 rounded-xl p-4 mb-6">
           <div className="flex justify-between text-xs mb-2">
              <span className="text-vault-muted">Estimated shares</span>
              <span className="text-vault-text font-bold">-- gvTOKEN</span>
           </div>
           <div className="flex justify-between text-xs">
              <span className="text-vault-muted">Protocol Fee</span>
              <span className="text-vault-teal font-bold">0.0% (Free)</span>
           </div>
        </div>
      </div>

      <div className="flex gap-2">
        <TxButton
          onClick={handleAction}
          isPending={write.isPending}
          isSuccess={write.isSuccess}
          error={write.error}
          variant={needsApproval ? 'secondary' : 'primary'}
          label={needsApproval ? 'Approve DOT' : 'Deposit'}
          pendingLabel={needsApproval ? 'Approving...' : 'Depositing...'}
          disabled={!amount || amountBigInt === 0n || amountBigInt > (assetBalance || 0n)}
        />
      </div>
    </div>
  )
}
