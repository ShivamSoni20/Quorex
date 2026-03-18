import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-vault-border bg-vault-bg2 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 grayscale brightness-75">
             <div className="w-6 h-6 rounded bg-vault-purple flex items-center justify-center font-bold text-[10px] text-white">QX</div>
             <span className="text-sm font-bold tracking-tight text-vault-muted">Quorex MVP</span>
          </div>

          <p className="text-xs text-vault-faint">
             Built for Polkadot Solidity Hackathon 2026. Trustless Governance Secured.
          </p>

          <div className="flex items-center gap-4 text-vault-muted">
             <a href="#" className="hover:text-vault-purple transition-colors">Docs</a>
             <a href="#" className="hover:text-vault-purple transition-colors">GitHub</a>
             <a href="#" className="hover:text-vault-purple transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
