# MetaMask Integration Guide

## Overview

Monad QuickPlay now features seamless MetaMask integration for wallet connection. Users can connect their existing MetaMask wallet with one click, or be guided to install MetaMask if they don't have it.

## Features

### ✅ Automatic Detection
- Detects if MetaMask is installed in the browser
- Shows appropriate UI based on detection result

### ✅ One-Click Connection
- No manual address entry required
- Direct connection through MetaMask popup
- Automatic approval flow

### ✅ Account Management
- Detects when users switch accounts in MetaMask
- Automatically updates the connected account
- Preserves balance for each account

### ✅ Error Handling
- User rejection handling
- Pending request detection
- Clear error messages
- Helpful troubleshooting tips

### ✅ Installation Guide
- Direct link to MetaMask download page
- Educational content about MetaMask
- Step-by-step installation guidance

## User Flow

### For Users WITH MetaMask

1. Click "Connect" button in navbar
2. Dialog shows "MetaMask Detected" message
3. Click "Connect MetaMask" button
4. MetaMask popup appears
5. User approves connection
6. Wallet connected with 2 MON starting balance

### For Users WITHOUT MetaMask

1. Click "Connect" button in navbar
2. Dialog shows "MetaMask Not Found" message
3. Click "Install MetaMask" button
4. Opens MetaMask download page in new tab
5. User installs MetaMask extension
6. User creates wallet in MetaMask
7. User returns to app and clicks "Connect"
8. Follows normal connection flow

## Technical Implementation

### Window.ethereum API

The integration uses the standard `window.ethereum` API provided by MetaMask:

```typescript
// Check if MetaMask is installed
if (typeof window.ethereum !== 'undefined') {
  // MetaMask is available
}

// Request account access
const accounts = await window.ethereum.request({ 
  method: 'eth_requestAccounts' 
});

// Listen for account changes
window.ethereum.on('accountsChanged', (accounts) => {
  // Handle account change
});
```

### Error Codes

- **4001**: User rejected the connection request
- **-32002**: Connection request already pending in MetaMask

### State Management

- Connected wallet address stored in React Context
- Balance persisted per wallet address in localStorage
- Automatic balance loading when switching accounts
- Game history and stats tracked per address

## Security Considerations

### ✅ No Private Keys
- App never requests or stores private keys
- All signing happens in MetaMask

### ✅ User Control
- Users must explicitly approve connection
- Users can disconnect at any time
- Users control which account to connect

### ✅ Data Privacy
- Only public wallet address is accessed
- No personal information required
- All data stored locally in browser

## Testing

### Test Scenarios

1. **Fresh Install**
   - Install MetaMask
   - Create new wallet
   - Connect to app
   - Verify 2 MON balance

2. **Existing Wallet**
   - Connect with existing MetaMask wallet
   - Play games
   - Check balance updates

3. **Account Switching**
   - Connect with Account 1
   - Play games and earn balance
   - Switch to Account 2 in MetaMask
   - Verify Account 2 gets fresh 2 MON
   - Switch back to Account 1
   - Verify Account 1 balance is preserved

4. **Rejection Handling**
   - Click Connect
   - Reject in MetaMask popup
   - Verify error message shown
   - Try connecting again

5. **No MetaMask**
   - Test in browser without MetaMask
   - Verify install prompt shown
   - Click install link
   - Verify opens MetaMask website

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium (with MetaMask extension)
- ✅ Firefox (with MetaMask extension)
- ✅ Brave (built-in wallet or MetaMask)
- ✅ Edge (with MetaMask extension)

### Mobile Support
- ✅ MetaMask Mobile Browser (iOS/Android)
- ✅ Trust Wallet Browser
- ✅ Other Web3 browsers with ethereum provider

## Troubleshooting

### Common Issues

**Issue**: "MetaMask Not Detected" but I have it installed
- **Solution**: Refresh the page, MetaMask might not have loaded yet
- **Solution**: Check if MetaMask is enabled in browser extensions

**Issue**: "Connection request already pending"
- **Solution**: Open MetaMask and check for pending requests
- **Solution**: Approve or reject the pending request

**Issue**: Balance not updating after switching accounts
- **Solution**: Refresh the page
- **Solution**: Disconnect and reconnect wallet

**Issue**: Can't connect on mobile
- **Solution**: Use MetaMask mobile app's built-in browser
- **Solution**: Open app through WalletConnect (future feature)

## Future Enhancements

- [ ] WalletConnect integration for mobile
- [ ] Support for other wallets (Coinbase, Rainbow, etc.)
- [ ] Network switching (Mainnet, Testnet)
- [ ] Transaction signing for on-chain games
- [ ] ENS name resolution
- [ ] Multi-wallet support

## Resources

- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethereum Provider API](https://docs.metamask.io/guide/ethereum-provider.html)
- [MetaMask Download](https://metamask.io/download/)

---

**Last Updated**: 2026-02-28
**Version**: 2.0.0 (MetaMask Integration)
