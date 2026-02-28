import { useState } from "react";
import { Dices, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

const BET_OPTIONS = [0.01, 0.05, 0.1, 0.5];

const DiceRoll = () => {
  const { balance, updateBalance, isConnected, addGameResult } = useWallet();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(0.05);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<{ number: number; won: boolean } | null>(null);

  const handleRoll = () => {
    if (!selectedNumber) return;
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (balance < betAmount) {
      toast.error("Insufficient balance");
      return;
    }

    setIsRolling(true);
    setResult(null);
    updateBalance(-betAmount);

    setTimeout(() => {
      const rolledNumber = Math.floor(Math.random() * 6) + 1;
      const won = rolledNumber === selectedNumber;
      setResult({ number: rolledNumber, won });
      
      if (won) {
        const winAmount = betAmount * 5;
        updateBalance(winAmount);
        toast.success(`You won ${winAmount.toFixed(2)} MON!`);
      } else {
        toast.error("Better luck next time!");
      }
      
      addGameResult("Dice Roll", won, betAmount);
      setIsRolling(false);
    }, 1500);
  };

  return (
    <div className="glass rounded-2xl p-6 md:p-8 glow-accent">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
          <Dices className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Dice Roll</h3>
          <p className="text-xs text-muted-foreground">Pick a number • 5x payout</p>
        </div>
      </div>

      {/* Dice display */}
      <div className="flex justify-center my-8">
        <div className={`w-28 h-28 rounded-2xl border-4 flex items-center justify-center text-4xl font-bold font-mono ${
          result
            ? result.won
              ? "border-success bg-success/10 text-success glow-success"
              : "border-destructive bg-destructive/10 text-destructive"
            : "border-accent/40 bg-accent/5 text-accent"
        } ${isRolling ? "animate-spin" : ""}`}>
          {isRolling ? "🎲" : result ? result.number : "?"}
        </div>
      </div>

      {result && (
        <div className={`text-center mb-6 text-sm font-semibold ${result.won ? "text-success" : "text-destructive"}`}>
          {result.won ? `🎉 You won ${(betAmount * 5).toFixed(2)} MON!` : `Rolled ${result.number}. Try again!`}
        </div>
      )}

      {/* Number selector */}
      <div className="mb-5">
        <label className="text-xs text-muted-foreground mb-2 block">Pick Your Number</label>
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setSelectedNumber(num)}
              className={`aspect-square rounded-xl border text-lg font-bold transition-all ${
                selectedNumber === num
                  ? "bg-accent/15 border-accent text-accent glow-accent"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:border-accent/40"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
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
        className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent font-semibold"
        disabled={!selectedNumber || isRolling || !isConnected}
        onClick={handleRoll}
      >
        {isRolling ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Rolling...</>
        ) : (
          `Roll for ${betAmount} MON`
        )}
      </Button>
    </div>
  );
};

export default DiceRoll;
