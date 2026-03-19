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
    <div className="mesh-bg min-h-screen pt-32 pb-20 px-6 lg:px-12 selection:bg-vault-indigo/30">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col xl:flex-row gap-12 items-start">
          
          {/* Left: Terminal Console Sidebar */}
          <div className="w-full xl:w-[440px] xl:sticky xl:top-32">
            <div className="glass-card rounded-[48px] overflow-hidden shadow-2xl relative border-white/10 group">
               {/* Decorative Scanner Line */}
               <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-vault-cyan to-transparent opacity-50 animate-glow-line"></div>
               
               <div className="p-10 pb-6">
                  <h2 className="text-3xl font-black font-syne text-white mb-2 uppercase italic tracking-tighter">Terminal</h2>
                  <p className="text-vault-muted text-[10px] font-black uppercase tracking-[0.4em]">Vault Execution Interface</p>
               </div>

               <div className="flex p-2 bg-white/5 mx-8 mb-8 rounded-[24px] border border-white/5">
                  <button
                     onClick={() => setTab('deposit')}
                     className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 ${
                       tab === 'deposit' ? 'bg-white text-black shadow-2xl scale-100' : 'text-vault-muted hover:text-white hover:bg-white/5 scale-95'
                     }`}
                  >
                     Deposit
                  </button>
                  <button
                     onClick={() => setTab('withdraw')}
                     className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.2em] rounded-[18px] transition-all duration-500 ${
                       tab === 'withdraw' ? 'bg-white text-black shadow-2xl scale-100' : 'text-vault-muted hover:text-white hover:bg-white/5 scale-95'
                     }`}
                  >
                     Withdraw
                  </button>
               </div>

               <div className="px-10 pb-12">
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {tab === 'deposit' ? <DepositPanel /> : <WithdrawPanel />}
                  </div>
               </div>

               {/* Console Status Bar */}
               <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between px-10 text-[10px] font-mono font-black uppercase tracking-widest text-vault-faint group-hover:text-vault-muted transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse"></span>
                    Sync: Active
                  </span>
                  <span>v.1.0.4-hackathon</span>
               </div>
            </div>
          </div>

          {/* Right: Mission Control Center */}
          <div className="flex-grow space-y-12 w-full">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
                <div className="space-y-4">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-[9px] font-black uppercase tracking-widest text-vault-cyan">
                      Sector: Polkadot Hub / EVM-1
                   </div>
                   <h1 className="text-5xl md:text-7xl font-black font-syne text-white tracking-tighter uppercase italic leading-none">Command Center</h1>
                   <p className="text-vault-muted text-lg max-w-2xl font-light">
                      Trustless yield aggregation secured by <span className="text-white font-medium italic">QX DAO consensus</span> and AI-backed safety audits.
                   </p>
                </div>
                <div className="flex gap-4">
                   <div className="glass px-6 py-4 rounded-3xl border border-white/5 text-center">
                      <div className="text-[9px] font-black uppercase tracking-widest text-vault-faint mb-1">Status</div>
                      <div className="text-sm font-bold text-vault-emerald uppercase tracking-tighter">Operational</div>
                   </div>
                </div>
             </div>

             <div className="animate-in fade-in slide-in-from-right-8 duration-1000">
                <VaultStats />
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                   <StrategyDisplay />
                   <UserPosition />
                </div>
                <div className="lg:col-span-4 space-y-12">
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

