/**
 * Estimates timestamp from block number (assuming 6s block time for Polkadot Hub)
 */
export function estimateDateTime(targetBlock: bigint, currentBlock: bigint): Date {
  const diff = Number(targetBlock - currentBlock)
  const seconds = diff * 6
  return new Date(Date.now() + seconds * 1000)
}

/**
 * Formats seconds into HH:MM:SS
 */
export function formatCountdown(seconds: number): string {
  if (seconds <= 0) return '00:00:00'
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
