import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { formatAddress } from '../../utils/format'

export const ConnectWallet = () => {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // Use the first available connector (Injected)
  const connector = connectors[0]

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {chain && (
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-vault-indigo/10 text-vault-indigo border border-vault-indigo/20">
            <span className="w-1.5 h-1.5 rounded-full bg-vault-indigo animate-pulse"></span>
            {chain.name}
          </div>
        )}
        <button
          onClick={() => disconnect()}
          className="w-full sm:w-auto glass border border-white/10 hover:border-vault-indigo/50 text-white rounded-2xl px-6 py-2.5 text-[11px] font-mono font-black tracking-widest transition-all hover:shadow-[0_0_20px_rgba(129,140,248,0.3)] active:scale-95 group uppercase"
        >
          <span className="opacity-60 group-hover:opacity-100 transition-opacity">{formatAddress(address)}</span>
        </button>
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
