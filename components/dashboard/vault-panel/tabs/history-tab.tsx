"use client";

import { useVaultHistory } from "@/lib/api/hooks";
import type { HistoryItem } from "@/lib/api/types";
import { formatUnits } from "viem";
import { TOKEN_DATA } from "../constants";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, ExternalLink, RefreshCw, ShieldAlert, Check, Zap } from "lucide-react";

function getExplorerBase(chainId: number): string {
  if (chainId === 84532) return "https://sepolia.basescan.org";
  if (chainId === 8453) return "https://basescan.org";
  if (chainId === 1) return "https://etherscan.io";
  if (chainId === 11155111) return "https://sepolia.etherscan.io";
  if (chainId === 42161) return "https://arbiscan.io";
  return "https://etherscan.io";
}

const ADDR_TO_SYMBOL: Record<string, string> = {
  "0x0000000000000000000000000000000000000000": "ETH",
};
for (const [sym, data] of Object.entries(TOKEN_DATA)) {
  ADDR_TO_SYMBOL[data.address.toLowerCase()] = sym;
}
function tokenSymbol(addr: string): string {
  const a = addr?.toLowerCase() ?? "";
  return ADDR_TO_SYMBOL[a] ?? (a.startsWith("0x") ? a.slice(0, 6) + "…" : "—");
}
function fmtAmount(raw: string | number | bigint, decimals = 18): string {
  try {
    const n = parseFloat(formatUnits(BigInt(String(raw)), decimals));
    return n >= 1000 ? n.toLocaleString(undefined, { maximumFractionDigits: 2 }) : n.toPrecision(4);
  } catch {
    return "—";
  }
}

const EVENT_CONFIG: Record<string, { Icon: typeof Check; label: string; color: string; bg: string }> = {
  TokenDeposited: { Icon: ArrowDownToLine, label: "Deposit", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  TokenWithdrawn: { Icon: ArrowUpFromLine, label: "Withdraw", color: "text-amber-400", bg: "bg-amber-400/10" },
  SwapExecuted: { Icon: ArrowLeftRight, label: "Swap", color: "text-blue-400", bg: "bg-blue-400/10" },
  CrossChainShieldTriggered: { Icon: ShieldAlert, label: "Shield", color: "text-purple-400", bg: "bg-purple-400/10" },
  TokenRuleSet: { Icon: Check, label: "Rule", color: "text-primary", bg: "bg-primary/10" },
  VaultInitialized: { Icon: Check, label: "Init", color: "text-primary", bg: "bg-primary/10" },
};

function formatDetail(e: HistoryItem): string {
  const p = e.payload_json as Record<string, unknown>;

  if (e.event_type === "TokenDeposited" && p.token != null && (p.amount != null || p.amountIn != null)) {
    const sym = tokenSymbol(String(p.token));
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    const amt = p.amount ?? p.amountIn;
    return `${fmtAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "TokenWithdrawn" && p.token != null && (p.amount != null || p.amountOut != null)) {
    const sym = tokenSymbol(String(p.token));
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    const amt = p.amount ?? p.amountOut;
    return `${fmtAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "SwapExecuted" && (p.tokenIn != null || p.tokenOut != null)) {
    const symIn = tokenSymbol(String(p.tokenIn ?? ""));
    const symOut = tokenSymbol(String(p.tokenOut ?? ""));
    const decIn = TOKEN_DATA[symIn]?.decimals ?? 18;
    const decOut = TOKEN_DATA[symOut]?.decimals ?? 18;
    const amtIn = p.amountIn != null ? fmtAmount(String(p.amountIn), decIn) : "—";
    const amtOut = p.amountOut != null ? fmtAmount(String(p.amountOut), decOut) : "—";
    return `${amtIn} ${symIn} → ${amtOut} ${symOut}`;
  }
  if (e.event_type === "CrossChainShieldTriggered" && (p.amount != null || p.amountOut != null)) {
    const amt = p.amount ?? p.amountOut;
    const sym = p.token != null ? tokenSymbol(String(p.token)) : "CCIP";
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    return `${fmtAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "TokenRuleSet" && (p.buyThreshold != null || p.sellThreshold != null)) {
    return `Buy < $${p.buyThreshold ?? "—"} · Sell > $${p.sellThreshold ?? "—"}`;
  }
  if (e.event_type === "VaultInitialized") {
    return `Block #${e.block_number}`;
  }
  return "";
}

function EventRow({ item }: { item: HistoryItem }) {
  const cfg = EVENT_CONFIG[item.event_type] ?? { Icon: Zap, label: item.event_type, color: "text-muted", bg: "bg-muted/10" };
  const explorerBase = getExplorerBase(item.chain_id);
  const detail = formatDetail(item);

  return (
    <div className="flex items-center gap-3 px-1 py-2.5 border-b border-border/30 last:border-0">
      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}>
        <cfg.Icon className={`h-3.5 w-3.5 ${cfg.color}`} />
      </div>

      <div className="flex flex-1 flex-col min-w-0">
        <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
        {detail && <span className="text-[11px] text-muted truncate">{detail}</span>}
      </div>

      <a
        href={`${explorerBase}/tx/${item.tx_hash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground shrink-0"
      >
        {item.tx_hash.slice(0, 6)}…{item.tx_hash.slice(-4)}
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

interface HistoryTabProps {
  vaultAddress: `0x${string}`;
  chainId: number;
}

export function HistoryTab({ vaultAddress, chainId }: HistoryTabProps) {
  const { data, isLoading, error } = useVaultHistory(vaultAddress, { chain: chainId, limit: 50 });

  const items = data?.items ?? [];

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center gap-2 text-xs text-muted">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Loading history…
      </div>
    );
  }

  if (error) {
    const msg =
      error instanceof Error
        ? error.message
        : typeof error === "object" && "detail" in error
          ? String((error as { detail: unknown }).detail)
          : "Failed to load history";
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
        {msg}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border/60 text-xs text-muted">
        No events yet
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card-2/40 px-3 py-1">
      {items.map((item, i) => (
        <EventRow key={`${item.tx_hash}-${item.log_index}-${i}`} item={item} />
      ))}
    </div>
  );
}
