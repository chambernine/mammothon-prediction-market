"use client";

import type React from "react";
import { useState } from "react";
import { Vote, PlusCircle, PieChart, Settings, Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import Dock from "@/components/ui/dock";
import { TopBarProfile } from "@/components/custom/topbar-profile";
import { ServerBalance } from "@/components/custom/server-balance";

export default function PollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const handleFaucetRequest = () => {
    setRefetchTrigger((prev) => !prev);
  };

  const navigationItems = [
    {
      icon: <Compass />,
      label: "Discover",
      onClick: () => router.push("/poll"),
    },
    {
      icon: <Vote />,
      label: "Bet Poll",
      onClick: () => router.push("/poll/bet-poll"),
    },
    {
      icon: <PlusCircle />,
      label: "Create Poll",
      onClick: () => router.push("/poll/create-poll"),
    },
    {
      icon: <PieChart />,
      label: "Stats",
      onClick: () => router.push("/poll/stats"),
    },
    {
      icon: <Settings />,
      label: "Settings",
      onClick: () => router.push("/poll/settings"),
    },
  ];

  return (
    <div className="min-h-screen w-full pb-8">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 dark:from-indigo-500 dark:to-pink-500">
              <Vote className="h-5 w-5 text-white" />
            </div>
            <h1 className="font-semibold text-slate-900 dark:text-white">
              Poll App
            </h1>
            <ServerBalance refetchTrigger={refetchTrigger} />
          </div>
          <TopBarProfile onFaucetRequest={handleFaucetRequest} />
        </div>
      </header>
      {children}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-6 bg-transparent">
        <Dock
          items={navigationItems}
          panelHeight={30}
          baseItemSize={50}
          magnification={66}
        />
      </div>
    </div>
  );
}
