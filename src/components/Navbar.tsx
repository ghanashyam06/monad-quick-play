import { Zap, Wallet, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import WalletDialog from "./WalletDialog";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const { isConnected, walletAddress, balance, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center glow-primary">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient-primary">Monad</span>{" "}
              <span className="text-foreground">QuickPlay</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/#games" className="text-sm text-muted-foreground hover:text-primary transition-colors">Games</a>
            <a href="/#leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Leaderboard</a>
            <a href="/#how" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a>
            {isConnected && (
              <button 
                onClick={() => navigate("/profile")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">Monad Testnet</span>
            </div>
            
            {isConnected && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/30">
                <Wallet className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono font-semibold text-primary">
                  {balance.toFixed(2)} MON
                </span>
              </div>
            )}

            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-success/10 border border-success/30">
                  <span className="text-xs font-mono text-success">
                    {formatAddress(walletAddress!)}
                  </span>
                </div>
                <Button
                  onClick={() => navigate("/profile")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setWalletDialogOpen(true)}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
              >
                <Wallet className="w-4 h-4" />
                Connect
              </Button>
            )}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass border-t border-border/30 p-4 flex flex-col gap-3">
            <a href="/#games" className="text-sm text-muted-foreground hover:text-primary py-2">Games</a>
            <a href="/#leaderboard" className="text-sm text-muted-foreground hover:text-primary py-2">Leaderboard</a>
            <a href="/#how" className="text-sm text-muted-foreground hover:text-primary py-2">How It Works</a>
            {isConnected && (
              <button 
                onClick={() => {
                  navigate("/profile");
                  setMobileOpen(false);
                }}
                className="text-sm text-muted-foreground hover:text-primary py-2 flex items-center gap-2 text-left"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
            )}
            
            {isConnected && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono font-semibold text-primary">
                  {balance.toFixed(2)} MON
                </span>
              </div>
            )}

            {isConnected ? (
              <div className="space-y-2">
                <div className="px-3 py-2 rounded-lg bg-success/10 border border-success/30 text-center">
                  <span className="text-xs font-mono text-success">
                    {formatAddress(walletAddress!)}
                  </span>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setWalletDialogOpen(true)}
                className="gap-2 bg-primary text-primary-foreground w-full mt-2"
              >
                <Wallet className="w-4 h-4" />
                Connect
              </Button>
            )}
          </div>
        )}
      </nav>

      <WalletDialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen} />
    </>
  );
};

export default Navbar;
