import { NeynarAPIClient, Configuration } from '@neynar/nodejs-sdk'

export interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  bio: string
  followerCount: number
  followingCount: number
  pfpUrl: string
  walletAddress?: string
}

export class FarcasterService {
  private client: NeynarAPIClient | null = null
  private apiKey: string | null = null

  constructor() {
    this.apiKey = import.meta.env.VITE_NEYNAR_API_KEY
    
    if (this.apiKey && this.apiKey !== 'your_neynar_api_key_here') {
      try {
        const config = new Configuration({ apiKey: this.apiKey })
        this.client = new NeynarAPIClient(config)
      } catch (error) {
        console.warn('Failed to initialize Neynar client:', error)
      }
    }
  }

  isConfigured(): boolean {
    return this.client !== null
  }

  async getUserByWalletAddress(walletAddress: string): Promise<any> {
    if (!this.client) {
      throw new Error('Neynar API not configured. Please add VITE_NEYNAR_API_KEY to your environment.')
    }

    try {
      const result = await this.client.fetchBulkUsersByEthOrSolAddress({
        addresses: [walletAddress]
      })
      
      const users = (result as any).result?.[walletAddress]
      return users && users.length > 0 ? users[0] : null
    } catch (error) {
      console.error('Error fetching user by wallet:', error)
      throw new Error(`Failed to find Farcaster user for wallet ${walletAddress}`)
    }
  }

  async getAllFollowing(fid: number): Promise<FarcasterUser[]> {
    if (!this.client) {
      throw new Error('Neynar API not configured. Please add VITE_NEYNAR_API_KEY to your environment.')
    }

    let cursor: string | null = ""
    let allUsers: any[] = []
    
    try {
      do {
        const result = await this.client.fetchUserFollowing({
          fid,
          limit: 150,
          cursor: cursor || undefined,
        })
        
        const apiResult = result as any
        if (apiResult.result?.users) {
          allUsers = allUsers.concat(apiResult.result.users)
        }
        
        cursor = apiResult.result?.next?.cursor || null
        
      } while (cursor)
      
      return allUsers.map(user => ({
        fid: user.fid,
        username: user.username || '',
        displayName: user.displayName || user.username || 'Unknown',
        bio: user.profile?.bio?.text || '',
        followerCount: user.followerCount || 0,
        followingCount: user.followingCount || 0,
        pfpUrl: user.pfp?.url || '',
        walletAddress: user.verifications?.[0] || user.custodyAddress
      }))
      
    } catch (error) {
      console.error('Error fetching following list:', error)
      throw new Error('Failed to fetch following list')
    }
  }

  async getFollowingByWalletAddress(walletAddress: string): Promise<FarcasterUser[]> {
    const user = await this.getUserByWalletAddress(walletAddress)
    if (!user) {
      throw new Error('No Farcaster user found for this wallet address')
    }
    
    return await this.getAllFollowing(user.fid)
  }

  // Mock data fallback when API is not configured
  getMockFollowing(): FarcasterUser[] {
    return [
      {
        fid: 123,
        username: 'dan',
        displayName: 'Dan Romero',
        bio: 'Co-founder @farcaster. Previously @coinbase.',
        followerCount: 15420,
        followingCount: 892,
        pfpUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/99ee8c75-7640-4aed-b463-3d2ff4b00200/rectcrop3',
        walletAddress: '0x742d35Cc6634C0532925a3b8D09628ce67b0e54e'
      },
      {
        fid: 456,
        username: 'vitalik.eth',
        displayName: 'Vitalik Buterin',
        bio: 'Ethereum founder',
        followerCount: 89234,
        followingCount: 1205,
        pfpUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/b41fdc5e-f91a-4c1c-b8a2-8b3bb2f00a00/original',
        walletAddress: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      },
      {
        fid: 789,
        username: 'jessepollak',
        displayName: 'Jesse Pollak',
        bio: 'Building @base at @coinbase',
        followerCount: 12340,
        followingCount: 567,
        pfpUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/a1234b56-7890-1234-5678-901234567890/original',
        walletAddress: '0x742d35Cc6634C0532925a3b8D09628ce67b0e54e'
      }
    ]
  }
}

// Export singleton instance
export const farcasterService = new FarcasterService()