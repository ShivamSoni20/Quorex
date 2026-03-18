import React from 'react'

interface ErrorBannerProps {
  message: string
  onClose?: () => void
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="bg-vault-red/10 border border-vault-red/30 text-vault-red px-4 py-3 rounded-xl relative flex items-center justify-between mb-4">
      <div className="flex items-center">
        <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">{message}</span>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-vault-red hover:text-vault-red/70">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
