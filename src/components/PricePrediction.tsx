import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Timer, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BET_OPTIONS = [0.01, 0.05, 0.1, 0.5];

const PricePrediction = () => {
  const [prediction, setPrediction] = useState<"up" | "down" | null>(null);
  const [betAmount, setBetAmount] = useState(0.05);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [mockPrice, setMockPrice] = useState(3245.67);
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [result, setResult] = useState<{ won: boolean; direction: "up" | "down" } | null>(null);

  // Simulate live price
  useEffect(() => {
    const interval = setInterval(() => {
      setMockPrice((p) => p + (Math.random() - 0.48) * 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    if (!isActive) return;
    if (timeLeft <= 0) {
      const direction = mockPrice > (startPrice ?? 0) ? "up" : "down";
      setResult({ won: direction === prediction, direction });
      setIsActive(false);
      setTimeLeft(120);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [isActive, timeLeft, mockPrice, startPrice, prediction]);

  const handlePredict = () => {
    if (!prediction) return;
    setStartPrice(mockPrice);
    setResult(null);
    setIsActive(true);
    setTimeLeft(120);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="glass rounded-2xl p-6 md:p-8 glow-secondary">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-secondary/15 border border-secondary/30 flex items-center justify-center">
          <Timer className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">Price Prediction</h3>
          <p className="text-xs text-muted-foreground">2-min market • Pyth Oracle</p>
        </div>
      </div>

      {/* Price display */}
      <div className="text-center my-8">
        <div className="text-xs text-muted-foreground mb-1">ETH / USD</div>
        <div className="text-4xl font-bold font-mono text-foreground">
          ${mockPrice.toFixed(2)}
        </div>
        {isActive && startPrice && (
          <div className={`text-sm font-mono mt-2 ${mockPrice >= startPrice ? "text-success" : "text-destructive"}`}>
            {mockPrice >= startPrice ? "+" : ""}{(mockPrice - startPrice).toFixed(2)} ({((mockPrice - startPrice) / startPrice * 100).toFixed(3)}%)
          </div>
        )}
      </div>

      {isActive && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30">
            <Timer className="w-4 h-4 text-secondary" />
            <span className="font-mono font-bold text-secondary text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      )}

      {result && (
        <div className={`text-center mb-6 text-sm font-semibold ${result.won ? "text-success" : "text-destructive"}`}>
          {result.won ? `🎉 You won ${betAmount} MON! Price went ${result.direction}` : `Price went ${result.direction}. Better luck next time!`}
        </div>
      )}

      {!isActive && (
        <>
          {/* Direction selector */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => setPrediction("up")}
              className={`py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                prediction === "up"
                  ? "bg-success/15 border-success text-success glow-success"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:border-success/40"
              }`}
            >
              <TrendingUp className="w-4 h-4" /> UP
            </button>
            <button
              onClick={() => setPrediction("down")}
              className={`py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                prediction === "down"
                  ? "bg-destructive/15 border-destructive text-destructive"
                  : "bg-muted/30 border-border/50 text-muted-foreground hover:border-destructive/40"
              }`}
            >
              <TrendingDown className="w-4 h-4" /> DOWN
            </button>
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
            className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-secondary font-semibold"
            disabled={!prediction}
            onClick={handlePredict}
          >
            Predict for {betAmount} MON
          </Button>
        </>
      )}

      {isActive && (
        <div className="text-center text-xs text-muted-foreground">
          You predicted <span className={prediction === "up" ? "text-success" : "text-destructive"}>{prediction?.toUpperCase()}</span> • Waiting for settlement...
        </div>
      )}
    </div>
  );
};

export default PricePrediction;
