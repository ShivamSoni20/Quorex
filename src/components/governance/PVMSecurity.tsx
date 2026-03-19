import React from 'react'

export const PVMSecurity: React.FC = () => {
  return (
    <div className="glass-card rounded-[40px] p-8 relative overflow-hidden group border-white/10">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-vault-cyan/5 blur-[60px] group-hover:bg-vault-cyan/10 transition-colors duration-1000"></div>
      
      <div className="absolute top-0 right-0 p-6">
        <div className="bg-vault-emerald/10 text-vault-emerald text-[9px] font-black px-4 py-1.5 rounded-full border border-vault-emerald/20 uppercase tracking-[0.2em] shadow-xl animate-pulse">
           PVM Shields Active
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-2xl font-black font-syne flex items-center gap-3 text-white uppercase italic tracking-tighter">
           PVM Safety Proof
           <svg className="w-5 h-5 text-vault-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </h3>
        
        <p className="text-vault-muted text-xs font-light uppercase tracking-widest leading-relaxed">
           Strategy calldata pre-validated via <span className="text-white font-medium">Rust PVM-runtime</span>. All execution paths are cryptographically verified.
        </p>

        <div className="p-6 glass rounded-3xl border border-white/5 space-y-4 group-hover:border-vault-emerald/30 transition-colors duration-500">
           <div className="flex justify-between items-center text-[9px] text-vault-muted font-black uppercase tracking-[0.2em]">
              <span className="italic">Execution Integrity</span>
              <span className="text-vault-emerald">Verified 99.9%</span>
           </div>
           <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-vault-emerald to-vault-cyan w-[99.9%]"></div>
           </div>
           <div className="flex justify-between items-center">
              <p className="text-[8px] text-vault-faint font-mono uppercase tracking-[0.2em]">Hash: 0x7d...f28c</p>
              <span className="text-[8px] font-black text-vault-emerald uppercase tracking-widest bg-vault-emerald/10 px-2 py-0.5 rounded">Secure</span>
           </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
           <div className="w-2 h-2 bg-vault-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
           <span className="text-[9px] text-vault-muted font-black uppercase tracking-[0.3em] italic">Zero-Knowledge Attestation Ready</span>
        </div>
      </div>
    </div>
  )
}
