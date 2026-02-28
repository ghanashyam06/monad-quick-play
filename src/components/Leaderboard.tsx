import { Trophy, Medal, Crown } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { useMemo } from "react";

const Leaderboard = () => {
  const { gameHistory, playerStats, walletAddress } = useWallet();

  // Sort players by volume
  const topPlayers = useMemo(() => {
    return Array.from(playerStats.values())
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10)
      .map((player, index) => ({
        ...player,
        rank: index + 1,
        avatar: index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "👤",
      }));
  }, [playerStats]);

  // Get current user's rank
  const userRank = useMemo(() => {
    if (!walletAddress) return null;
    const sortedPlayers = Array.from(playerStats.values())
      .sort((a, b) => b.volume - a.volume);
    const rank = sortedPlayers.findIndex(p => p.address === walletAddress) + 1;
    return rank > 0 ? rank : null;
  }, [playerStats, walletAddress]);

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Format address
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get game type abbreviation
  const getGameAbbr = (type: string) => {
    if (type === "Coin Flip") return "CF";
    if (type === "Price Prediction") return "PP";
    if (type === "Dice Roll") return "DR";
    return "??";
  };

  // Get game color
  const getGameColor = (type: string) => {
    if (type === "Coin Flip") return "bg-primary/15 text-primary";
    if (type === "Price Prediction") return "bg-secondary/15 text-secondary";
    if (type === "Dice Roll") return "bg-accent/15 text-accent";
    return "bg-muted/15 text-muted-foreground";
  };

  return (
    <section id="leaderboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-mono text-accent">Live Rankings</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Leaderboard</h2>
          {walletAddress && userRank && (
            <p className="text-sm text-muted-foreground mt-2">
              Your rank: <span className="text-primary font-semibold">#{userRank}</span>
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Top Players */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Medal className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-foreground">Top Players</h3>
            </div>
            {topPlayers.length > 0 ? (
              <div className="space-y-3">
                {topPlayers.map((player) => (
                  <div
                    key={player.address}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                      player.rank <= 3 
                        ? "bg-accent/5 border border-accent/10" 
                        : "bg-muted/20 border border-border/30"
                    } ${
                      player.address === walletAddress 
                        ? "ring-2 ring-primary/50" 
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{player.avatar}</span>
                      <div>
                        <div className="text-sm font-mono text-foreground flex items-center gap-2">
                          {formatAddress(player.address)}
                          {player.address === walletAddress && (
                            <Crown className="w-3 h-3 text-primary" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {player.wins}W / {player.losses}L
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-semibold text-accent">
                        {player.volume.toFixed(2)} MON
                      </div>
                      <div className="text-xs text-muted-foreground">volume</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No players yet. Be the first to play!</p>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <h3 className="font-semibold text-foreground">Recent Activity</h3>
            </div>
            {gameHistory.length > 0 ? (
              <div className="space-y-3">
                {gameHistory.slice(0, 10).map((game) => (
                  <div 
                    key={game.id} 
                    className={`flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30 ${
                      game.player === walletAddress ? "ring-1 ring-primary/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${getGameColor(game.type)}`}>
                        {getGameAbbr(game.type)}
                      </div>
                      <div>
                        <div className="text-sm font-mono text-foreground">
                          {formatAddress(game.player)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTimeAgo(game.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${
                        game.result === "Won" ? "text-success" : "text-destructive"
                      }`}>
                        {game.result}
                      </div>
                      <div className="text-xs font-mono text-muted-foreground">
                        {game.amount.toFixed(2)} MON
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                </div>
                <p className="text-sm">No games played yet. Start playing!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
