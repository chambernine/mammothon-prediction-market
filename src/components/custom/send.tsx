"use client";

import { useState } from "react";
export default function SendPage() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setTxHash("");

    try {
      const response = await fetch("/api/server-wallet/send-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, amount }),
      });

      const data = await response.json();

      if (data.success) {
        setTxHash(data.txHash);
      } else {
        alert(data.error || "Transaction failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
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
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        {loading ? "Sending..." : "Send Transaction"}
      </button>
      {txHash && (
        <p className="mt-2 text-green-600">
          Transaction Hash:{" "}
          <a href={`https://etherscan.io/tx/${txHash}`} target="_blank">
            {txHash}
          </a>
        </p>
      )}
    </div>
  );
}
