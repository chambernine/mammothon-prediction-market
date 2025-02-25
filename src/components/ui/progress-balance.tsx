"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBalanceProps {
  balance: number;
  neededEth: number;
  className?: string;
}

const ProgressBalance: React.FC<ProgressBalanceProps> = ({
  balance,
  neededEth,
  className,
}) => {
  const total = balance > 0 ? balance : 1;
  const usedPercentage = Math.min((neededEth / total) * 100, 100);
  const remainingPercentage = 100 - usedPercentage;

  return (
    <div
      className={cn(
        "relative w-full h-2 rounded-full overflow-hidden",
        className
      )}
    >
      {/* Green (Remaining Balance) - Stays on the Left */}
      <div
        className="absolute left-0 top-0 h-full bg-green-500 transition-all"
        style={{ width: `${remainingPercentage}%` }}
      />

      {/* Red (Used Balance) - Stays on the Right */}
      <div
        className="absolute right-0 top-0 h-full bg-red-500 transition-all"
        style={{ width: `${usedPercentage}%` }}
      />

      {/* Base Progress Layer (for smooth transitions) */}
      <Progress
        value={100}
        className="absolute top-0 left-0 w-full h-full opacity-0"
      />
    </div>
  );
};

export default ProgressBalance;
