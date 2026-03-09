"use client";

import { useVaultHistory, type VaultTx } from "@/hooks/use-vault-history";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, ExternalLink, RefreshCw } from "lucide-react";

const BASE_SEPOLIA_EXPLORER = "https://sepolia.basescan.org";

const TYPE_CONFIG = {
  deposit: {
    Icon: ArrowDownToLine,
    label: "Deposit",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  withdraw: {
    Icon: ArrowUpFromLine,
    label: "Withdraw",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  swap: {
    Icon: ArrowLeftRight,
    label: "Swap",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
} as const;

function TxRow({ tx }: { tx: VaultTx }) {
  const cfg = TYPE_CONFIG[tx.type];

  let description = "";
  if (tx.type === "swap") {
    description = `${tx.amountIn} ${tx.tokenIn} → ${tx.amountOut} ${tx.tokenOut}`;
  } else {
    description = `${tx.amount} ${tx.token}`;
  }

  const shortHash = tx.hash ? `${tx.hash.slice(0, 6)}…${tx.hash.slice(-4)}` : "—";

  return (
    <div className="flex items-center gap-3 px-1 py-2.5 border-b border-border/30 last:border-0">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}>
        <cfg.Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
        <span className="text-[11px] text-muted truncate">{description}</span>
      </div>

      {tx.hash && (
        <a
          href={`${BASE_SEPOLIA_EXPLORER}/tx/${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground shrink-0"
        >
          {shortHash}
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

interface HistoryTabProps {
  vaultAddress: `0x${string}`;
}

export function HistoryTab({ vaultAddress }: HistoryTabProps) {
  const { txs, isLoading, error } = useVaultHistory(vaultAddress);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-xs text-muted">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Loading history…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
        {error}
      </div>
    );
  }

  if (txs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border/60 text-xs text-muted">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card-2/40 px-3 py-1">
      {txs.map((tx) => (
        <TxRow key={`${tx.hash}-${tx.type}`} tx={tx} />
      ))}
    </div>
  );
}
