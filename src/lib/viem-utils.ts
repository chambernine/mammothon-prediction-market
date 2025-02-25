import {
  createPublicClient,
  http,
  formatEther,
  createWalletClient,
  // custom,
  parseEther,
  type Hash,
} from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const walletClient = createWalletClient({
  chain: baseSepolia,
  transport: http(),
});

export async function getBalance(
  address: `0x${string}`
): Promise<string | null> {
  try {
    const balance = await client.getBalance({ address });
    return formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
}

interface TransactionResult {
  success: boolean;
  hash?: Hash;
  error?: string;
}

export async function sendTransaction(
  from: `0x${string}`,
  to: `0x${string}`,
  amount: string
): Promise<TransactionResult> {
  try {
    // Validate input amount
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new Error("Invalid amount provided");
    }

    // Convert ETH amount to Wei
    const value = parseEther(amount);

    // Request account access if needed
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Send transaction
    const hash = await walletClient.sendTransaction({
      account: from,
      to,
      value,
      chainId: baseSepolia.id,
    });

    return {
      success: true,
      hash,
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
