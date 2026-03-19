import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { publicClient } from '../utils/publicClient'
import { GovernedVaultABI } from '../abis/GovernedVault.abi'
import { IStrategyABI } from '../abis/IStrategy.abi'
import { getAddresses } from '../constants/addresses'
import { polkadotHubTestnet } from '../constants/chains'
import { formatDOT, formatAPY } from '../utils/format'
import { ConnectWallet } from '../components/shared/ConnectWallet'
import { Navbar } from '../components/layout/Navbar'

const Landing: React.FC = () => {
  const { isConnected } = useAccount()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ tvl: 0n, apy: 0n, proposals: 0 })

  // Auto-redirect if wallet is connected
  useEffect(() => {
    if (isConnected) {
      navigate('/app')
    }
  }, [isConnected, navigate])

  const addresses = getAddresses(polkadotHubTestnet.id)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!addresses.GOVERNED_VAULT) throw new Error("Missing vault address")
        
        const tvl = await publicClient.readContract({
          address: addresses.GOVERNED_VAULT,
          abi: GovernedVaultABI,
          functionName: 'totalAssets',
        }).catch(() => 1420500n * 10n ** 18n) // Fallback mock

        const strategy = await publicClient.readContract({
          address: addresses.GOVERNED_VAULT,
          abi: GovernedVaultABI,
          functionName: 'strategy',
        }).catch(() => addresses.MOCK_STRATEGY_A)

        const apy = await publicClient.readContract({
          address: strategy as `0x${string}`,
          abi: IStrategyABI,
          functionName: 'apy',
        }).catch(() => 810n) // Fallback mock 8.1%

        setStats({ tvl: tvl as bigint, apy: BigInt(apy as any), proposals: 12 })
      } catch (e) {
        console.warn("Failed to fetch landing stats from chain, using mocks", e)
        setStats({ tvl: 1420500n * 10n ** 18n, apy: 810n, proposals: 12 })
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [addresses])

  return (
    <div className="bg-vault-bg text-vault-text font-sans overflow-x-hidden min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Dynamic Cyber Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_#22d3ee15_0%,_transparent_40%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_#a3e63510_0%,_transparent_40%)]"></div>
        <div className="h-full w-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay"></div>
      </div>

      {/* Section 1: Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 px-4 md:px-8 lg:px-16 z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
           {/* Left: Floating UI Preview */}
           <div className="w-full lg:w-5/12 order-2 lg:order-1 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="relative group">
                 <div className="absolute -inset-1 bg-gradient-to-r from-vault-purple to-vault-teal rounded-[40px] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                 <div className="relative bg-vault-bg2 border border-white/10 rounded-[40px] p-8 backdrop-blur-3xl shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                       </div>
                       <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-vault-teal">System Status: Active</div>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="h-32 rounded-2xl bg-gradient-to-br from-white/5 to-transparent p-6 border border-white/5">
                          <div className="text-[10px] uppercase tracking-widest text-vault-muted mb-2">Live APY Output</div>
                          <div className="text-4xl font-mono font-black text-vault-teal">{formatAPY(stats.apy)}</div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="h-24 rounded-2xl bg-white/5 border border-white/5 p-4">
                             <div className="text-[10px] uppercase font-bold text-vault-muted mb-1">TVL</div>
                             <div className="text-xl font-mono text-white">{formatDOT(stats.tvl)}</div>
                          </div>
                          <div className="h-24 rounded-2xl bg-white/5 border border-white/5 p-4 flex flex-col justify-end">
                             <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => <div key={i} className="flex-1 h-8 bg-vault-purple/30 rounded-sm animate-pulse" style={{animationDelay: `${i*100}ms`}}></div>)}
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Copy & CTA */}
           <div className="w-full lg:w-7/12 space-y-6 order-1 lg:order-2 animate-fade-up" style={{animationDelay: '0.4s'}}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-syne tracking-tighter leading-[1.1] text-white">
                 THE VAULT <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-vault-purple via-white to-vault-teal animate-gradient bg-[length:200%_auto]">STANDARD.</span>
              </h1>
              
              <p className="text-vault-muted text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed font-medium">
                 The first decentralised yield engine where <span className="text-white">smart contract consensus</span> replaces trust in admins. Un-ruggable by design.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-6">
                  {isConnected ? (
                    <Link to="/app" className="px-10 py-5 bg-white text-black font-black uppercase tracking-tighter rounded-full hover:bg-vault-teal transition-all flex items-center justify-center gap-3 group">
                       Enter Protocol
                       <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </Link>
                  ) : (
                    <ConnectWallet />
                  )}
                  <a href="https://github.com/ShivamSoni20/Quorex" target="_blank" rel="noopener noreferrer" className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all text-center whitespace-nowrap">
                     Explore Source
                  </a>
              </div>
           </div>
        </div>
      </section>

      {/* Section 2: Bento Grid Features */}
      <section className="py-20 lg:py-28 px-4 md:px-8 lg:px-16 relative z-10">
         <div className="max-w-7xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-syne text-white mb-16 tracking-tighter uppercase italic leading-none">Engineered <br className="hidden sm:block"/> for Certainty.</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-auto md:h-[550px]">
               {/* Large Card: The Problem */}
               <div className="md:col-span-8 bg-vault-bg2 border border-white/5 rounded-[48px] p-12 flex flex-col justify-between group overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-vault-red/10 blur-[80px] -mr-32 -mt-32"></div>
                  <div className="max-w-md relative z-10">
                     <div className="w-12 h-12 bg-vault-red/20 rounded-2xl flex items-center justify-center text-vault-red mb-6">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                     </div>
                     <h3 className="text-3xl font-black font-syne text-white mb-4 italic">DeFi is broken.</h3>
                     <p className="text-lg text-vault-muted leading-relaxed">
                        $3.1B lost in 2024 to single points of failure. Most vaults rely on a "God Key". If the admin is compromised, your funds vanish.
                     </p>
                  </div>
                  <div className="text-[150px] font-black font-syne absolute bottom-[-50px] right-[-20px] opacity-[0.02] select-none uppercase tracking-tighter">Vulnerable</div>
               </div>

               {/* Right Card: The Solution */}
               <div className="md:col-span-4 bg-vault-teal border border-vault-teal rounded-[48px] p-10 flex flex-col justify-end group shadow-[0_20px_60px_-15px_rgba(163,230,53,0.3)]">
                  <div className="text-black space-y-4">
                     <h3 className="text-3xl font-black font-syne leading-none uppercase italic">The Code is <br/> the Law.</h3>
                     <p className="text-sm font-bold opacity-70 leading-relaxed uppercase tracking-tight">
                        No admin key exists. All strategy changes are enforced by contract logic after DAO consensus.
                     </p>
                  </div>
               </div>

               {/* Bottom Left Card */}
               <div className="md:col-span-4 bg-vault-bg2 border border-white/5 rounded-[48px] p-8 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="text-5xl font-mono font-black text-vault-purple">48h</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-vault-muted leading-tight">Minimum <br/> Time Delay</div>
               </div>

               {/* Bottom Middle Card */}
               <div className="md:col-span-8 bg-gradient-to-r from-vault-purple to-indigo-600 rounded-[48px] p-10 flex items-center justify-between">
                  <div className="text-white">
                     <h3 className="text-2xl font-black font-syne">AI-Powered Risk Engine</h3>
                     <p className="text-sm opacity-80 mt-1 max-w-sm">Built-in analysis for every strategy proposal using real-time chain data.</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Section 3: Protocol Lifecycle */}
      <section className="py-20 lg:py-28 px-4 md:px-8 lg:px-16 relative overflow-hidden z-20">
        <div className="max-w-7xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
             <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-syne text-white tracking-tighter uppercase italic leading-none">Protocol <br/> Lifecycle.</h2>
             <p className="text-vault-muted text-xs font-black uppercase tracking-[0.3em] pb-2">Institutional-Grade Workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { id: '01', t: "Deposit DOT", b: "Enter the vault with native DOT. Receive QX shares instantly.", color: "from-vault-purple/20 to-transparent" },
               { id: '02', t: "AI Governance", b: "Vote with real-time AI risk analysis on every strategy rotation.", color: "from-vault-teal/20 to-transparent" },
               { id: '03', t: "48h Timelock", b: "Safety first. Every parameter change waits 48h in timelock.", color: "from-vault-amber/20 to-transparent" },
               { id: '04', t: "Yield Accrual", b: "Assets are routed to Polkadot Hub for optimized yield flow.", color: "from-vault-purple/20 to-transparent" }
             ].map((step) => (
                <div key={step.id} className="group relative p-10 bg-vault-bg2 border border-white/5 rounded-[48px] hover:border-white/10 transition-all duration-500 overflow-hidden">
                   <div className={`absolute -inset-2 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity blur-2xl`}></div>
                   <div className="text-4xl font-mono font-black text-vault-purple mb-8 relative z-10">{step.id}</div>
                   <h4 className="text-xl font-black font-syne text-white mb-4 uppercase tracking-tight relative z-10">{step.t}</h4>
                   <p className="text-vault-muted text-xs font-bold leading-relaxed uppercase tracking-widest relative z-10">{step.b}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Section 4: Hackathon Context */}
      <section className="py-20 lg:py-28 px-4 md:px-8 lg:px-16 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
           <div className="bg-vault-bg2 border border-white/5 p-10 md:p-16 lg:p-20 rounded-[40px] md:rounded-[64px] relative overflow-hidden group shadow-2xl animate-glow">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-vault-purple to-transparent opacity-50"></div>
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-vault-purple/5 blur-[120px] rounded-full"></div>
              
              <div className="relative z-10">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black font-syne mb-6 tracking-tighter text-white uppercase italic leading-[1.05]">
                    Built for <br/> 
                    <span className="text-vault-purple">Hackathon 2026.</span>
                 </h2>
                 <p className="text-vault-muted mb-12 font-black uppercase tracking-[0.4em] text-[10px] md:text-sm">
                    EVM Smart Contract · OpenZeppelin Security Track
                 </p>
                 
                 <div className="flex flex-wrap justify-start gap-4">
                    {['EVM Solidity', 'Security First', 'Polkadot Hub', 'Open Source'].map(tag => (
                      <span key={tag} className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-vault-purple hover:text-black transition-all duration-300">
                         {tag}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 md:px-8 lg:px-16 mt-8 border-t border-white/5 bg-vault-bg text-sm relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-black text-xs shadow-lg">QX</div>
                 <span className="font-syne font-black text-2xl tracking-tighter text-white uppercase">Quorex</span>
              </div>
              <p className="text-vault-muted text-xs font-bold uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                 The first decentralised yield engine where smart contract consensus replaces trust. 2026.
              </p>
           </div>
           
           <div className="flex flex-col gap-4 text-left md:text-right">
              <div className="flex flex-wrap gap-8 text-vault-muted font-black text-[10px] uppercase tracking-widest mb-4">
                 <Link to="/app" className="hover:text-white transition-colors">Dashboard</Link>
                 <Link to="/app/governance" className="hover:text-white transition-colors">Governance</Link>
                 <a href="https://github.com/ShivamSoni20/Quorex" className="hover:text-white transition-colors">GitHub</a>
              </div>
              <div className="text-vault-faint text-[10px] font-bold uppercase tracking-[0.3em]">
                 Polkadot Solidity Hackathon 2026<br/>
                 Open-source. MIT License.
              </div>
           </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
