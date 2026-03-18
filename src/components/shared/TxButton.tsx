import React from 'react'

interface TxButtonProps {
  onClick: () => void
  isPending: boolean
  isSuccess: boolean
  error: any
  label: string
  pendingLabel?: string
  successLabel?: string
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
}

export const TxButton: React.FC<TxButtonProps> = ({
  onClick,
  isPending,
  isSuccess,
  error,
  label,
  pendingLabel = 'Processing...',
  successLabel = 'Success!',
  disabled = false,
  className = '',
  variant = 'primary',
}) => {
  const baseStyles = 'px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center min-w-[120px]'
  const variants = {
    primary: 'bg-vault-purple text-white hover:bg-vault-purple/80 disabled:bg-vault-muted/50',
    secondary: 'bg-vault-teal text-vault-bg hover:bg-vault-teal/80 disabled:bg-vault-muted/50',
    danger: 'bg-vault-red text-white hover:bg-vault-red/80 disabled:bg-vault-muted/50',
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <button
        onClick={onClick}
        disabled={disabled || isPending}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {pendingLabel}
          </>
        ) : isSuccess ? (
          <>
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successLabel}
          </>
        ) : (
          label
        )}
      </button>

      {error && (
        <p className="text-vault-red text-xs mt-1">
          {error.shortMessage || error.message || 'Transaction failed'}
        </p>
      )}
    </div>
  )
}
