import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { GovernedVaultABI } from '../abis/GovernedVault.abi'
import { ERC20ABI } from '../abis/ERC20.abi'
import { getAddresses } from '../constants/addresses'
import { polkadotHubTestnet } from '../constants/chains'

export function useVault() {
  const { address } = useAccount()
  const chainId = polkadotHubTestnet.id
  const addresses = getAddresses(chainId)

  const vaultConfig = {
    address: addresses.GOVERNED_VAULT,
    abi: GovernedVaultABI,
  }

  // Reads
  const totalAssets = useReadContract({ ...vaultConfig, functionName: 'totalAssets' })
  const sharePrice = useReadContract({ ...vaultConfig, functionName: 'convertToAssets', args: [parseUnits('1', 18)] })
  const userShares = useReadContract({ ...vaultConfig, functionName: 'balanceOf', args: [address!] })
  const activeStrategy = useReadContract({ ...vaultConfig, functionName: 'strategy' })
  const isPaused = useReadContract({ ...vaultConfig, functionName: 'paused' })

  // Asset Token Balance & Allowance
  const assetBalance = useReadContract({
    address: addresses.ASSET_TOKEN,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address!],
    query: { enabled: !!address },
  })

  const assetAllowance = useReadContract({
    address: addresses.ASSET_TOKEN,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address!, addresses.GOVERNED_VAULT],
    query: { enabled: !!address },
  })

  // Writes
  const { writeContract: write, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({ hash })

  const deposit = (assets: bigint) => {
    write({
      ...vaultConfig,
      functionName: 'deposit',
      args: [assets, address!],
    })
  }

  const approve = (assets: bigint) => {
    write({
      address: addresses.ASSET_TOKEN,
      abi: ERC20ABI,
      functionName: 'approve',
      args: [addresses.GOVERNED_VAULT, assets],
    })
  }

  const redeem = (shares: bigint) => {
    write({
      ...vaultConfig,
      functionName: 'redeem',
      args: [shares, address!, address!],
    })
  }

  return {
    totalAssets: totalAssets.data,
    sharePrice: sharePrice.data,
    userShares: userShares.data,
    activeStrategy: activeStrategy.data,
    isPaused: isPaused.data,
    assetBalance: assetBalance.data,
    assetAllowance: assetAllowance.data,
    isLoading: totalAssets.isLoading || sharePrice.isLoading,
    write: {
      deposit,
      approve,
      redeem,
      isPending: isPending || isWaiting,
      isSuccess,
      hash,
      error,
    },
    refetch: () => {
      totalAssets.refetch()
      sharePrice.refetch()
      if (address) {
        userShares.refetch()
        assetBalance.refetch()
        assetAllowance.refetch()
      }
    }
  }
}
