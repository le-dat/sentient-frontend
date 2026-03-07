"use client";

import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";

export function WalletGate({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const currentRoute = usePathname();
  const publicRoute = ROUTES.SEARCH;

  return (
    <>
      {children}
      {!isConnected && currentRoute !== publicRoute && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/75 backdrop-blur-md">
          <div className="mx-4 flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl border border-border/60 bg-card p-8 text-center shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card-2">
              <Wallet className="h-6 w-6 text-muted" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Connect your wallet</h2>
              <p className="mt-1.5 text-sm text-muted">
                You need to connect a wallet to access this page.
              </p>
            </div>
            <ConnectButton />
          </div>
        </div>
      )}
    </>
  );
}
