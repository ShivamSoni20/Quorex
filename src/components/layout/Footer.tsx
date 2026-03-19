import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-vault-border bg-vault-bg2 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black text-xs shadow-xl">QX</div>
                <span className="text-xl font-black tracking-tighter text-white font-syne uppercase">Quorex</span>
             </div>
             <p className="text-vault-muted text-xs font-bold uppercase tracking-widest leading-relaxed max-w-xs">
                The institutional standard for trustless yield aggregation. 2026.
             </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
             <a href="#" className="text-vault-muted hover:text-white transition-colors">Documentation</a>
             <a href="https://github.com/ShivamSoni20/Quorex" className="text-vault-muted hover:text-white transition-colors">Source Code</a>
             <a href="#" className="text-vault-muted hover:text-white transition-colors">Terminal</a>
          </div>

          <div className="text-left md:text-right space-y-1">
             <div className="text-[10px] font-black uppercase tracking-widest text-vault-purple">Hackathon Submission</div>
             <div className="text-[10px] text-vault-faint uppercase tracking-widest">Polkadot Hub · OpenZeppelin</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
