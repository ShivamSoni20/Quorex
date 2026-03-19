import React from 'react'

export const XCMBridge: React.FC = () => {
  return (
    <div className="glass-card rounded-[40px] p-8 relative overflow-hidden group border-white/10">
      <div className="absolute top-0 right-0 p-6">
        <div className="bg-vault-cyan/10 text-vault-cyan text-[9px] font-black px-4 py-1.5 rounded-full border border-vault-cyan/20 uppercase tracking-[0.2em] shadow-xl">
           XCM Protocol v3
        </div>
      </div>

      <div className="space-y-8 pt-4">
        <div className="space-y-3">
          <h3 className="text-2xl font-black font-syne flex items-center gap-3 text-white uppercase italic tracking-tighter">
             XCM Transit
             <svg className="w-5 h-5 text-vault-indigo animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </h3>
          <p className="text-vault-muted text-xs font-light uppercase tracking-widest leading-relaxed">Bridge assets from Asset Hub or other Parachains directly into Quorex Command.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
           <div className="p-5 glass rounded-2xl border border-white/5 space-y-3 group-hover:border-white/10 transition-colors">
              <p className="text-[9px] text-vault-faint uppercase font-black tracking-[0.3em] italic">Origin Network</p>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-white text-black rounded-xl flex items-center justify-center text-[10px] font-black shadow-2xl">AH</div>
                 <span className="text-sm font-black uppercase tracking-widest text-white">Asset Hub</span>
                 <svg className="w-4 h-4 text-vault-faint ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
           </div>
           <div className="flex justify-center -my-2 relative z-10">
              <div className="w-8 h-8 glass rounded-full flex items-center justify-center border border-white/10 shadow-2xl bg-vault-bg">
                 <svg className="w-4 h-4 text-vault-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
           </div>
           <div className="p-5 glass rounded-2xl border border-white/5 space-y-3 group-hover:border-white/10 transition-colors">
              <p className="text-[9px] text-vault-faint uppercase font-black tracking-[0.3em] italic">Target Vault</p>
              <div className="flex items-center gap-4">
                 <div className="w-8 h-8 bg-vault-cyan text-black rounded-xl flex items-center justify-center text-[10px] font-black shadow-2xl">QX</div>
                 <span className="text-sm font-black uppercase tracking-widest text-white">Quorex Hub</span>
              </div>
           </div>
        </div>

        <button className="w-full py-5 glass border border-vault-indigo/30 text-vault-indigo font-black rounded-[24px] hover:bg-vault-indigo hover:text-white transition-all text-[11px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 group relative overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-r from-vault-indigo to-vault-cyan opacity-0 group-hover:opacity-10 transition-opacity"></div>
           Open Transit Console
           <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>

        <p className="text-[9px] text-center text-vault-faint font-black uppercase tracking-[0.4em]">Powered by Polkadot Core</p>
      </div>
    </div>
  )
}
