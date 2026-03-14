import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { WalletGate } from "@/components/layout/wallet-gate";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Monitor and manage your DeFi vaults across multiple EVM chains. View balances, set automation rules, and track performance.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <WalletGate>{children}</WalletGate>
    </AppShell>
  );
}
