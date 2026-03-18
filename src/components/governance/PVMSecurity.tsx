import React from 'react'

export const PVMSecurity: React.FC = () => {
  return (
    <div className="bg-vault-bg2 border border-vault-purple/30 rounded-3xl p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-vault-amber/10 text-vault-amber text-[10px] font-bold px-3 py-1 rounded-full border border-vault-amber/20 uppercase tracking-widest animate-pulse">
           PVM Verified
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold font-syne flex items-center gap-2">
           PVM Safety Proof
           <svg className="w-5 h-5 text-vault-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </h3>
        
        <p className="text-vault-muted text-xs">
           This strategy calldata has been pre-validated using a specialized **Rust library** called via **PolkaVM precompiles** (Track 2 Experiment).
        </p>

        <div className="p-4 bg-vault-bg rounded-2xl border border-vault-border space-y-3">
           <div className="flex justify-between items-center text-[10px] text-vault-muted font-bold uppercase">
              <span>Execution Integrity</span>
              <span className="text-vault-teal">Passed</span>
           </div>
           <div className="w-full h-1.5 bg-vault-bg3 rounded-full overflow-hidden">
              <div className="h-full bg-vault-teal w-[94%]"></div>
           </div>
           <p className="text-[10px] text-vault-faint font-mono truncate">0x7d...f2 (PVM Proof Hash)</p>
        </div>

        <div className="flex items-center gap-2 pt-2">
           <span className="w-2 h-2 bg-vault-purple rounded-full"></span>
           <span className="text-[10px] text-vault-muted font-bold uppercase">Leveraging Native Speed</span>
        </div>
      </div>
    </div>
  )
}
