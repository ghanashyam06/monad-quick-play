import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CoinFlip from "@/components/CoinFlip";
import PricePrediction from "@/components/PricePrediction";
import DiceRoll from "@/components/DiceRoll";
import Leaderboard from "@/components/Leaderboard";
import HowItWorks from "@/components/HowItWorks";
import { Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Games Section */}
      <section id="games" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-mono text-primary">Play Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Game</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <CoinFlip />
            <PricePrediction />
            <DiceRoll />
          </div>
        </div>
      </section>

      <Leaderboard />
      <HowItWorks />

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built on <span className="text-primary font-semibold">Monad Testnet</span> • Powered by Pyth VRF & Oracle
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
