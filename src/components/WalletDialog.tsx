import { useState } from "react";
import { Wallet, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletDialog = ({ open, onOpenChange }: WalletDialogProps) => {
  const { connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    }
    return false;
  };

  const handleMetaMaskConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (!checkMetaMask()) {
        setError("MetaMask not detected");
        setIsConnecting(false);
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts && accounts.length > 0) {
        const address = accounts[0];
        connectWallet(address);
        toast.success("Wallet connected successfully!");
        onOpenChange(false);
      } else {
        setError("No accounts found. Please create a wallet in MetaMask.");
      }
    } catch (err: any) {
      console.error("MetaMask connection error:", err);
      
      if (err.code === 4001) {
        // User rejected the request
        setError("Connection request rejected");
        toast.error("You rejected the connection request");
      } else if (err.code === -32002) {
        // Request already pending
        setError("Connection request already pending. Please check MetaMask.");
        toast.error("Please check MetaMask for pending request");
      } else {
        setError(err.message || "Failed to connect to MetaMask");
        toast.error("Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const handleInstallMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            {checkMetaMask() 
              ? "Connect your MetaMask wallet to start playing"
              : "Install MetaMask to get started"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {checkMetaMask() ? (
            <>
              {/* MetaMask Detected */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-success/10 border border-success/30">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">MetaMask Detected</p>
                  <p className="text-xs text-muted-foreground">Click below to connect</p>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-destructive">{error}</p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleMetaMaskConnect}
                disabled={isConnecting}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By connecting, you agree to our Terms of Service
              </p>
            </>
          ) : (
            <>
              {/* MetaMask Not Detected */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">MetaMask Not Found</p>
                  <p className="text-xs text-muted-foreground">Install MetaMask to continue</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleInstallMetaMask}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Install MetaMask
                </Button>

                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">
                    <strong>What is MetaMask?</strong>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MetaMask is a crypto wallet that lets you interact with blockchain applications. 
                    It's free, secure, and takes less than a minute to set up.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
