import React, { useState, useEffect } from 'react'
import { formatCountdown } from '../../utils/time'

interface TimelockCountdownProps {
  timestamp: bigint
}

export const TimelockCountdown: React.FC<TimelockCountdownProps> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  
  useEffect(() => {
    const target = Number(timestamp)
    const update = () => {
      const now = Math.floor(Date.now() / 1000)
      setTimeLeft(Math.max(0, target - now))
    }
    
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [timestamp])

  const isReady = timeLeft === 0

  return (
    <div className={`p-4 rounded-xl border flex items-center justify-between ${isReady ? 'bg-vault-teal/10 border-vault-teal/30' : 'bg-vault-amber/10 border-vault-amber/30'}`}>
      <div>
         <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">Timelock Status</p>
         <p className={`text-xl font-mono font-bold ${isReady ? 'text-vault-teal' : 'text-vault-amber'}`}>
            {isReady ? 'READY TO EXECUTE' : formatCountdown(timeLeft)}
         </p>
      </div>
      
      {!isReady && (
        <div className="w-10 h-10 rounded-full border-2 border-vault-amber/30 border-t-vault-amber animate-spin"></div>
      )}
      
      {isReady && (
        <svg className="h-8 w-8 text-vault-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  )
}
