# Farcaster Contacts POC - Implementation Plan

## Overview
Create a React TypeScript application that connects to a user's wallet and retrieves their Farcaster following list with detailed information.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI Components**: Material-UI (MUI)
- **Wallet Connection**: Reown AppKit
- **Farcaster API**: Farcaster Hub API or Warpcast API
- **Node Version**: To be determined via nvm

## Implementation Steps

### 1. Project Setup
- Initialize Vite React TypeScript project
- Install core dependencies (React, TypeScript, Vite)
- Install MUI components and theming
- Install Reown AppKit for wallet connection
- Set up project structure

### 2. Wallet Integration
- Configure Reown AppKit
- Create wallet connection component
- Implement wallet address retrieval
- Add connection status management

### 3. Farcaster API Integration
- Research Farcaster API endpoints for following data
- Set up API client for Farcaster Hub or Warpcast
- Implement following list retrieval by wallet address
- Handle API authentication if required

### 4. User Interface
- Create main app layout with MUI AppBar
- Build wallet connection UI
- Design following list display component
- Implement user cards showing:
  - Profile picture
  - Username/display name
  - Farcaster ID (FID)
  - Wallet address
  - Bio/description
  - Follower count
  - Following status

### 5. Data Management
- Implement state management for wallet connection
- Add loading states and error handling
- Cache following data appropriately
- Handle pagination if needed

### 6. User Experience
- Add consent dialog before data retrieval
- Implement loading indicators
- Add error messaging
- Ensure responsive design

## Key Components to Build

1. **App.tsx** - Main application container
2. **WalletConnect** - Wallet connection component
3. **ConsentDialog** - Permission request dialog
4. **FollowingList** - Main list component
5. **UserCard** - Individual user display component
6. **LoadingSpinner** - Loading state component

## API Considerations
- Use Farcaster Hub API or Warpcast API
- May need to resolve wallet address to Farcaster ID first
- Handle rate limiting and API errors
- Consider using REST API vs GraphQL based on availability

## Development Workflow
1. Set up development environment
2. Implement wallet connection first
3. Build UI components with mock data
4. Integrate real Farcaster API
5. Test with MetaMask in Chrome
6. Polish UX and error handling

## Potential Challenges
- Mapping wallet addresses to Farcaster accounts
- API rate limits and authentication
- Handling large following lists (pagination)
- Cross-chain wallet address compatibility

## Success Criteria
- User can connect wallet via Reown AppKit
- App retrieves user's Farcaster following list
- Following data displays in clean MUI interface
- All user details (wallet, username, FID, etc.) visible
- Responsive design works on desktop and mobile

## Do not
- Do not commit code automatically to git
- Do not create any git branches without being asked
- Do not use graphQl unless it is the only option available

## Directory structure
- When creating the project for vite place contents on the root of this project. Do not create a sub folder for the application

## Git
- Create a .gitignore file

## README
- Create a README which explains how to build annd use the software.  For esxample mention that the user should install metamask.
