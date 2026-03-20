import { useState, useEffect, useRef } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { formatAddress } from '../../utils/format'

export const ConnectWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use the first available connector (Injected)
  const connector = connectors[0]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDisconnect = () => {
    disconnect()
    setShowDropdown(false)
    navigate('/')
  }

  if (isConnected && address) {
    return (
      <div className="relative w-full sm:w-auto" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full sm:w-auto glass border border-white/10 hover:border-vault-indigo/50 text-white rounded-2xl px-6 py-2.5 text-[11px] font-mono font-black tracking-widest transition-all hover:shadow-[0_0_20px_rgba(129,140,248,0.3)] active:scale-95 group uppercase flex items-center justify-between gap-3"
        >
          <span className="opacity-60 group-hover:opacity-100 transition-opacity">{formatAddress(address)}</span>
          <svg 
            className={`w-3 h-3 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div className="absolute top-full right-0 mt-3 w-full sm:w-64 glass-card border border-white/10 p-3 rounded-[24px] shadow-3xl z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-3 mb-2">
              <div className="text-[8px] font-black text-vault-faint uppercase tracking-[0.2em] mb-1">Network</div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-vault-cyan">
                <span className="w-1.5 h-1.5 rounded-full bg-vault-cyan animate-pulse"></span>
                {chain?.name || 'Unsupported'}
              </div>
            </div>
            
            <button
              onClick={handleDisconnect}
              className="w-full p-4 rounded-xl bg-vault-rose/10 hover:bg-vault-rose/20 text-vault-rose text-[9px] font-black uppercase tracking-[0.25em] transition-all border border-vault-rose/20 flex items-center justify-center gap-2 group"
            >
              <svg className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector })}
      disabled={!connector}
      className="w-full sm:w-auto bg-white text-black hover:bg-vault-indigo hover:text-white rounded-2xl px-10 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(129,140,248,0.4)] active:scale-95 disabled:opacity-50 relative overflow-hidden group"
    >
      <span className="relative z-10">Connect Wallet</span>
      <div className="absolute inset-0 bg-gradient-to-r from-vault-indigo to-vault-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </button>
  )
}
