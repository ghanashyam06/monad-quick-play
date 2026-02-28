import { Trophy, Medal } from "lucide-react";

const MOCK_LEADERS = [
  { rank: 1, address: "0x1a2b...f3e4", wins: 42, volume: 12.5, avatar: "🥇" },
  { rank: 2, address: "0x5c6d...a7b8", wins: 38, volume: 10.2, avatar: "🥈" },
  { rank: 3, address: "0x9e0f...c1d2", wins: 31, volume: 8.7, avatar: "🥉" },
  { rank: 4, address: "0x3g4h...e5f6", wins: 27, volume: 7.1, avatar: "👤" },
  { rank: 5, address: "0x7i8j...g9h0", wins: 24, volume: 5.9, avatar: "👤" },
  { rank: 6, address: "0xab1c...i2j3", wins: 19, volume: 4.3, avatar: "👤" },
];

const RECENT_GAMES = [
  { type: "Coin Flip", player: "0x1a2b...f3e4", result: "Won", amount: 0.1, time: "12s ago" },
  { type: "Prediction", player: "0x5c6d...a7b8", result: "Lost", amount: 0.05, time: "45s ago" },
  { type: "Coin Flip", player: "0x9e0f...c1d2", result: "Won", amount: 0.5, time: "1m ago" },
  { type: "Prediction", player: "0x3g4h...e5f6", result: "Won", amount: 0.1, time: "2m ago" },
  { type: "Coin Flip", player: "0x7i8j...g9h0", result: "Lost", amount: 0.05, time: "3m ago" },
];

const Leaderboard = () => {
  return (
    <section id="leaderboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-mono text-accent">Live Rankings</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Leaderboard</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Top Players */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Medal className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Top Players</h3>
            </div>
            <div className="space-y-3">
              {MOCK_LEADERS.map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    player.rank <= 3 ? "bg-accent/5 border border-accent/10" : "bg-muted/20 border border-border/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{player.avatar}</span>
                    <div>
                      <div className="text-sm font-mono text-foreground">{player.address}</div>
                      <div className="text-xs text-muted-foreground">{player.wins} wins</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-semibold text-accent">{player.volume} MON</div>
                    <div className="text-xs text-muted-foreground">volume</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {RECENT_GAMES.map((game, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      game.type === "Coin Flip" ? "bg-primary/15 text-primary" : "bg-secondary/15 text-secondary"
                    }`}>
                      {game.type === "Coin Flip" ? "CF" : "PP"}
                    </div>
                    <div>
                      <div className="text-sm font-mono text-foreground">{game.player}</div>
                      <div className="text-xs text-muted-foreground">{game.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${game.result === "Won" ? "text-success" : "text-destructive"}`}>
                      {game.result}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground">{game.amount} MON</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
