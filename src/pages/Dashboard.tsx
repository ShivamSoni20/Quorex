import React, { useState } from 'react'
import { VaultStats } from '../components/vault/VaultStats'
import { StrategyDisplay } from '../components/strategy/StrategyDisplay'
import { UserPosition } from '../components/vault/UserPosition'
import { DepositPanel } from '../components/vault/DepositPanel'
import { WithdrawPanel } from '../components/vault/WithdrawPanel'
import { XCMBridge } from '../components/vault/XCMBridge'
import { PVMSecurity } from '../components/governance/PVMSecurity'
import { formatDOT } from '../utils/format'

const Dashboard: React.FC = () => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in zoom-in-95 duration-1000">
      <div className="flex flex-col xl:flex-row gap-10 items-start">
        
        {/* Left: Quick Controls Sidebar */}
        <div className="w-full xl:w-[400px] xl:sticky xl:top-28">
          <div className="bg-vault-bg2 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-vault-teal/5 blur-3xl -mr-16 -mt-16"></div>
             
             <div className="p-8 pb-4">
                <h2 className="text-2xl font-black font-syne text-white mb-1">Terminal</h2>
                <p className="text-vault-muted text-xs uppercase tracking-widest font-bold">Execution Interface</p>
             </div>

             <div className="flex p-2 bg-black/20 mx-6 mb-6 rounded-2xl">
                <button
                   onClick={() => setTab('deposit')}
                   className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                     tab === 'deposit' ? 'bg-vault-purple text-black' : 'text-vault-muted hover:text-white'
                   }`}
                >
                   Deposit
                </button>
                <button
                   onClick={() => setTab('withdraw')}
                   className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                     tab === 'withdraw' ? 'bg-vault-purple text-black' : 'text-vault-muted hover:text-white'
                   }`}
                >
                   Withdraw
                </button>
             </div>

             <div className="px-8 pb-10">
                {tab === 'deposit' ? <DepositPanel /> : <WithdrawPanel />}
             </div>

             <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between px-8 text-[10px] font-mono text-vault-faint">
                <span>0x...{formatDOT(0n)} QX</span>
                <span className="flex items-center gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-vault-teal animate-pulse"></span>
                   Syncing
                </span>
             </div>
          </div>
        </div>

        {/* Right: Operations Overview */}
        <div className="flex-grow space-y-10 w-full">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                 <h1 className="text-4xl md:text-6xl font-black font-syne text-white tracking-tighter">Command Center</h1>
                 <p className="text-vault-muted text-lg max-w-xl">Trustless yield aggregation on Polkadot Hub. Managed by QX holders.</p>
              </div>
           </div>

           <VaultStats />
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-8 space-y-10">
                 <StrategyDisplay />
                 <UserPosition />
              </div>
              <div className="lg:col-span-4 space-y-8">
                 <XCMBridge />
                 <PVMSecurity />
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
