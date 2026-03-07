import { AppShell } from "@/components/layout/app-shell";
import { WalletGate } from "@/components/layout/wallet-gate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <WalletGate>{children}</WalletGate>
    </AppShell>
  );
}
