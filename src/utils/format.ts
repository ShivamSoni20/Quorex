import { formatUnits } from 'viem'

/**
 * Formats DOT amounts (10 decimals)
 */
export function formatDOT(value: bigint | undefined, decimals = 10): string {
  if (value === undefined) return '0.00'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(Number(formatUnits(value, decimals)))
}

/**
 * Formats APY percentage
 */
export function formatAPY(value: bigint | number | undefined): string {
  if (value === undefined) return '0%'
  const num = typeof value === 'bigint' ? Number(value) / 100 : value
  return `${num.toFixed(1)}%`
}

/**
 * Truncates an EVM address
 */
export function formatAddress(address: string): string {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy: ', err)
    return false
  }
}
