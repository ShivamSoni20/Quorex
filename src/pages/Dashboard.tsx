import React, { useState } from 'react'
import { VaultStats } from '../components/vault/VaultStats'
import { StrategyDisplay } from '../components/strategy/StrategyDisplay'
import { UserPosition } from '../components/vault/UserPosition'
import { DepositPanel } from '../components/vault/DepositPanel'
import { WithdrawPanel } from '../components/vault/WithdrawPanel'
import { XCMBridge } from '../components/vault/XCMBridge'
import { PVMSecurity } from '../components/governance/PVMSecurity'

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-[65%] space-y-8">
          <div className="space-y-4">
             <h1 className="text-3xl md:text-4xl font-bold font-syne">Quorex Dashboard</h1>
             <p className="text-vault-muted text-sm md:text-base">Manage your trustless yield position and monitor active strategies.</p>
          </div>

          <VaultStats />
          
          <div className="grid grid-cols-1 gap-6">
             <StrategyDisplay />
             <UserPosition />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <XCMBridge />
               <PVMSecurity />
             </div>
          </div>
        </div>

        {/* Right Column (Deposit/Withdraw) */}
        <div className="lg:w-[35%] space-y-8">
          <div className="bg-vault-bg2 border border-vault-border rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24">
            <div className="flex border-b border-vault-border">
              <button
                onClick={() => setTab('deposit')}
                className={`flex-1 py-5 text-sm font-bold transition-all ${
                  tab === 'deposit' ? 'text-vault-purple border-b-2 border-vault-purple bg-vault-purple/5' : 'text-vault-muted hover:text-vault-text bg-vault-bg/30'
                }`}
              >
                Deposit
              </button>
              <button
                onClick={() => setTab('withdraw')}
                className={`flex-1 py-5 text-sm font-bold transition-all ${
                  tab === 'withdraw' ? 'text-vault-purple border-b-2 border-vault-purple bg-vault-purple/5' : 'text-vault-muted hover:text-vault-text bg-vault-bg/30'
                }`}
              >
                Withdraw
              </button>
            </div>
            <div className="p-6 md:p-8 bg-vault-bg">
              {tab === 'deposit' ? <DepositPanel /> : <WithdrawPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
