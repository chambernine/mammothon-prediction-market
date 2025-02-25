import { sendTransaction } from "@/lib/viem-utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse request body
    const { from, to, amount } = await req.json();

    // Validate input parameters
    if (!from || !to || !amount) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Validate Ethereum addresses
    const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethereumAddressRegex.test(from) || !ethereumAddressRegex.test(to)) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      );
    }

    // Validate amount
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Send transaction
    const result = await sendTransaction(
      from as `0x${string}`,
      to as `0x${string}`,
      amount
    );

    // Handle transaction result
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Transaction failed" },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      transactionHash: result.hash,
      message: "Transaction submitted successfully",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
