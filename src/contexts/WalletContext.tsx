import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface GameResult {
  id: string;
  type: "Coin Flip" | "Price Prediction" | "Dice Roll";
  player: string;
  result: "Won" | "Lost";
  amount: number;
  timestamp: number;
}

export interface PlayerStats {
  address: string;
  wins: number;
  losses: number;
  volume: number;
}

export interface UserProfile {
  username: string;
  password: string;
}

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: number;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  updateBalance: (amount: number) => void;
  addGameResult: (type: GameResult["type"], won: boolean, amount: number) => void;
  gameHistory: GameResult[];
  playerStats: Map<string, PlayerStats>;
  userProfile: UserProfile | null;
  updateUserProfile: (username: string, password: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(2.0);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [playerStats, setPlayerStats] = useState<Map<string, PlayerStats>>(new Map());
  const [playerBalances, setPlayerBalances] = useState<Map<string, number>>(new Map());
  const [userProfiles, setUserProfiles] = useState<Map<string, UserProfile>>(new Map());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("gameHistory");
    const savedStats = localStorage.getItem("playerStats");
    const savedBalances = localStorage.getItem("playerBalances");
    const savedProfiles = localStorage.getItem("userProfiles");
    
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
    
    if (savedStats) {
      const statsArray = JSON.parse(savedStats);
      setPlayerStats(new Map(statsArray));
    }

    if (savedBalances) {
      const balancesArray = JSON.parse(savedBalances);
      setPlayerBalances(new Map(balancesArray));
    }

    if (savedProfiles) {
      const profilesArray = JSON.parse(savedProfiles);
      setUserProfiles(new Map(profilesArray));
    }
  }, []);

  // Listen for MetaMask account changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          disconnectWallet();
        } else if (accounts[0] !== walletAddress) {
          // User switched to a different account
          if (isConnected) {
            // Save current balance before switching
            if (walletAddress) {
              setPlayerBalances(new Map(playerBalances.set(walletAddress, balance)));
            }
            // Connect to new account
            connectWallet(accounts[0]);
          }
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [isConnected, walletAddress, balance, playerBalances]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    localStorage.setItem("playerStats", JSON.stringify(Array.from(playerStats.entries())));
  }, [playerStats]);

  useEffect(() => {
    localStorage.setItem("playerBalances", JSON.stringify(Array.from(playerBalances.entries())));
  }, [playerBalances]);

  useEffect(() => {
    localStorage.setItem("userProfiles", JSON.stringify(Array.from(userProfiles.entries())));
  }, [userProfiles]);

  const connectWallet = (address: string) => {
    setWalletAddress(address);
    setIsConnected(true);
    
    // Initialize player stats if not exists
    if (!playerStats.has(address)) {
      setPlayerStats(new Map(playerStats.set(address, {
        address,
        wins: 0,
        losses: 0,
        volume: 0,
      })));
    }

    // Load or initialize player balance
    const savedBalance = playerBalances.get(address);
    if (savedBalance !== undefined) {
      setBalance(savedBalance);
    } else {
      setBalance(2.0); // Initial balance for new players
      setPlayerBalances(new Map(playerBalances.set(address, 2.0)));
    }

    // Load or initialize user profile
    const savedProfile = userProfiles.get(address);
    if (savedProfile) {
      setUserProfile(savedProfile);
    } else {
      const defaultProfile = {
        username: `Player${address.slice(2, 8)}`,
        password: "",
      };
      setUserProfile(defaultProfile);
      setUserProfiles(new Map(userProfiles.set(address, defaultProfile)));
    }
  };

  const disconnectWallet = () => {
    // Save current balance before disconnecting
    if (walletAddress) {
      setPlayerBalances(new Map(playerBalances.set(walletAddress, balance)));
    }
    setWalletAddress(null);
    setIsConnected(false);
    setUserProfile(null);
  };

  const updateBalance = (amount: number) => {
    setBalance((prev) => {
      const newBalance = prev + amount;
      // Update the saved balance for current player
      if (walletAddress) {
        setPlayerBalances(new Map(playerBalances.set(walletAddress, newBalance)));
      }
      return newBalance;
    });
  };

  const updateUserProfile = (username: string, password: string) => {
    if (!walletAddress) return;
    
    const newProfile = { username, password };
    setUserProfile(newProfile);
    setUserProfiles(new Map(userProfiles.set(walletAddress, newProfile)));
  };

  const addGameResult = (type: GameResult["type"], won: boolean, amount: number) => {
    if (!walletAddress) return;

    const newResult: GameResult = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      player: walletAddress,
      result: won ? "Won" : "Lost",
      amount,
      timestamp: Date.now(),
    };

    setGameHistory((prev) => [newResult, ...prev].slice(0, 50)); // Keep last 50 games

    // Update player stats
    setPlayerStats((prev) => {
      const newStats = new Map(prev);
      const stats = newStats.get(walletAddress) || {
        address: walletAddress,
        wins: 0,
        losses: 0,
        volume: 0,
      };

      stats.volume += amount;
      if (won) {
        stats.wins += 1;
      } else {
        stats.losses += 1;
      }

      newStats.set(walletAddress, stats);
      return newStats;
    });
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress,
        balance,
        connectWallet,
        disconnectWallet,
        updateBalance,
        addGameResult,
        gameHistory,
        playerStats,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};
