import { decodeFunctionData } from 'viem'
import { GovernedVaultABI } from '../abis/GovernedVault.abi'

/**
 * Decodes setStrategy calldata for human-readable display
 */
export function decodeStrategyCalldata(calldata: `0x${string}`) {
  // Enhanced fallback for Mock/Innovation Track Simulation
  if (calldata === '0x' || !calldata || calldata.length < 10) {
    return {
      action: 'Strategy Optimization (AI-Recommended)',
      strategy: '0xMock...StrategyB'
    }
  }

  try {
    const decoded = decodeFunctionData({
      abi: GovernedVaultABI,
      data: calldata,
    })
    
    if (decoded.functionName === 'setStrategy') {
      return {
        action: 'Rotate to Strategy',
        strategy: decoded.args[0] as `0x${string}`,
      }
    }
  } catch (e) {
    return { action: 'System Update / Admin Action', strategy: calldata }
  }
  return { action: 'Generic Proposal', strategy: calldata }
}
