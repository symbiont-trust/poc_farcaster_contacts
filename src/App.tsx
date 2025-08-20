import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material'
import WalletConnect from './components/WalletConnect'
import FollowingList from './components/FollowingList'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c3aed',
    },
    secondary: {
      main: '#f59e0b',
    },
  },
})

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Farcaster Contacts
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Farcaster Following
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect your wallet to view your Farcaster following list
          </Typography>
        </Box>
        
        <WalletConnect 
          onWalletConnected={setWalletAddress}
          walletAddress={walletAddress}
        />
        
        {walletAddress && (
          <FollowingList walletAddress={walletAddress} />
        )}
      </Container>
    </ThemeProvider>
  )
}

export default App
