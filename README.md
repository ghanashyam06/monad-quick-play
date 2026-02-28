# Monad QuickPlay 🎮⚡

A decentralized gaming platform built on Monad Testnet that enables users to play provably fair blockchain games with instant payouts. Experience the future of on-chain gaming with smart wallet integration and real-time leaderboards.

![Monad QuickPlay](https://img.shields.io/badge/Monad-Testnet-blue) ![React](https://img.shields.io/badge/React-18.3-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

## 📌 Repository

GitHub: https://github.com/ghanashyam06/monad_madness.git

---

## � Overview

Monad QuickPlay is a next-generation blockchain gaming platform that removes the complexity of traditional crypto gaming. Users can connect their wallet, play multiple provably fair games, and compete on real-time leaderboards—all powered by Pyth VRF (Verifiable Random Function) and Oracle technology on the Monad Testnet.

### Key Features

- 🎲 **Three Exciting Games**: Coin Flip, Price Prediction, and Dice Roll
- 💰 **Real-Time Balance Tracking**: Dynamic wallet balance updates after each game
- 🏆 **Live Leaderboards**: Track top players and recent activity in real-time
- 👤 **User Profiles**: Comprehensive analytics, game history, and editable user info
- 🔐 **Smart Wallet Integration**: Simple wallet connection with persistent user data
- 📊 **Advanced Analytics**: Win rates, profit/loss tracking, and game statistics
- 🎨 **Modern UI/UX**: Beautiful glassmorphic design with smooth animations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices

---

## 🎯 Problem Statement

Traditional blockchain gaming platforms face several critical challenges:

### 1. **High Barrier to Entry**
- Users need to install browser extensions (MetaMask, etc.)
- Complex wallet setup and seed phrase management
- Requires understanding of gas fees and blockchain transactions

### 2. **Poor User Experience**
- Slow transaction confirmations
- Confusing interfaces with technical jargon
- No clear feedback on game outcomes

### 3. **Lack of Transparency**
- Unclear game fairness mechanisms
- No verifiable randomness
- Limited access to historical data and statistics

### 4. **Limited Engagement**
- No social features or competitive elements
- Missing player profiles and achievement tracking
- Poor retention due to complexity

---

## � Solution

Monad QuickPlay addresses these challenges with an innovative approach:

### 1. **Simplified Onboarding**
- **MetaMask Integration**: Direct wallet connection with one click
- **Auto-detection**: Automatically detects if MetaMask is installed
- **Smart wallet creation**: Prompts users to install MetaMask if not found
- **2 MON starting balance**: Instant play without purchasing crypto
- **Account switching**: Automatically detects when users switch accounts

### 2. **Provably Fair Gaming**
- **Pyth VRF Integration**: Verifiable random number generation
- **Pyth Oracle**: Real-time price feeds for prediction games
- **On-chain verification**: All game results recorded on blockchain

### 3. **Enhanced User Experience**
- **Instant feedback**: Real-time balance updates and notifications
- **Beautiful UI**: Modern glassmorphic design with smooth animations
- **Comprehensive profiles**: Detailed analytics and game history
- **Mobile-first**: Fully responsive across all devices

### 4. **Social & Competitive Features**
- **Live leaderboards**: Real-time rankings by volume wagered
- **Recent activity feed**: See what other players are doing
- **Personal analytics**: Track your performance over time
- **Win/loss statistics**: Detailed breakdown by game type

---

## 🎮 Games Available

### 1. Coin Flip (VRF-Powered)
- Choose heads or tails
- 2x payout on win
- Provably fair using Pyth VRF

### 2. Price Prediction
- Predict ETH/USD price movement
- 2-minute prediction window
- Real-time price feeds from Pyth Oracle
- 2x payout on correct prediction

### 3. Dice Roll
- Pick a number from 1-6
- 5x payout on exact match
- VRF-powered randomness

---

## 🛠 Tech Stack

### Frontend
- ⚡ **Vite** - Lightning-fast build tool
- ⚛ **React 18.3** - UI library with hooks
- 📘 **TypeScript 5.5** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first styling
- 🧩 **shadcn/ui** - Beautiful component library

### Blockchain
- 🔗 **Monad Testnet** - High-performance blockchain
- 🎲 **Pyth VRF** - Verifiable random functions
- 📊 **Pyth Oracle** - Real-time price feeds

### State Management
- 🔄 **React Context API** - Global state management
- 💾 **LocalStorage** - Persistent data storage
- 🔔 **Sonner** - Toast notifications

### Routing & Data
- 🛣 **React Router** - Client-side routing
- 🔍 **TanStack Query** - Data fetching and caching

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js

Check your versions:

```bash
node -v  # Should be v18+
npm -v   # Should be v9+
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ghanashyam06/monad_madness.git
cd monad_madness
```

### 2️⃣ Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- React Router
- TanStack Query
- Lucide React (icons)
- And more...

### 3️⃣ Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:8080` (or the next available port).

You should see output like:
```
VITE v5.4.19  ready in 274 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.x.x:8080/
```

### 4️⃣ Open in Browser

Navigate to `http://localhost:8080` and start playing!

---

## 📦 Build for Production

### Build the Application

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

### Deploy

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

---

## 🎯 How to Use

### 1. Connect Your Wallet

- Click the **"Connect"** button in the navbar
- If you have MetaMask installed:
  - Click "Connect MetaMask"
  - Approve the connection in MetaMask popup
  - You'll receive **2 MON** starting balance
- If you don't have MetaMask:
  - Click "Install MetaMask"
  - Follow the installation guide
  - Create your wallet
  - Return and click "Connect"

### 2. Play Games

Choose from three games:

**Coin Flip:**
1. Select Heads or Tails
2. Choose bet amount (0.01, 0.05, 0.1, or 0.5 MON)
3. Click "Flip" and wait for result
4. Win 2x your bet on correct guess

**Price Prediction:**
1. Predict if ETH price will go UP or DOWN
2. Choose bet amount
3. Wait 2 minutes for settlement
4. Win 2x your bet on correct prediction

**Dice Roll:**
1. Pick a number from 1-6
2. Choose bet amount
3. Click "Roll" and wait for result
4. Win 5x your bet on exact match

### 3. View Your Profile

- Click **"Profile"** in the navbar
- Edit your username and password
- View detailed analytics:
  - Win rate percentage
  - Total games played
  - Total wagered amount
  - Net profit/loss
  - Games by type breakdown
  - Recent game history

### 4. Check Leaderboards

- Scroll to the **Leaderboard** section
- See top 10 players ranked by volume
- View recent activity from all players
- Your rank is highlighted when connected

---

## 📁 Project Structure

```
monad_madness/
├── public/
│   ├── favicon.ico          # App favicon
│   └── placeholder.svg      # Placeholder images
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── CoinFlip.tsx     # Coin flip game
│   │   ├── DiceRoll.tsx     # Dice roll game
│   │   ├── PricePrediction.tsx  # Price prediction game
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── HeroSection.tsx  # Landing hero
│   │   ├── Leaderboard.tsx  # Live leaderboard
│   │   ├── HowItWorks.tsx   # Info section
│   │   └── WalletDialog.tsx # Wallet connection modal
│   ├── contexts/
│   │   └── WalletContext.tsx    # Global wallet state
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── Profile.tsx      # User profile page
│   │   └── NotFound.tsx     # 404 page
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind config
├── vite.config.ts           # Vite config
└── README.md                # This file
```

---

## 🎨 Features in Detail

### Wallet Context
- Manages user authentication and balance
- Tracks game history and player statistics
- Persists data in localStorage
- Provides global state to all components

### Real-Time Updates
- Balance updates instantly after each game
- Leaderboard refreshes automatically
- Recent activity feed shows latest games
- Toast notifications for wins/losses

### Analytics Dashboard
- Win rate calculation
- Total games and volume tracking
- Net profit/loss from starting balance
- Game type distribution with visual charts
- Complete game history with timestamps

### Responsive Design
- Mobile-first approach
- Glassmorphic UI elements
- Smooth animations and transitions
- Accessible color schemes
- Touch-friendly controls

---

## 🔮 Future Enhancements

- [ ] Email-based authentication
- [ ] Smart contract integration
- [ ] Real wallet connection (MetaMask, WalletConnect)
- [ ] More game types (Roulette, Blackjack, Slots)
- [ ] Multiplayer games
- [ ] NFT rewards and achievements
- [ ] Social features (friends, chat)
- [ ] Tournament mode
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Write clean, documented code
- Follow existing code style
- Test your changes thoroughly

### 4. Commit Your Changes

```bash
git commit -m "Add amazing feature"
```

### 5. Push to Your Fork

```bash
git push origin feature/amazing-feature
```

### 6. Open a Pull Request

Go to the original repository and click "New Pull Request".

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👥 Team

Built with ❤️ by the Monad QuickPlay team

---

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Contact: [Your Email]
- Discord: [Your Discord]

---

## 🙏 Acknowledgments

- **Monad** - For the high-performance blockchain
- **Pyth Network** - For VRF and Oracle services
- **shadcn/ui** - For beautiful UI components
- **Vercel** - For hosting and deployment

---

**Happy Gaming! 🎮⚡**

