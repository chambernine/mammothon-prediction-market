"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { baseSepolia } from "viem/chains";
import { usePrivy } from "@privy-io/react-auth";
import { ethers } from "ethers";

export default function UserSendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = usePrivy();
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  const { client } = useSmartWallets();

  const handleSendTransaction = async () => {
    setLoading(true);
    try {
      // Convert amount (ETH) to wei
      const valueInWei = ethers.parseUnits(amount, 18); // Assuming 18 decimals for ETH

      const transactionRequest = {
        chain: baseSepolia,
        to,
        value: valueInWei, // Ensure value is a string
      };

      const txHash = await client?.sendTransaction(transactionRequest, {});
      console.log(txHash);
      toast({
        title: "Transaction Successful",
        description: `Transaction Hash: ${txHash}`,
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Send ETH</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSendTransaction}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {loading ? "Sending..." : "Send Transaction"}
      </button>
    </div>
  );
}
