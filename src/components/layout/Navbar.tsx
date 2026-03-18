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
    <nav className="border-b border-vault-border bg-vault-bg/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-vault-purple flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(124,110,230,0.4)]">
                GV
              </div>
              <span className="text-xl font-bold tracking-tight text-vault-text">GovernedVault</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-vault-purple bg-vault-purple/10'
                      : 'text-vault-muted hover:text-vault-text hover:bg-vault-bg3'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
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
