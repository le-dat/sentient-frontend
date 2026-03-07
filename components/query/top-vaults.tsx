"use client";

import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { dashboardVaults } from "@/lib/mockdata/dashboard";
import { StatusChip } from "@/components/ui/status-chip";
import type { VaultItem } from "@/lib/types/dashboard";

function TopVaultRow({ vault }: { vault: VaultItem }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(ROUTES.SEARCH_VAULT(vault.addr))}
      className="cursor-pointer flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-card/40 hover:border-primary/40 hover:bg-card/70 transition-all group"
    >
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <p className="font-mono text-sm font-semibold text-foreground">{vault.addr}</p>
          <StatusChip status={vault.status} />
        </div>
        <p className="text-xs text-muted truncate">{vault.chain} · {vault.rule}</p>
        <p className="text-xs text-muted">{vault.balance}</p>
      </div>

      <div className="flex items-center gap-3 ml-4 shrink-0">
        <div className="text-right">
          <p className="text-xs text-muted mb-0.5">PnL</p>
          <span
            className={`flex items-center gap-1 text-sm font-bold ${
              vault.pnlUp ? "text-success" : "text-destructive"
            }`}
          >
            {vault.pnlUp ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {vault.pnl}
          </span>
        </div>
        <div className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </div>
      </div>
    </div>
  );
}

export function TopVaults() {
  const sorted = [...dashboardVaults].sort((a, b) => {
    if (a.pnlUp !== b.pnlUp) return a.pnlUp ? -1 : 1;
    const aVal = parseFloat(a.pnl.replace(/[^0-9.-]/g, ""));
    const bVal = parseFloat(b.pnl.replace(/[^0-9.-]/g, ""));
    return bVal - aVal;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          Top Vaults
        </h2>
      </div>
      <div className="space-y-3">
        {sorted.map((vault) => (
          <TopVaultRow key={vault.addr} vault={vault} />
        ))}
      </div>
    </div>
  );
}
