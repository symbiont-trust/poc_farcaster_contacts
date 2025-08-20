# Farcaster Contacts POC

A React TypeScript application that connects to a user's wallet and retrieves their Farcaster following list with detailed information.

## Features

- **Wallet Connection**: Connect via MetaMask to access your Farcaster data
- **Following List**: View accounts you follow on Farcaster with rich profile information
- **User Details**: Display profile pictures, usernames, display names, bios, follower counts, and wallet addresses
- **Modern UI**: Clean, responsive interface built with Material-UI
- **Dark Theme**: Easy-to-use dark theme interface

## Prerequisites

Before running this application, make sure you have:

- **Node.js**: Version 22.x or higher (use `nvm use v22.18.0` if you have nvm)
- **MetaMask**: Browser extension installed and configured
- **Farcaster Account**: Connected to your wallet address

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd poc_farcaster_contacts
```

2. Switch to the correct Node.js version (if using nvm):
```bash
nvm use v22.18.0
```

3. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5174` (or the port shown in terminal)

3. **Connect your wallet**:
   - Click "Connect MetaMask" button
   - Approve the connection in your MetaMask extension
   - Your wallet address will be displayed once connected

4. **View your Farcaster following**:
   - Click "Retrieve Following List" in the consent dialog
   - The app will display your Farcaster following list with:
     - Profile pictures and display names
     - Usernames and Farcaster IDs (FIDs)
     - Bio descriptions
     - Follower counts
     - Associated wallet addresses

## Build

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) with dark theme
- **Wallet Integration**: Reown AppKit (supports MetaMask, WalletConnect, and more)
- **Farcaster API**: Neynar SDK with automatic mock data fallback

## Current Status

This is a **Proof of Concept (POC)** implementation with both real API integration and mock data fallback. The application demonstrates:

- ✅ Wallet connection via Reown AppKit (supports multiple wallets)
- ✅ Real Farcaster API integration via Neynar SDK
- ✅ Automatic fallback to mock data when API not configured
- ✅ User interface for displaying Farcaster following
- ✅ Responsive design with user cards
- ✅ TypeScript type safety
- ✅ Error handling and loading states

## Configuration for Real Data

To use real Farcaster data instead of mock data:

1. **Get Neynar API Key**: Sign up at [https://dev.neynar.com](https://dev.neynar.com) for a free API key
2. **Get Reown Project ID**: Create a project at [https://cloud.reown.com](https://cloud.reown.com) 
3. **Create Environment File**: Copy `.env.example` to `.env` and add your keys:
```bash
cp .env.example .env
# Edit .env and add your actual API keys
```

## Next Steps

1. **Enhanced Error Handling**: More comprehensive error handling for edge cases
2. **Pagination**: Add pagination for large following lists (>150 users)
3. **Search/Filter**: Add search and filtering capabilities
4. **Additional Data**: Include more Farcaster profile information (like badges, channels)
5. **Caching**: Add caching to reduce API calls
6. **Performance**: Optimize for large following lists with virtualization

## Development

- **Lint**: `npm run lint`
- **Type Check**: `npm run build` (includes TypeScript compilation)
- **Preview**: `npm run preview` (preview production build)

## Browser Support

- Chrome (recommended with MetaMask)
- Firefox (with MetaMask)
- Safari (with compatible wallet)
- Edge (with MetaMask)

## Troubleshooting

**MetaMask not detected**: Make sure MetaMask extension is installed and enabled in your browser.

**Connection issues**: Refresh the page and try connecting again. Ensure MetaMask is unlocked.

**Build errors**: Make sure you're using Node.js v22.x (`nvm use v22.18.0`).

## License

MIT License
