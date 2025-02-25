"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../ui/loading";

export function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (ready && !authenticated) {
      login();
    }
  }, [ready, authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return (
    <>
      {children}
      <Loading isLoading={!ready} />
    </>
  );
}
