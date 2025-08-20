import { useEffect } from 'react'
import { Button, Card, CardContent, Typography, Box } from '@mui/material'
import { AccountBalanceWallet } from '@mui/icons-material'
import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'

interface WalletConnectProps {
  onWalletConnected: (address: string | null) => void
  walletAddress: string | null
}

const WalletConnect = ({ onWalletConnected }: WalletConnectProps) => {
  const { open } = useAppKit()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnect = () => {
    open()
  }

  const handleDisconnect = () => {
    disconnect()
    onWalletConnected(null)
  }

  useEffect(() => {
    if (isConnected && address) {
      onWalletConnected(address)
    } else if (!isConnected) {
      onWalletConnected(null)
    }
  }, [isConnected, address, onWalletConnected])

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ textAlign: 'center' }}>
          {!isConnected ? (
            <>
              <AccountBalanceWallet sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Connect Your Wallet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Connect your wallet to view your Farcaster following list
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleConnect}
                startIcon={<AccountBalanceWallet />}
              >
                Connect Wallet
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" gutterBottom color="success.main">
                Wallet Connected
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default WalletConnect