"use client";

import { useState } from "react";
import { useVaultHistory } from "@/lib/api/hooks";
import type { HistoryItem } from "@/lib/api/types";
import { zeroAddress } from "viem";
import { TOKEN_DATA } from "../constants";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, ExternalLink, RefreshCw, ShieldAlert, Check, Zap } from "lucide-react";
import { getExplorerBase, formatAmount } from "@/lib/utils";

const EVENT_TYPE_FILTERS: { value: string; label: string }[] = [
  { value: "", label: "All" },
  { value: "TokenRuleSet", label: "Rule" },
  { value: "TokenDeposited", label: "Deposit" },
  { value: "TokenWithdrawn", label: "Withdraw" },
  { value: "SwapExecuted", label: "Swap" },
  { value: "CrossChainShieldTriggered", label: "Shield" },
  { value: "VaultInitialized", label: "Init" },
];

const ADDR_TO_SYMBOL: Record<string, string> = {
  [zeroAddress]: "ETH",
};
for (const [sym, data] of Object.entries(TOKEN_DATA)) {
  ADDR_TO_SYMBOL[data.address.toLowerCase()] = sym;
}
function tokenSymbol(addr: string): string {
  const a = addr?.toLowerCase() ?? "";
  return ADDR_TO_SYMBOL[a] ?? (a.startsWith("0x") ? a.slice(0, 6) + "…" : "—");
}

const EVENT_CONFIG: Record<string, { Icon: typeof Check; label: string; color: string; bg: string }> = {
  TokenDeposited:             { Icon: ArrowDownToLine, label: "Deposit", color: "text-success",  bg: "bg-success/10"  },
  TokenWithdrawn:             { Icon: ArrowUpFromLine, label: "Withdraw", color: "text-warning", bg: "bg-warning/10" },
  SwapExecuted:               { Icon: ArrowLeftRight,  label: "Swap",    color: "text-blue-400", bg: "bg-blue-400/10" },
  CrossChainShieldTriggered:  { Icon: ShieldAlert,     label: "Shield",  color: "text-primary",  bg: "bg-primary/10"  },
  TokenRuleSet:               { Icon: Check,           label: "Rule",    color: "text-primary",  bg: "bg-primary/10"  },
  VaultInitialized:           { Icon: Check,           label: "Init",    color: "text-primary",  bg: "bg-primary/10"  },
};

function formatDetail(e: HistoryItem): string {
  const p = e.payload_json as Record<string, unknown>;

  if (e.event_type === "TokenDeposited" && p.token != null && (p.amount != null || p.amountIn != null)) {
    const sym = tokenSymbol(String(p.token));
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    const amt = p.amount ?? p.amountIn;
    return `${formatAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "TokenWithdrawn" && p.token != null && (p.amount != null || p.amountOut != null)) {
    const sym = tokenSymbol(String(p.token));
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    const amt = p.amount ?? p.amountOut;
    return `${formatAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "SwapExecuted" && (p.tokenIn != null || p.tokenOut != null)) {
    const symIn = tokenSymbol(String(p.tokenIn ?? ""));
    const symOut = tokenSymbol(String(p.tokenOut ?? ""));
    const decIn = TOKEN_DATA[symIn]?.decimals ?? 18;
    const decOut = TOKEN_DATA[symOut]?.decimals ?? 18;
    const amtIn  = p.amountIn  != null ? formatAmount(String(p.amountIn),  decIn)  : "—";
    const amtOut = p.amountOut != null ? formatAmount(String(p.amountOut), decOut) : "—";
    return `${amtIn} ${symIn} → ${amtOut} ${symOut}`;
  }
  if (e.event_type === "CrossChainShieldTriggered" && (p.amount != null || p.amountOut != null)) {
    const amt = p.amount ?? p.amountOut;
    const sym = p.token != null ? tokenSymbol(String(p.token)) : "CCIP";
    const dec = TOKEN_DATA[sym]?.decimals ?? 18;
    return `${formatAmount(String(amt), dec)} ${sym}`;
  }
  if (e.event_type === "TokenRuleSet") {
    const tokenSym = p.token != null ? tokenSymbol(String(p.token)) : "—";
    const buyRaw = p.buyThreshold != null ? Number(p.buyThreshold) / 1e18 : null;
    const sellRaw = p.sellThreshold != null ? Number(p.sellThreshold) / 1e18 : null;
    const enabled = p.enabled != null ? (p.enabled ? "on" : "off") : null;
    const parts: string[] = [tokenSym];
    if (enabled) parts.push(enabled);
    if (buyRaw != null && buyRaw > 0) parts.push(`Buy < $${buyRaw.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
    if (sellRaw != null && sellRaw > 0) parts.push(`Sell > $${sellRaw.toLocaleString(undefined, { maximumFractionDigits: 0 })}`);
    return parts.join(" · ");
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
  const [eventType, setEventType] = useState("");
  const { data, isLoading, error } = useVaultHistory(vaultAddress, {
    chain: chainId,
    limit: 50,
    type: eventType || undefined,
  });

  const items = data?.items ?? [];
  const emptyLabel =
    eventType === "TokenRuleSet"
      ? "No rule changes yet. Set token rules in Config tab."
      : "No events yet";

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

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="text-[10px] text-muted shrink-0">Filter:</label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="rounded-lg border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary/50"
        >
          {EVENT_TYPE_FILTERS.map((f) => (
            <option key={f.value || "all"} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {items.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border/60 text-xs text-muted text-center px-4">
          {emptyLabel}
        </div>
      ) : (
        <div className="rounded-xl border border-border/60 bg-card-2/40 px-3 py-1">
          {items.map((item, i) => (
            <EventRow key={`${item.tx_hash}-${item.log_index}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
