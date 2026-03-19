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
    <div className="mesh-bg min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-10 selection:bg-vault-indigo/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 items-start">
          
          {/* Left: Terminal Console Sidebar */}
          <div className="w-full xl:w-[380px] xl:sticky xl:top-28">
            <div className="glass-card rounded-3xl sm:rounded-[40px] overflow-hidden shadow-2xl relative border-white/10 group">
               {/* Decorative Scanner Line */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-vault-cyan to-transparent opacity-50 animate-glow-line"></div>
               
               <div className="p-6 sm:p-8 pb-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-syne text-white mb-1 uppercase tracking-tight">Terminal</h2>
                  <p className="text-vault-muted text-[9px] font-black uppercase tracking-[0.3em]">Vault Execution Interface</p>
               </div>

               <div className="flex p-1.5 bg-white/5 mx-5 sm:mx-6 mb-6 rounded-2xl border border-white/5">
                  <button
                     onClick={() => setTab('deposit')}
                     className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-500 ${
                       tab === 'deposit' ? 'bg-white text-black shadow-2xl' : 'text-vault-muted hover:text-white hover:bg-white/5'
                     }`}
                  >
                     Deposit
                  </button>
                  <button
                     onClick={() => setTab('withdraw')}
                     className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-500 ${
                       tab === 'withdraw' ? 'bg-white text-black shadow-2xl' : 'text-vault-muted hover:text-white hover:bg-white/5'
                     }`}
                  >
                     Withdraw
                  </button>
               </div>

               <div className="px-5 sm:px-6 pb-8">
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {tab === 'deposit' ? <DepositPanel /> : <WithdrawPanel />}
                  </div>
               </div>

               {/* Console Status Bar */}
               <div className="p-4 bg-white/5 border-t border-white/5 flex items-center justify-between px-5 sm:px-6 text-[9px] font-mono font-black uppercase tracking-widest text-vault-faint group-hover:text-vault-muted transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-vault-cyan animate-pulse"></span>
                    Sync: Active
                  </span>
                  <span>v.1.0.4</span>
               </div>
            </div>
          </div>

          {/* Right: Mission Control Center */}
          <div className="flex-grow space-y-8 lg:space-y-10 w-full min-w-0">
             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-3">
                   <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full glass border border-white/10 text-[8px] font-black uppercase tracking-widest text-vault-cyan">
                      Sector: Polkadot Hub / EVM-1
                   </div>
                   <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-syne text-white tracking-tight uppercase leading-none">Command Center</h1>
                   <p className="text-vault-muted text-sm max-w-xl font-light leading-relaxed">
                      Trustless yield aggregation secured by <span className="text-white font-medium">QX DAO consensus</span> and AI-backed safety audits.
                   </p>
                </div>
                <div className="flex gap-3">
                   <div className="glass px-4 py-3 rounded-2xl border border-white/5 text-center">
                      <div className="text-[8px] font-black uppercase tracking-widest text-vault-faint mb-0.5">Status</div>
                      <div className="text-xs font-bold text-vault-emerald uppercase tracking-tighter">Operational</div>
                   </div>
                </div>
             </div>

             <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
                <VaultStats />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-8 space-y-8 lg:space-y-10">
                   <StrategyDisplay />
                   <UserPosition />
                </div>
                <div className="lg:col-span-4 space-y-8 lg:space-y-10">
                   <XCMBridge />
                   <PVMSecurity />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
