import { Copy, Droplets, ExternalLink, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WalletSectionProps {
  address: string;
  balance: string;
  network: string;
  onCopyAddress: () => void;
  onViewExplorer: () => void;
  onRequestFaucet: () => void;
  isFaucetLoading?: boolean;
}

export function WalletSection({
  address,
  balance,
  network,
  onCopyAddress,
  onViewExplorer,
  onRequestFaucet,
  isFaucetLoading = false,
}: WalletSectionProps) {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="px-2 py-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Wallet</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {network}
        </span>
      </div>

      <div className="mb-3 rounded-lg bg-muted/50 p-3">
        <div className="mb-2 flex flex-col items-center justify-between gap-2">
          <span className="text-xl font-bold tracking-tight">
            {balance} ETH
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-7 gap-1.5"
                  onClick={onRequestFaucet}
                  disabled={isFaucetLoading}
                >
                  <Droplets className="h-3.5 w-3.5" />
                  {isFaucetLoading ? "Requesting..." : "Get Funds"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Request funds from faucet</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <code className="text-xs text-muted-foreground">
            {truncatedAddress}
          </code>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={onCopyAddress}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy address</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy address</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={onViewExplorer}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span className="sr-only">View in explorer</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View in explorer</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
