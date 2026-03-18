const requiredEnvVars = [
  'VITE_VAULT_TOKEN_ADDRESS',
  'VITE_VAULT_GOVERNOR_ADDRESS',
  'VITE_VAULT_TIMELOCK_ADDRESS',
  'VITE_GOVERNED_VAULT_ADDRESS',
  'VITE_ASSET_TOKEN_ADDRESS',
]

export function validateEnv() {
  const missing = requiredEnvVars.filter(key => !import.meta.env[key])
  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}. Using placeholders for now.`)
  }
}
