"use client";

import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ProgressBalance from "../ui/progress-balance";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { baseSepolia } from "viem/chains";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";

interface EthUsageDrawerProps {
  balance: number;
  neededEth: number;
  children: React.ReactNode;
  onProceed: () => void;
}

export function EthUsageDrawer({
  balance,
  neededEth,
  children,
  onProceed,
}: EthUsageDrawerProps) {
  const isEnoughBalance = balance >= neededEth;
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const { user } = usePrivy();
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  const { client } = useSmartWallets();

  const agentAddress = process.env.NEXT_PUBLIC_AGENT_ADDRESS;

  const handleSendTransaction = async () => {
    try {
      const amount = neededEth.toString();
      const valueInWei = ethers.parseUnits(amount, 18);

      const transactionRequest = {
        chain: baseSepolia,
        agentAddress,
        value: valueInWei,
      };

      const txHash = await client?.sendTransaction(transactionRequest, {});
      onProceed();
    } catch (error) {
      console.error("Error:", error);
      // Programmatically click the close button when there's an error
      closeButtonRef.current?.click();
      onProceed();
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ETH Usage</DrawerTitle>
          <DrawerDescription>
            Check if you have enough ETH for this action.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Current Balance</p>
              <p className="text-2xl font-bold">{balance} ETH</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Required ETH</p>
              <p className="text-2xl font-bold">{neededEth.toFixed(7)} ETH</p>
            </div>
          </div>
          <ProgressBalance
            balance={balance}
            neededEth={neededEth}
            className="w-full"
          />
          <p className="mt-2 text-sm text-center">
            {isEnoughBalance
              ? "You have enough ETH for this action."
              : `You need ${(neededEth - balance).toFixed(4)} more ETH.`}
          </p>
        </div>
        <DrawerFooter>
          <Button disabled={!isEnoughBalance} onClick={handleSendTransaction}>
            Proceed
          </Button>
          <DrawerClose ref={closeButtonRef} asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
