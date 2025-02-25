import { NextResponse } from "next/server";
import { getBalance } from "@/lib/viem-utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return NextResponse.json(
      { error: "Invalid Ethereum address" },
      { status: 400 }
    );
  }

  const balance = await getBalance(address as `0x${string}`);

  if (balance === null) {
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }

  return NextResponse.json({ address, balance });
}
