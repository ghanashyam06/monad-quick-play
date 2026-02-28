import { useState } from "react";
import { Wallet, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "sonner";

interface WalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WalletDialog = ({ open, onOpenChange }: WalletDialogProps) => {
  const { connectWallet } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConnect = () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter a wallet address");
      return;
    }
    
    // Basic validation for wallet address format
    if (walletAddress.length < 20) {
      toast.error("Invalid wallet address format");
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    connectWallet(walletAddress);
    toast.success("Wallet connected successfully!");
    setShowConfirmation(false);
    setWalletAddress("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!showConfirmation ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Connect Wallet
              </DialogTitle>
              <DialogDescription>
                Enter your wallet address to connect and start playing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Wallet Address
                </label>
                <Input
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your Monad testnet wallet address
                </p>
              </div>
              <Button
                onClick={handleConnect}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Confirm Connection
              </DialogTitle>
              <DialogDescription>
                Please confirm you want to connect this wallet
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
                <p className="text-sm font-mono break-all text-foreground">
                  {walletAddress}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 bg-success hover:bg-success/90"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WalletDialog;
