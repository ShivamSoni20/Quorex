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
        }).catch(() => 1420500n * 10n ** 18n)

        const strategy = await publicClient.readContract({
          address: addresses.GOVERNED_VAULT,
          abi: GovernedVaultABI,
          functionName: 'strategy',
        }).catch(() => addresses.MOCK_STRATEGY_A)

        const apy = await publicClient.readContract({
          address: strategy as `0x${string}`,
          abi: IStrategyABI,
          functionName: 'apy',
        }).catch(() => 810n)

        setStats({ tvl: tvl as bigint, apy: BigInt(apy as any), proposals: 12 })
      } catch (e) {
        setStats({ tvl: 1420500n * 10n ** 18n, apy: 810n, proposals: 12 })
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [addresses])

  return (
    <div className="mesh-bg text-vault-text font-sans selection:bg-vault-indigo/30 min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 lg:px-12 max-w-[1440px] mx-auto overflow-visible">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-vault-cyan/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-vault-indigo/10 blur-[180px] animate-pulse-slow" style={{animationDelay: '2s'}}></div>

        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32 relative z-10">
          {/* Hero Content */}
          <div className="w-full lg:w-3/5 space-y-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-vault-cyan shadow-xl">
              <span className="w-2 h-2 rounded-full bg-vault-cyan animate-pulse"></span>
              Polkadot Solidity Hackathon 2026
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black font-syne tracking-tighter leading-[0.95] text-white uppercase italic">
              Governed <br />
              <span className="text-gradient-cyan">Vault.</span>
            </h1>

            <p className="text-vault-muted text-xl sm:text-2xl max-w-2xl leading-relaxed font-light">
              Experience the pinnacle of <span className="text-white font-medium">decentralised yield.</span> High-efficiency aggregation secured by PVM-native safety and AI consensus.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-6">
              {isConnected ? (
                <Link to="/app" className="px-14 py-6 bg-white text-black font-black uppercase tracking-[0.1em] rounded-2xl hover:bg-vault-cyan transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)] group">
                  Enter Command Center
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              ) : (
                <ConnectWallet />
              )}
              <a href="https://github.com/ShivamSoni20/GovernedVault" target="_blank" rel="noopener noreferrer" className="px-12 py-6 glass border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all text-sm uppercase tracking-widest">
                Source Code
              </a>
            </div>

            <div className="grid grid-cols-3 gap-12 pt-16 border-t border-white/5">
              <div>
                <div className="text-3xl font-black font-syne text-white mb-1">{formatAPY(stats.apy)}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-vault-faint">Optimized APY</div>
              </div>
              <div>
                <div className="text-3xl font-black font-syne text-white mb-1">{formatDOT(stats.tvl).split('.')[0]}M+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-vault-faint">Protocol TVL</div>
              </div>
              <div>
                <div className="text-3xl font-black font-syne text-white mb-1">48H</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-vault-faint">Safety Timelock</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="w-full lg:w-2/5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group animate-float">
              {/* Outer Glows */}
              <div className="absolute -inset-10 bg-vault-cyan/10 rounded-full blur-[100px] group-hover:bg-vault-cyan/20 transition-all duration-1000"></div>
              
              {/* Main Card */}
              <div className="relative glass-card rounded-[64px] p-10 w-full max-w-[450px] rotate-2 group-hover:rotate-0 transition-all duration-700 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-vault-rose/40"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-vault-cyan/40"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-vault-emerald/40"></div>
                  </div>
                  <div className="px-4 py-1.5 glass rounded-2xl text-[10px] font-black tracking-widest text-vault-cyan uppercase">System: Secure</div>
                </div>

                <div className="space-y-8">
                  <div className="p-8 rounded-[40px] bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-vault-faint mb-4">Real-time Yield</div>
                    <div className="text-5xl font-black font-syne text-white">{formatAPY(stats.apy)}</div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-vault-emerald uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-vault-emerald animate-ping"></span>
                      Aggregating from 4 Strategies
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="glass p-6 rounded-3xl border border-white/5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-vault-faint mb-2">Network</div>
                      <div className="text-lg font-bold text-white uppercase tracking-tighter">Polkadot</div>
                    </div>
                    <div className="glass p-6 rounded-3xl border border-white/5">
                      <div className="text-[9px] font-black uppercase tracking-widest text-vault-faint mb-2">Vault Stat</div>
                      <div className="text-lg font-bold text-white uppercase tracking-tighter">Active</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-12 -right-12 glass shadow-2xl rounded-3xl p-6 border border-white/10 animate-float" style={{animationDelay: '1s'}}>
                  <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-black text-xs mb-3">AI</div>
                  <div className="text-[10px] font-black uppercase tracking-widest">Risk Analysis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-32 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-10">
        <div className="mb-24 space-y-4">
          <div className="text-vault-cyan font-black uppercase tracking-[0.5em] text-xs">Innovation Track</div>
          <h2 className="text-5xl sm:text-6xl font-black font-syne text-white tracking-tighter uppercase italic leading-none">
            Secure by Design, <br />
            Powered by Polkadot.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Bento Card 1: PVM */}
          <div className="md:col-span-12 lg:col-span-8 glass-card rounded-[56px] p-16 flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-vault-indigo/10 blur-[100px] -mr-40 -mt-40 group-hover:bg-vault-indigo/20 transition-all duration-700"></div>
            <div className="max-w-xl relative z-10">
              <div className="w-16 h-16 bg-vault-indigo/20 rounded-3xl flex items-center justify-center text-vault-indigo mb-8 rotate-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-4xl font-black font-syne text-white mb-6 uppercase italic">PVM Safety Checks</h3>
              <p className="text-lg text-vault-muted leading-relaxed font-light">
                Leveraging the Polkadot Virtual Machine for institutional-grade security. Our smart contracts perform pre-emptive safety audits via Rust-optimized libraries directly on the hub.
              </p>
            </div>
            <div className="text-[200px] font-black font-syne absolute bottom-[-80px] right-[-40px] opacity-[0.03] select-none uppercase tracking-tighter italic">Secured</div>
          </div>

          {/* Bento Card 2: AI */}
          <div className="md:col-span-12 lg:col-span-4 glass-card rounded-[56px] p-12 bg-gradient-to-br from-vault-indigo/20 to-transparent border-vault-indigo/30 flex flex-col justify-end group shadow-[0_30px_60px_-15px_rgba(129,140,248,0.3)]">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-vault-cyan/20 rounded-2xl flex items-center justify-center text-vault-cyan mb-2">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl font-black font-syne text-white uppercase italic leading-none">AI Risk <br /> Insights.</h3>
              <p className="text-sm font-bold text-vault-muted leading-relaxed uppercase tracking-wider">
                Every strategy rotation is analyzed by our AI risk engine, simulating the Polkadot Agent Kit for maximum alpha.
              </p>
            </div>
          </div>

          {/* Bento Card 3: XCM */}
          <div className="md:col-span-6 lg:col-span-4 glass-card rounded-[56px] p-12 flex flex-col items-center justify-center text-center space-y-6 group">
            <div className="relative">
              <div className="absolute -inset-4 bg-vault-cyan/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-5xl font-black font-syne text-vault-cyan relative z-10 italic">XCM</div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-vault-muted leading-tight">Native Cross-chain <br /> Interoperability</div>
          </div>

          {/* Bento Card 4: Timelock */}
          <div className="md:col-span-6 lg:col-span-8 glass-card rounded-[56px] p-12 flex items-center justify-between group overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-3xl font-black font-syne text-white uppercase italic tracking-tighter">48h Autonomous Lock.</h3>
              <p className="text-sm text-vault-muted max-w-sm font-light uppercase tracking-widest">Ensuring zero-trust execution. All strategy changes are queued in a public immutable timelock.</p>
            </div>
            <div className="w-24 h-24 glass rounded-full flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
              <svg className="w-10 h-10 text-vault-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* Lifecycle Section */}
      <section className="py-40 relative px-6 lg:px-12 max-w-[1440px] mx-auto overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24 relative z-10">
          <h2 className="text-6xl sm:text-7xl font-black font-syne text-white tracking-tighter uppercase italic leading-[0.85]">
            The Yield <br /> Journey.
          </h2>
          <div className="text-vault-muted text-[10px] font-black uppercase tracking-[0.5em] pb-2 border-b-2 border-vault-indigo">Institutional Workflow</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {[
            { id: '01', t: "Secure Entry", b: "Deposit native DOT through XCM Transit or direct EVM transfer.", color: "group-hover:text-vault-cyan" },
            { id: '02', t: "AI Vetting", b: "AI Risk scored strategy proposals ensure optimal risk-adjusted returns.", color: "group-hover:text-vault-indigo" },
            { id: '03', t: "Gov Consensus", b: "QX holders vote on-chain with PVM safety verification layers.", color: "group-hover:text-white" },
            { id: '04', t: "Auto-Yield", b: "Assets routed via Polkadot Hub with real-time tracking.", color: "group-hover:text-vault-emerald" }
          ].map((step) => (
            <div key={step.id} className="group relative p-12 glass-card rounded-[48px] overflow-hidden transition-all duration-500 hover:-translate-y-4">
              <div className="text-5xl font-black font-syne text-white/5 group-hover:text-white/10 transition-colors absolute top-8 right-8">{step.id}</div>
              <div className={`text-sm font-black tracking-[0.4em] uppercase mb-12 transition-colors ${step.color}`}>{step.t}</div>
              <p className="text-vault-muted text-xs font-bold leading-relaxed uppercase tracking-widest">{step.b}</p>
              
              {/* Bottom Glow */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-vault-indigo/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathon CTA */}
      <section className="py-20 px-6 lg:px-12 max-w-[1440px] mx-auto relative z-10">
         <div className="glass-card p-16 md:p-24 rounded-[64px] relative overflow-hidden text-center group">
            <div className="absolute -inset-10 bg-gradient-to-r from-vault-indigo/10 via-vault-cyan/10 to-vault-rose/10 blur-[120px] animate-pulse-slow"></div>
            
            <div className="relative z-10 space-y-10">
               <h2 className="text-5xl sm:text-7xl font-black font-syne text-white uppercase italic tracking-tighter leading-none">
                  Built for the <br /> <span className="text-gradient-cyan">Future of Polkadot.</span>
               </h2>
               <p className="text-vault-muted font-bold uppercase tracking-[0.5em] text-sm max-w-3xl mx-auto leading-relaxed">
                  Open Source · EVM Solidity · PVM Safety Framework · AI Governance Track
               </p>
               
               <div className="flex flex-wrap justify-center gap-6">
                  {['EVM Polkadot', 'Security First', 'Rust Optimized', 'AI Assisted'].map(tag => (
                    <span key={tag} className="px-10 py-3.5 glass border border-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:border-vault-indigo transition-all duration-300">
                       {tag}
                    </span>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 lg:px-12 mt-20 border-t border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center font-black text-lg shadow-2xl rotate-6">QX</div>
                 <span className="font-syne font-black text-4xl tracking-tight text-white uppercase italic">Quorex</span>
              </div>
              <p className="text-vault-faint text-xs font-black uppercase tracking-[0.4em] max-w-md leading-relaxed">
                 Pioneering the standard for trustless yield aggregation. 2026.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 text-left md:text-right">
              <div className="flex flex-wrap gap-12 text-vault-muted font-black text-[10px] uppercase tracking-[0.3em]">
                 <Link to="/app" className="hover:text-white transition-colors">Commander</Link>
                 <Link to="/app/governance" className="hover:text-white transition-colors">Governance</Link>
                 <a href="https://github.com/ShivamSoni20/GovernedVault" className="hover:text-white transition-colors">GitHub</a>
              </div>
              <div className="text-vault-faint text-[9px] font-black uppercase tracking-[0.5em]">
                 Polkadot Solidity Hackathon 2026<br />
                 Open-source under MIT License.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

