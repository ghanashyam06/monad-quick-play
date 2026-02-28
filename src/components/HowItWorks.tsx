import { Mail, Wallet, Gamepad2, Trophy } from "lucide-react";

const STEPS = [
  { icon: Mail, title: "Login with Email", desc: "No wallet extensions needed. Just enter your email.", color: "text-primary", bg: "bg-primary/15 border-primary/30" },
  { icon: Wallet, title: "Get Smart Wallet", desc: "A smart wallet is created automatically for you.", color: "text-secondary", bg: "bg-secondary/15 border-secondary/30" },
  { icon: Gamepad2, title: "Play Games", desc: "Flip coins or predict prices. All on-chain.", color: "text-accent", bg: "bg-accent/15 border-accent/30" },
  { icon: Trophy, title: "Win & Earn", desc: "Instant payouts. Climb the leaderboard.", color: "text-success", bg: "bg-success/15 border-success/30" },
];

const HowItWorks = () => {
  return (
    <section id="how" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-md mx-auto">From email to on-chain gaming in under 30 seconds.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {STEPS.map((step, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center group hover:scale-[1.02] transition-transform">
              <div className={`w-14 h-14 rounded-2xl border ${step.bg} flex items-center justify-center mx-auto mb-4`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              <div className="text-xs font-mono text-muted-foreground mb-2">Step {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
