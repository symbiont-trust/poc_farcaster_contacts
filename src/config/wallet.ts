import { createAppKit } from '@reown/appkit/react'
import { arbitrum, mainnet, polygon } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// Get projectId from environment variable or use a default for development
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

// Create wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  projectId,
  networks: [mainnet, arbitrum, polygon]
})

// Create modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, polygon],
  defaultNetwork: mainnet,
  metadata: {
    name: 'Farcaster Contacts',
    description: 'View your Farcaster following list',
    url: 'https://farcaster-contacts.example.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
    emailShowWallets: false
  }
})

export const queryClient = new QueryClient()

export { wagmiAdapter }