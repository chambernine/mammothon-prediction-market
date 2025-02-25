"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
export default function PrivyClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  let isDarkMode = false;
  if (typeof window !== "undefined") {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    isDarkMode = theme === "dark" || (theme === "system" && prefersDarkMode);
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["farcaster"],

        appearance: {
          theme: isDarkMode ? "dark" : "light",
          accentColor: "#676FFF",
          showWalletLoginFirst: false,
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <SmartWalletsProvider>{children}</SmartWalletsProvider>
    </PrivyProvider>
  );
}
