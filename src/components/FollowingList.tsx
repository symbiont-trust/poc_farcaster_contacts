import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { PersonAdd, Group, Settings } from '@mui/icons-material'
import { farcasterService, type FarcasterUser } from '../services/farcaster'

interface FollowingListProps {
  walletAddress: string
}

const FollowingList = ({ walletAddress }: FollowingListProps) => {
  const [following, setFollowing] = useState<FarcasterUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [consentDialog, setConsentDialog] = useState(true)

  const fetchFollowing = async () => {
    setLoading(true)
    setError(null)
    
    try {
      let followingData: FarcasterUser[]
      
      if (farcasterService.isConfigured()) {
        // Use real Neynar API
        followingData = await farcasterService.getFollowingByWalletAddress(walletAddress)
      } else {
        // Fallback to mock data if API not configured
        console.warn('Neynar API not configured, using mock data')
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
        followingData = farcasterService.getMockFollowing()
      }
      
      setFollowing(followingData)
    } catch (err: any) {
      console.error('Error fetching following:', err)
      setError(err.message || 'Failed to fetch following list')
    } finally {
      setLoading(false)
    }
  }

  const handleConsent = () => {
    setConsentDialog(false)
    fetchFollowing()
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  return (
    <>
      <Dialog open={consentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Group color="primary" />
            Retrieve Farcaster Following Data
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This will retrieve your Farcaster following list associated with your wallet address:
          </Typography>
          <Typography variant="body2" sx={{ 
            fontFamily: 'monospace', 
            bgcolor: 'grey.100', 
            p: 1, 
            borderRadius: 1,
            color: 'text.primary'
          }}>
            {walletAddress}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            We'll display information including usernames, display names, profile pictures, 
            follower counts, and wallet addresses for accounts you follow on Farcaster.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConsentDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConsent} startIcon={<PersonAdd />}>
            Retrieve Following List
          </Button>
        </DialogActions>
      </Dialog>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Your Farcaster Following
          </Typography>
          
          {!farcasterService.isConfigured() && (
            <Alert severity="info" sx={{ mb: 2 }} icon={<Settings />}>
              <Typography variant="body2">
                <strong>Demo Mode:</strong> Using mock data. Add <code>VITE_NEYNAR_API_KEY</code> to your <code>.env</code> file to fetch real Farcaster data.
                Get your API key from <a href="https://dev.neynar.com" target="_blank" rel="noopener">Neynar</a>.
              </Typography>
            </Alert>
          )}
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {!loading && !error && following.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No following found for this wallet address.
              </Typography>
            </Box>
          )}
          
          {!loading && following.length > 0 && (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Found {following.length} accounts you follow on Farcaster
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: 2 
              }}>
                {following.map((user) => (
                  <Card variant="outlined" sx={{ height: '100%' }} key={user.fid}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={user.pfpUrl} 
                          alt={user.displayName}
                          sx={{ width: 48, height: 48, mr: 2 }}
                        />
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant="h6" noWrap>
                            {user.displayName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            @{user.username}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {user.bio}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip 
                          label={`${formatNumber(user.followerCount)} followers`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Chip 
                          label={`FID: ${user.fid}`}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                      
                      {user.walletAddress && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Wallet:
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontFamily: 'monospace',
                            fontSize: '0.75rem'
                          }}>
                            {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default FollowingList