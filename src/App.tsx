import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from './wagmi.config'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Governance from './pages/Governance'
import ProposalDetail from './pages/ProposalDetail'
import { validateEnv } from './constants/env'
import { useEffect } from 'react'

import { useAccount } from 'wagmi'
import { Navigate } from 'react-router-dom'

const queryClient = new QueryClient()

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, isConnecting } = useAccount()
  
  if (isConnecting) return null
  if (!isConnected) return <Navigate to="/" replace />
  
  return <>{children}</>
}

function App() {
  useEffect(() => {
    validateEnv()
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-vault-bg text-vault-text flex flex-col font-sans selection:bg-vault-purple/30">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/app/*" element={
                <ProtectedRoute>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/governance" element={<Governance />} />
                      <Route path="/governance/:proposalId" element={<ProposalDetail />} />
                    </Routes>
                  </main>
                  <Footer />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
