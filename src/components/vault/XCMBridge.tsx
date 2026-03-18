import React from 'react'

export const XCMBridge: React.FC = () => {
  return (
    <div className="bg-vault-bg2 border border-vault-border rounded-3xl p-6 md:p-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-vault-teal/10 text-vault-teal text-[10px] font-bold px-3 py-1 rounded-full border border-vault-teal/20 uppercase tracking-widest">
           XCM Enabled
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold font-syne flex items-center gap-2">
             Cross-chain Deposit
             <svg className="w-5 h-5 text-vault-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
          </h3>
          <p className="text-vault-muted text-xs">Bridge DOT from Asset Hub or other Parachains directly into Quorex.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 bg-vault-bg rounded-2xl border border-vault-border space-y-2">
              <p className="text-[10px] text-vault-muted uppercase font-bold tracking-widest">Source Chain</p>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-vault-purple rounded-full flex items-center justify-center text-[10px] font-bold">P</div>
                 <span className="text-sm font-bold">Asset Hub</span>
                 <svg className="w-4 h-4 text-vault-faint ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
           </div>
           <div className="p-4 bg-vault-bg rounded-2xl border border-vault-border space-y-2">
              <p className="text-[10px] text-vault-muted uppercase font-bold tracking-widest">Destination</p>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-vault-teal rounded-full flex items-center justify-center text-[10px] font-bold text-vault-bg">Q</div>
                 <span className="text-sm font-bold">Quorex</span>
              </div>
           </div>
        </div>

        <button className="w-full py-4 bg-vault-bg border border-vault-purple/30 text-vault-purple font-bold rounded-2xl hover:bg-vault-purple hover:text-white transition-all text-sm flex items-center justify-center gap-2 group">
           <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
           Configure XCM Transfer
        </button>

        <p className="text-[10px] text-center text-vault-faint italic">Powered by Hyperbridge & Polkadot XCM v3</p>
      </div>
    </div>
  )
}
