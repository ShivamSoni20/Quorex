import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ConnectWallet } from '../shared/ConnectWallet'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/app' },
    { name: 'Governance', path: '/app/governance' },
  ]

  // Close menu on route change
  React.useEffect(() => setIsOpen(false), [location.pathname])

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl animate-in slide-in-from-top-4 duration-1000">
      <div className="bg-vault-bg2/40 backdrop-blur-2xl border border-white/5 rounded-full px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform">
                QX
              </div>
              <span className="text-xl font-black tracking-tighter text-white font-syne uppercase">Quorex</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 bg-black/20 p-1 rounded-full border border-white/5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    location.pathname === item.path
                      ? 'text-black bg-white shadow-xl scale-105'
                      : 'text-vault-muted hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="h-4 w-[1px] bg-white/10"></div>
            <ConnectWallet />
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-vault-muted hover:text-white"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-vault-border bg-vault-bg/95 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
           <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    location.pathname === item.path
                      ? 'text-vault-purple bg-vault-purple/10'
                      : 'text-vault-muted bg-vault-bg2'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-vault-border">
                 <ConnectWallet />
              </div>
           </div>
        </div>
      )}
    </nav>
  )
}
