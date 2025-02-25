"use client";

import { ChevronsUpDown, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { WalletSection } from "./wallet-section";
import { useState } from "react";
import { useGetBalance } from "@/service/user-wallet";

export function NavUser({ onFaucetRequest }: { onFaucetRequest: () => void }) {
  const { isMobile, state } = useSidebar();
  const isExpanded = state === "expanded";
  const { user, authenticated, login, logout, ready } = usePrivy();
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  // Extract Farcaster profile data
  const farcasterProfile = user?.farcaster;
  const wallet = user?.smartWallet;
  const walletAddress = wallet?.address;

  // Add balance fetching
  const {
    balance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance,
  } = useGetBalance(walletAddress);

  const displayName = farcasterProfile?.displayName || "Anonymous";
  const username = farcasterProfile?.username
    ? `@${farcasterProfile.username}`
    : user?.email?.address;
  const avatarUrl = farcasterProfile?.pfp || "/avatars/shadcn.jpg";
  const fallbackInitials = displayName?.slice(0, 2)?.toUpperCase() || "AN";

  const handleRequestFaucet = async () => {
    try {
      setIsFaucetLoading(true);
      const response = await fetch("/api/server-wallet/send-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: walletAddress, amount: "0.00001" }),
      });
      console.log(response);

      await refetchBalance(); // Add this to refresh balance after faucet request
      onFaucetRequest(); // Trigger refetch of server balance
    } catch (error) {
      console.error("Failed to request funds:", error);
    } finally {
      setIsFaucetLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button onClick={login} className="w-full flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            {isExpanded && "Login"}
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback className="rounded-lg">
                  {fallbackInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {username}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback className="rounded-lg">
                    {fallbackInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {username}
                  </span>
                  {farcasterProfile?.bio && (
                    <span className="mt-1 truncate text-xs text-muted-foreground">
                      {farcasterProfile.bio}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <WalletSection
              address={wallet?.address || ""}
              balance={isBalanceLoading ? "Loading..." : balance}
              network="Sepolia BASE"
              onCopyAddress={() => {
                navigator.clipboard.writeText(wallet?.address || "");
              }}
              onViewExplorer={() => {
                window.open(
                  `https://sepolia.basescan.org/address/${wallet?.address}`,
                  "_blank"
                );
              }}
              onRequestFaucet={handleRequestFaucet}
              isFaucetLoading={isFaucetLoading}
            />
            <DropdownMenuSeparator />
            <div className="flex justify-between items-center px-1 py-1 h-8">
              <div className="text-sm">Theme</div>
              <ThemeSwitcher />
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
            >
              <LogOut className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
