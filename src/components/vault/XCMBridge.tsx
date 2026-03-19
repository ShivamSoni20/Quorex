import React from 'react'

export const XCMBridge: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden group border-white/10">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-vault-cyan/10 text-vault-cyan text-[8px] font-black px-3 py-1 rounded-full border border-vault-cyan/20 uppercase tracking-[0.15em] shadow-xl">
           XCM v3
        </div>
      </div>

      <div className="space-y-5 pt-2">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-black font-syne flex items-center gap-2 text-white uppercase italic tracking-tighter">
             XCM Transit
             <svg className="w-4 h-4 text-vault-indigo animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </h3>
          <p className="text-vault-muted text-[10px] font-light uppercase tracking-wider leading-relaxed">Bridge assets from Asset Hub or other Parachains directly into Quorex.</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
           <div className="p-4 glass rounded-xl border border-white/5 space-y-2 group-hover:border-white/10 transition-colors">
              <p className="text-[8px] text-vault-faint uppercase font-black tracking-[0.2em] italic">Origin Network</p>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-white text-black rounded-lg flex items-center justify-center text-[8px] font-black shadow-xl">AH</div>
                 <span className="text-xs font-black uppercase tracking-widest text-white">Asset Hub</span>
                 <svg className="w-3.5 h-3.5 text-vault-faint ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
           </div>
           <div className="flex justify-center -my-1 relative z-10">
              <div className="w-6 h-6 glass rounded-full flex items-center justify-center border border-white/10 shadow-xl bg-vault-bg">
                 <svg className="w-3 h-3 text-vault-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
           </div>
           <div className="p-4 glass rounded-xl border border-white/5 space-y-2 group-hover:border-white/10 transition-colors">
              <p className="text-[8px] text-vault-faint uppercase font-black tracking-[0.2em] italic">Target Vault</p>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-vault-cyan text-black rounded-lg flex items-center justify-center text-[8px] font-black shadow-xl">QX</div>
                 <span className="text-xs font-black uppercase tracking-widest text-white">Quorex Hub</span>
              </div>
           </div>
        </div>

        <button className="w-full py-4 glass border border-vault-indigo/30 text-vault-indigo font-black rounded-xl hover:bg-vault-indigo hover:text-white transition-all text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 group relative overflow-hidden shadow-xl">
           <div className="absolute inset-0 bg-gradient-to-r from-vault-indigo to-vault-cyan opacity-0 group-hover:opacity-10 transition-opacity"></div>
           Open Transit Console
           <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
        </button>

        <p className="text-[8px] text-center text-vault-faint font-black uppercase tracking-[0.3em]">Powered by Polkadot Core</p>
      </div>
    </div>
  )
}
