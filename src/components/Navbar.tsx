import { Zap, Wallet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
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
          <a href="#games" className="text-sm text-muted-foreground hover:text-primary transition-colors">Games</a>
          <a href="#leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Leaderboard</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">Monad Testnet</span>
          </div>
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
            <Wallet className="w-4 h-4" />
            Connect
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/30 p-4 flex flex-col gap-3">
          <a href="#games" className="text-sm text-muted-foreground hover:text-primary py-2">Games</a>
          <a href="#leaderboard" className="text-sm text-muted-foreground hover:text-primary py-2">Leaderboard</a>
          <a href="#how" className="text-sm text-muted-foreground hover:text-primary py-2">How It Works</a>
          <Button className="gap-2 bg-primary text-primary-foreground w-full mt-2">
            <Wallet className="w-4 h-4" />
            Connect
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
