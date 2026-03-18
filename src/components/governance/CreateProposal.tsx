import React, { useState } from 'react'
import { useVault } from '../../hooks/useVault'
import { useGovernance } from '../../hooks/useGovernance'
import { getAddresses } from '../../constants/addresses'
import { polkadotHubTestnet } from '../../constants/chains'
import { encodeFunctionData } from 'viem'
import { GovernedVaultABI } from '../../abis/GovernedVault.abi'
import { AIAnalysis } from './AIAnalysis'

interface CreateProposalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateProposal: React.FC<CreateProposalProps> = ({ isOpen, onClose }) => {
  const { activeStrategy } = useVault()
  const { write } = useGovernance()
  const addresses = getAddresses(polkadotHubTestnet.id)

  const ALL_STRATEGIES = [
    { name: 'Mock Strategy A', apy: '5.2% APY', address: addresses.MOCK_STRATEGY_A },
    { name: 'Mock Strategy B', apy: '8.1% APY', address: addresses.MOCK_STRATEGY_B },
  ]

  const STRATEGIES = ALL_STRATEGIES.filter(s => s.address?.toLowerCase() !== activeStrategy?.toLowerCase())

  const [strategyIndex, setStrategyIndex] = useState(0)
  const [description, setDescription] = useState('')

  // Safety: Reset strategyIndex if STRATEGIES changes and it's out of bounds
  React.useEffect(() => {
    if (strategyIndex >= STRATEGIES.length && STRATEGIES.length > 0) {
      setStrategyIndex(0)
    }
  }, [STRATEGIES.length, strategyIndex])

  if (!isOpen) return null

  const handlePropose = async () => {
    if (STRATEGIES.length === 0 || !STRATEGIES[strategyIndex]) return
    
    const targetStrategy = STRATEGIES[strategyIndex].address
    const calldata = encodeFunctionData({
      abi: GovernedVaultABI,
      functionName: 'setStrategy',
      args: [targetStrategy as `0x${string}`],
    })

    const fullDescription = `${STRATEGIES[strategyIndex].name} Rotation\n\n${description}`

    write.propose(
      [addresses.GOVERNED_VAULT as `0x${string}`],
      [0n],
      [calldata],
      fullDescription
    )
  }

  // Close on success
  React.useEffect(() => {
    if (write.isSuccess) {
      const timer = setTimeout(onClose, 2000)
      return () => clearTimeout(timer)
    }
  }, [write.isSuccess, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-vault-bg/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full md:h-auto md:max-w-xl bg-vault-bg2 border-x md:border border-vault-border md:rounded-3xl shadow-2xl overflow-y-auto flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-vault-border sticky top-0 bg-vault-bg2 z-10">
          <h2 className="text-xl font-bold font-syne text-vault-text">Propose Strategy Change</h2>
          <button onClick={onClose} className="p-2 hover:bg-vault-bg3 rounded-full transition-colors text-vault-muted hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-8 flex-grow">
          {STRATEGIES.length === 0 ? (
             <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-vault-bg3 border border-vault-border rounded-full flex items-center justify-center mx-auto">
                   <svg className="w-6 h-6 text-vault-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className="text-vault-muted italic text-sm">No alternative strategies available for rotation.</p>
             </div>
          ) : (
            <>
              {/* Strategy Selection */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-vault-muted">Target Strategy</label>
                
                {/* Mobile Native Select */}
                <div className="md:hidden">
                  <select 
                    value={strategyIndex}
                    onChange={(e) => setStrategyIndex(Number(e.target.value))}
                    className="w-full bg-vault-bg border border-vault-border p-4 rounded-xl text-vault-text font-bold appearance-none outline-none focus:border-vault-purple transition-colors"
                  >
                    {STRATEGIES.map((s, i) => (
                      <option key={s.address} value={i}>{s.name} ({s.apy})</option>
                    ))}
                  </select>
                </div>

                {/* Desktop Custom Selection */}
                <div className="hidden md:grid grid-cols-1 gap-3">
                  {STRATEGIES.map((s, i) => (
                    <button
                      key={s.address}
                      onClick={() => setStrategyIndex(i)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        strategyIndex === i 
                          ? 'border-vault-purple bg-vault-purple/5 ring-1 ring-vault-purple' 
                          : 'border-vault-border hover:border-vault-muted'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-vault-text">{s.name}</span>
                        <span className="text-vault-teal font-mono text-sm">{s.apy}</span>
                      </div>
                      <p className="text-xs text-vault-muted mt-1 font-mono truncate">{s.address}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              {STRATEGIES[strategyIndex] && (
                <AIAnalysis 
                  strategyName={STRATEGIES[strategyIndex].name} 
                  apy={STRATEGIES[strategyIndex].apy} 
                />
              )}

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-vault-muted">Rationale</label>
                <textarea
                  className="w-full h-32 bg-vault-bg border border-vault-border rounded-xl p-4 focus:ring-2 focus:ring-vault-purple outline-none transition-all resize-none text-vault-text placeholder:text-vault-muted"
                  placeholder="Explain why this strategy change is necessary..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div className="p-6 border-t border-vault-border sticky bottom-0 bg-vault-bg2">
          <button
            onClick={handlePropose}
            disabled={write.isPending || !description || STRATEGIES.length === 0}
            className="w-full py-4 bg-vault-teal text-vault-bg font-bold rounded-xl hover:bg-vault-teal/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {write.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-vault-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Confirming...
              </span>
            ) : write.isSuccess ? (
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Proposal Created!
              </span>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Submit Proposal
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
