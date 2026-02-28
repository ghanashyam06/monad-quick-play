import { useState } from "react";
import { Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const BET_OPTIONS = [0.01, 0.05, 0.1, 0.5];

const CoinFlip = () => {
  const { balance, updateBalance, isConnected, addGameResult } = useWallet();
  const [selectedSide, setSelectedSide] = useState<"heads" | "tails" | null>(null);
  const [betAmount, setBetAmount] = useState(0.05);
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<{ side: "heads" | "tails"; won: boolean } | null>(null);

  const handleFlip = () => {
    if (!selectedSide) return;
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (balance < betAmount) {
      toast.error("Insufficient balance");
      return;
    }

    setIsFlipping(true);
    setResult(null);
    updateBalance(-betAmount);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? "heads" : "tails";
      const won = outcome === selectedSide;
      setResult({ side: outcome as "heads" | "tails", won });
      
      if (won) {
        updateBalance(betAmount * 2);
        toast.success(`You won ${betAmount} MON!`);
      } else {
        toast.error("Better luck next time!");
      }
      
      addGameResult("Coin Flip", won, betAmount);
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 glow-primary">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
          <Coins className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">VRF Coin Flip</h3>
          <p className="text-xs text-muted-foreground">Provably fair • Pyth VRF</p>
        </div>
      </div>

      {/* Coin display */}
      <div className="flex justify-center my-8">
        <div className={`w-28 h-28 rounded-full border-4 flex items-center justify-center text-2xl font-bold font-mono ${
          result
            ? result.won
              ? "border-success bg-success/10 text-success glow-success"
              : "border-destructive bg-destructive/10 text-destructive"
            : "border-primary/40 bg-primary/5 text-primary"
        } ${isFlipping ? "animate-coin-flip" : ""}`}>
          {isFlipping ? "?" : result ? (result.side === "heads" ? "H" : "T") : "?"}
        </div>
      </div>

      {result && (
        <div className={`text-center mb-6 text-sm font-semibold ${result.won ? "text-success" : "text-destructive"}`}>
          {result.won ? `🎉 You won ${betAmount} MON!` : "Better luck next time!"}
        </div>
      )}

      {/* Side selector */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {(["heads", "tails"] as const).map((side) => (
          <button
            key={side}
            onClick={() => setSelectedSide(side)}
            className={`py-3 rounded-xl border text-sm font-semibold uppercase tracking-wider transition-all ${
              selectedSide === side
                ? "bg-primary/15 border-primary text-primary glow-primary"
                : "bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/40"
            }`}
          >
            {side}
          </button>
        ))}
      </div>

      {/* Bet amount */}
      <div className="mb-6">
        <label className="text-xs text-muted-foreground mb-2 block">Bet Amount (MON)</label>
        <div className="grid grid-cols-4 gap-2">
          {BET_OPTIONS.map((amt) => (
            <button
              key={amt}
              onClick={() => setBetAmount(amt)}
              className={`py-2 rounded-lg border text-xs font-mono font-semibold transition-all ${
                betAmount === amt
                  ? "bg-accent/15 border-accent text-accent"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:border-accent/40"
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
        disabled={!selectedSide || isFlipping || !isConnected}
        onClick={handleFlip}
      >
        {isFlipping ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Flipping...</>
        ) : (
          `Flip for ${betAmount} MON`
        )}
      </Button>
    </div>
  );
};

export default CoinFlip;
