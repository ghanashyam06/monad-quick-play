import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Wallet, 
  Lock, 
  Edit2, 
  Save, 
  X, 
  TrendingUp, 
  Trophy, 
  Target,
  Coins,
  BarChart3,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    userProfile, 
    updateUserProfile,
    gameHistory,
    playerStats
  } = useWallet();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userProfile?.username || "");
  const [password, setPassword] = useState(userProfile?.password || "");

  // Redirect if not connected
  if (!isConnected || !walletAddress) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="max-w-md mx-auto text-center py-20">
            <Wallet className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Wallet Not Connected</h2>
            <p className="text-muted-foreground mb-6">
              Please connect your wallet to view your profile
            </p>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const userStats = playerStats.get(walletAddress);
  const userGames = gameHistory.filter(game => game.player === walletAddress);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalGames = userStats ? userStats.wins + userStats.losses : 0;
    const winRate = totalGames > 0 ? (userStats!.wins / totalGames) * 100 : 0;
    
    const gamesByType = {
      "Coin Flip": userGames.filter(g => g.type === "Coin Flip").length,
      "Price Prediction": userGames.filter(g => g.type === "Price Prediction").length,
      "Dice Roll": userGames.filter(g => g.type === "Dice Roll").length,
    };

    const totalWagered = userStats?.volume || 0;
    const totalWon = userGames
      .filter(g => g.result === "Won")
      .reduce((sum, g) => sum + g.amount, 0);

    return {
      totalGames,
      winRate,
      gamesByType,
      totalWagered,
      totalWon,
      netProfit: balance - 2.0, // Starting balance was 2.0
    };
  }, [userStats, userGames, balance]);

  const handleSave = () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    updateUserProfile(username, password);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setUsername(userProfile?.username || "");
    setPassword(userProfile?.password || "");
    setIsEditing(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {userProfile?.username || "Player"}
            </h1>
            <p className="text-sm text-muted-foreground font-mono">
              {formatAddress(walletAddress)}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Profile Info Card */}
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      className="gap-2"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <User className="w-4 h-4" />
                    Username
                  </label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4" />
                    Password
                  </label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter password"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4" />
                    Wallet Address
                  </label>
                  <Input
                    value={walletAddress}
                    disabled
                    className="font-mono text-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Balance Card */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5" />
                  Wallet Balance
                </CardTitle>
                <CardDescription>Your current balance and stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="text-5xl font-bold font-mono text-primary mb-2">
                    {balance.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-6">MON</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="text-2xl font-bold text-foreground">
                        {userStats?.wins || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Wins</div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="text-2xl font-bold text-foreground">
                        {userStats?.losses || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Losses</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <Card className="glass mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Analytics & Statistics
              </CardTitle>
              <CardDescription>Your gaming performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Win Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {analytics.winRate.toFixed(1)}%
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-muted-foreground">Total Games</span>
                  </div>
                  <div className="text-2xl font-bold text-secondary">
                    {analytics.totalGames}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Total Wagered</span>
                  </div>
                  <div className="text-2xl font-bold text-accent">
                    {analytics.totalWagered.toFixed(2)}
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  analytics.netProfit >= 0 
                    ? "bg-success/10 border-success/30" 
                    : "bg-destructive/10 border-destructive/30"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`w-4 h-4 ${
                      analytics.netProfit >= 0 ? "text-success" : "text-destructive"
                    }`} />
                    <span className="text-xs text-muted-foreground">Net Profit</span>
                  </div>
                  <div className={`text-2xl font-bold ${
                    analytics.netProfit >= 0 ? "text-success" : "text-destructive"
                  }`}>
                    {analytics.netProfit >= 0 ? "+" : ""}{analytics.netProfit.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Games by Type */}
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3">Games Played by Type</h4>
                <div className="space-y-3">
                  {Object.entries(analytics.gamesByType).map(([type, count]) => {
                    const total = analytics.totalGames;
                    const percentage = total > 0 ? (count / total) * 100 : 0;
                    const color = 
                      type === "Coin Flip" ? "bg-primary" :
                      type === "Price Prediction" ? "bg-secondary" :
                      "bg-accent";

                    return (
                      <div key={type}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-foreground">{type}</span>
                          <span className="text-sm font-mono text-muted-foreground">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Games */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Games</CardTitle>
              <CardDescription>Your last 10 games</CardDescription>
            </CardHeader>
            <CardContent>
              {userGames.length > 0 ? (
                <div className="space-y-2">
                  {userGames.slice(0, 10).map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                          game.type === "Coin Flip" ? "bg-primary/15 text-primary" :
                          game.type === "Price Prediction" ? "bg-secondary/15 text-secondary" :
                          "bg-accent/15 text-accent"
                        }`}>
                          {game.type === "Coin Flip" ? "CF" :
                           game.type === "Price Prediction" ? "PP" : "DR"}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            {game.type}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(game.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${
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
                  <p className="text-sm">No games played yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
