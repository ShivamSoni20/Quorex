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
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="glass rounded-[32px] px-8 py-4 shadow-2xl relative overflow-hidden group">
        {/* Animated Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-vault-indigo/5 via-transparent to-vault-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
              <div className="w-11 h-11 rounded-2xl bg-white text-black flex items-center justify-center font-black text-sm shadow-[0_0_25px_rgba(255,255,255,0.3)] rotate-3 hover:rotate-0 transition-transform">
                QX
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-syne uppercase">Quorex</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-8 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-black bg-white shadow-lg'
                      : 'text-vault-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="h-6 w-[1px] bg-white/10 hidden lg:block"></div>
            <ConnectWallet />
          </div>

          {/* Mobile hamburger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-vault-muted hover:text-white transition-colors"
          >
            {isOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 glass rounded-3xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-6 py-4 rounded-2xl text-lg font-black tracking-tight transition-all ${
                    location.pathname === item.path
                      ? 'text-white bg-vault-indigo/20 border border-vault-indigo/30'
                      : 'text-vault-muted bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-white/5">
                 <ConnectWallet />
              </div>
           </div>
        </div>
      )}
    </nav>
  )
}
