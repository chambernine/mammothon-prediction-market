"use client";
import { Coins } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetBalance } from "@/service/server-wallet";
import usePollService from "@/service/poll";
import { useState } from "react";

interface ServerBalanceProps {
  isExpanded?: boolean;
  refetchTrigger: boolean; // Add a prop to trigger refetch
}

export function ServerBalance({ refetchTrigger }: ServerBalanceProps) {
  // Add balance fetching
  const { balance, refetch: refetch } = useGetBalance(
    "0xD685CCb5024f83cFFd9a6e782F2c8Fb51d3170A3"
  );

  const { getFundRequest } = usePollService();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickTopUp = async () => {
    setIsLoading(true);
    try {
      await getFundRequest();
      refetch();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to top up:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Coins className="h-4 w-4 opacity-70" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ETH Faucet Balance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none text-muted-foreground">
                    Available ETH
                  </p>
                  <p className="text-2xl font-bold">{balance} ETH</p>
                </div>
                <Coins className="h-8 w-8 opacity-70" />
              </div>
            </CardContent>
          </Card>

          <div className="text-sm text-muted-foreground">
            This ETH is available for faucet use on the test network. Use it
            responsibly for testing and development purposes.
          </div>

          <div className="flex justify-end space-x-2">
            <Button onClick={handleClickTopUp} disabled={isLoading}>
              {isLoading ? (
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 
              dark:border-black dark:border-t-transparent"
                />
              ) : null}
              Top up
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
