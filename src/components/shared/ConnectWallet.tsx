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
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {chain && (
          <span className="hidden lg:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-vault-purple/20 text-vault-purple border border-vault-purple/30">
            {chain.name}
          </span>
        )}
        <button
          onClick={() => disconnect()}
          className="w-full sm:w-auto bg-vault-bg3 border border-vault-border hover:border-vault-purple text-vault-text rounded-lg px-4 py-2.5 text-sm font-mono font-bold transition-all shadow-lg"
        >
          {formatAddress(address)}
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector })}
      disabled={!connector}
      className="w-full sm:w-auto bg-vault-purple text-white hover:bg-vault-purple/80 rounded-xl px-10 py-3 font-extrabold transition-all shadow-lg shadow-vault-purple/20 active:scale-95 disabled:opacity-50"
    >
      Connect Wallet
    </button>
  )
}
