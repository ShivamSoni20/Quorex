import React from 'react'

export const PVMSecurity: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative overflow-hidden group border-white/10">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-vault-cyan/5 blur-[50px] group-hover:bg-vault-cyan/10 transition-colors duration-1000"></div>
      
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-vault-emerald/10 text-vault-emerald text-[8px] font-black px-3 py-1 rounded-full border border-vault-emerald/20 uppercase tracking-[0.15em] shadow-xl animate-pulse">
           PVM Active
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-lg sm:text-xl font-black font-syne flex items-center gap-2 text-white uppercase italic tracking-tighter">
           PVM Safety Proof
           <svg className="w-4 h-4 text-vault-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </h3>
        
        <p className="text-vault-muted text-[10px] font-light uppercase tracking-wider leading-relaxed">
           Strategy calldata pre-validated via <span className="text-white font-medium">Rust PVM-runtime</span>. All paths cryptographically verified.
        </p>

        <div className="p-4 glass rounded-xl border border-white/5 space-y-3 group-hover:border-vault-emerald/30 transition-colors duration-500">
           <div className="flex justify-between items-center text-[8px] text-vault-muted font-black uppercase tracking-[0.15em]">
              <span className="italic">Execution Integrity</span>
              <span className="text-vault-emerald">Verified 99.9%</span>
           </div>
           <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-vault-emerald to-vault-cyan w-[99.9%]"></div>
           </div>
           <div className="flex justify-between items-center">
              <p className="text-[7px] text-vault-faint font-mono uppercase tracking-[0.15em]">Hash: 0x7d...f28c</p>
              <span className="text-[7px] font-black text-vault-emerald uppercase tracking-widest bg-vault-emerald/10 px-1.5 py-0.5 rounded">Secure</span>
           </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
           <div className="w-1.5 h-1.5 bg-vault-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
           <span className="text-[8px] text-vault-muted font-black uppercase tracking-[0.2em] italic">ZK Attestation Ready</span>
        </div>
      </div>
    </div>
  )
}
