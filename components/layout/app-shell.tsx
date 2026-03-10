"use client";

import { Navbar } from "@/components/layout/navbar";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar
        showActiveState
        right={<ConnectButton showBalance={false} />}
      />

      <main className="mx-auto max-w-6xl px-3 py-5 pb-24 md:px-6 md:py-6 md:pb-28">
        {children}
      </main>
    </div>
  );
}
