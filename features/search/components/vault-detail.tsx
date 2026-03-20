"use client";

import { getChainName } from "@/lib/api/constants";
import type { VaultDetail as ApiVaultDetail, HistoryItem } from "@/lib/api/types";
import { TOKEN_DATA } from "@/lib/constants/tokens";
import { formatAmount, formatTimestamp, getExplorerBase, shortAddress } from "@/lib/utils";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpFromLine,
  CalendarDays,
  Check,
  Clock,
  Copy,
  ExternalLink,
  RefreshCw,
  Settings2,
  ShieldAlert,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Event label helpers ──────────────────────────────────────────────────────
const EVENT_LABELS: Record<string, string> = {
  SwapExecuted: "Token Swap",
  TokenRuleSet: "Trading Rule Updated",
  VaultInitialized: "Vault Created",
  TokenDeposited: "Token Deposited",
  TokenWithdrawn: "Token Withdrawn",
  ShieldTriggered: "Protection Alert",
};

function getEventLabel(t: string): string {
  return EVENT_LABELS[t] ?? t.replace(/([A-Z])/g, " $1").trim();
}

const ADDR_TO_DECIMALS: Record<string, number> = {};
const SYM_TO_DECIMALS: Record<string, number> = {};
for (const [sym, data] of Object.entries(TOKEN_DATA)) {
  ADDR_TO_DECIMALS[data.address.toLowerCase()] = data.decimals;
  SYM_TO_DECIMALS[sym.toUpperCase()] = data.decimals;
}
/** Resolve decimals from a token address OR symbol string; defaults to 18. */
function tokenDecimals(identifier: string): number {
  if (!identifier) return 18;
  const lower = identifier.toLowerCase();
  return ADDR_TO_DECIMALS[lower] ?? SYM_TO_DECIMALS[identifier.toUpperCase()] ?? 18;
}

// ─── formatEventDetail ────────────────────────────────────────────────────────
function formatEventDetail(e: HistoryItem): string {
  const p = (e.payload_json ?? {}) as Record<string, unknown>;

  switch (e.event_type) {
    case "TokenRuleSet": {
      const buy = p.buyThreshold ?? p.buy_threshold;
      const sell = p.sellThreshold ?? p.sell_threshold;
      if (buy != null || sell != null) {
        return `Buy below $${buy ?? "—"} · Sell above $${sell ?? "—"}`;
      }
      return "";
    }
    case "SwapExecuted": {
      const amtIn = p.amountIn as string | undefined;
      const amtOut = p.amountOut as string | undefined;
      const tokenIn = (p.tokenIn as string | undefined) ?? "";
      const tokenOut = (p.tokenOut as string | undefined) ?? "";
      if (amtIn != null && amtOut != null) {
        return `${formatAmount(amtIn, tokenDecimals(tokenIn))} ${tokenIn} → ${formatAmount(amtOut, tokenDecimals(tokenOut))} ${tokenOut}`.trim();
      }
      if (amtIn != null) return `${formatAmount(amtIn, tokenDecimals(tokenIn))} ${tokenIn}`.trim();
      if (amtOut != null)
        return `${formatAmount(amtOut, tokenDecimals(tokenOut))} ${tokenOut}`.trim();
      return "";
    }
    case "VaultInitialized":
      return `Block #${e.block_number}`;
    case "TokenDeposited": {
      const amt = p.amount as string | undefined;
      const token = (p.token as string | undefined) ?? "";
      return amt != null ? `${formatAmount(amt, tokenDecimals(token))} ${token}`.trim() : "";
    }
    case "TokenWithdrawn": {
      const amt = p.amount as string | undefined;
      const token = (p.token as string | undefined) ?? "";
      return amt != null ? `${formatAmount(amt, tokenDecimals(token))} ${token}`.trim() : "";
    }
    case "ShieldTriggered": {
      const reason = p.reason as string | undefined;
      return reason ?? "";
    }
    default: {
      const keys = Object.keys(p);
      if (keys.length === 0) return `Block #${e.block_number}`;
      // Show at most 2 key-value pairs in plain text
      const pairs = keys.slice(0, 2).map((k) => {
        const v = p[k];
        const label = k
          .replace(/([A-Z])/g, " $1")
          .replace(/_/g, " ")
          .trim();
        return `${label}: ${String(v)}`;
      });
      return pairs.join(" · ");
    }
  }
}

// ─── Pure time helpers (called from JSX, not component body) ─────────────────
function isRecentlyActive(ts: string | null): boolean {
  if (!ts) return false;
  return Date.now() - new Date(ts).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function computeActivityLevel(eventCount: number, createdTimestamp: string | null): string {
  if (!createdTimestamp) return "New vault";
  const ageDays = (Date.now() - new Date(createdTimestamp).getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays <= 0) return "New vault";
  const rate = eventCount / ageDays;
  if (rate >= 5) return "Very active";
  if (rate >= 1) return "Active daily";
  if (rate >= 0.2) return "Weekly activity";
  return "Occasional activity";
}

// ─── timeAgo helper ───────────────────────────────────────────────────────────
function timeAgo(ts: string | null): string {
  if (!ts) return "—";
  const diff = Date.now() - new Date(ts).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

// ─── ActivityBar ─────────────────────────────────────────────────────────────
function ActivityBar({ vault }: { vault: ApiVaultDetail }) {
  const chainName = getChainName(vault.chain_id);

  return (
    <div className="border-border/60 bg-card/60 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border px-4 py-2.5">
      <span className="text-muted flex items-center gap-1.5 text-xs">
        <TrendingUp className="h-3 w-3" />
        {chainName}
      </span>
      <span className="text-border hidden sm:inline">·</span>
      <span className="text-muted flex items-center gap-1.5 text-xs">
        <Activity className="h-3 w-3" />
        {vault.event_count} event{vault.event_count !== 1 ? "s" : ""}
      </span>
      {vault.latest_event_timestamp && (
        <>
          <span className="text-border hidden sm:inline">·</span>
          <span
            className="text-muted flex items-center gap-1.5 text-xs"
            title={formatTimestamp(vault.latest_event_timestamp)}
          >
            <Clock className="h-3 w-3" />
            {timeAgo(vault.latest_event_timestamp)}
          </span>
        </>
      )}
      <span className="text-border hidden sm:inline">·</span>
      {isRecentlyActive(vault.latest_event_timestamp) ? (
        <span className="text-success flex items-center gap-1 text-xs font-medium">
          <span className="bg-success inline-block h-1.5 w-1.5 rounded-full" />
          Active
        </span>
      ) : (
        <span className="text-muted flex items-center gap-1 text-xs font-medium">
          <span className="bg-muted inline-block h-1.5 w-1.5 rounded-full" />
          Inactive
        </span>
      )}
    </div>
  );
}

// ─── Column 1: Vault Info ────────────────────────────────────────────────────
function VaultInfoCol({ vault }: { vault: ApiVaultDetail }) {
  const [copied, setCopied] = useState(false);
  const chainName = getChainName(vault.chain_id);

  function copyAddress(address: string) {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const explorerTx = vault.created_tx_hash
    ? `${getExplorerBase(vault.chain_id)}/tx/${vault.created_tx_hash}`
    : null;

  return (
    <div className="space-y-3">
      <p className="text-muted mb-3 text-[10px] font-bold tracking-wider uppercase">Vault Info</p>

      <div className="border-border/50 bg-card-2/40 space-y-3 rounded-xl border p-3">
        <div>
          <p className="text-muted mb-1 text-[10px]">Address</p>
          <div className="flex items-center gap-2">
            <p className="text-foreground font-mono text-xs font-semibold break-all">
              {shortAddress(vault.address)}
            </p>
            <button
              onClick={() => copyAddress(vault.address)}
              className="text-muted hover:text-foreground shrink-0 transition-colors"
            >
              {copied ? <Check className="text-success h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-muted mb-1 text-[10px]">Owner</p>
          <div className="flex items-center gap-2">
            <p className="text-foreground font-mono text-xs font-medium break-all">
              {shortAddress(vault.owner ?? "")}
            </p>
            <button
              onClick={() => copyAddress(vault?.owner ?? "")}
              className="text-muted hover:text-foreground shrink-0 transition-colors"
            >
              {copied ? <Check className="text-success h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-muted mb-1 text-[10px]">Chain</p>
            <p className="text-foreground text-xs font-medium">{chainName}</p>
          </div>
          <div>
            <p className="text-muted mb-1 text-[10px]">Events</p>
            <p className="text-foreground text-xs font-medium">{vault.event_count}</p>
          </div>
        </div>

        <div>
          <p className="text-muted mb-1 text-[10px]">Created</p>
          <p
            className="text-foreground text-xs font-medium"
            title={formatTimestamp(vault.created_timestamp)}
          >
            {timeAgo(vault.created_timestamp)}
          </p>
          {explorerTx && (
            <a
              href={explorerTx}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-1 inline-flex items-center gap-1 text-[10px] hover:underline"
            >
              View tx <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {vault.latest_event_timestamp && (
          <div>
            <p className="text-muted mb-1 text-[10px]">Last Event</p>
            <p
              className="text-foreground text-xs font-medium"
              title={formatTimestamp(vault.latest_event_timestamp)}
            >
              {timeAgo(vault.latest_event_timestamp)}
              {vault.latest_event_block != null && (
                <>
                  {" "}
                  · <span className="text-muted/70">Block #{vault.latest_event_block}</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Column 2: Contract Info ───────────────────────────────────────────────────
function ContractInfoCol({ vault }: { vault: ApiVaultDetail }) {
  const chainName = getChainName(vault.chain_id);
  const explorerBase = getExplorerBase(vault.chain_id);

  return (
    <div className="space-y-3">
      <p className="text-muted mb-3 text-[10px] font-bold tracking-wider uppercase">Contract</p>

      <div className="border-border/50 bg-card-2/40 space-y-3 rounded-xl border p-3">
        {vault.created_timestamp && (
          <div className="flex items-center gap-2">
            <CalendarDays className="text-muted h-3.5 w-3.5 shrink-0" />
            <div>
              <p className="text-muted text-[10px]">Vault age</p>
              <p className="text-foreground text-xs font-medium">
                Created {timeAgo(vault.created_timestamp)}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Activity className="text-muted h-3.5 w-3.5 shrink-0" />
          <div>
            <p className="text-muted text-[10px]">Activity level</p>
            <p className="text-foreground text-xs font-medium">
              {computeActivityLevel(vault.event_count, vault.created_timestamp)}
            </p>
          </div>
        </div>

        <a
          href={`${explorerBase}/address/${vault.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
        >
          View on Explorer <ExternalLink className="h-3 w-3" />
        </a>
        <p className="text-muted text-[10px]">
          {chainName} · Chain ID {vault.chain_id}
        </p>
      </div>
    </div>
  );
}

// ─── Column 3: History ───────────────────────────────────────────────────────
const EVENT_ICONS: Record<string, React.ReactNode> = {
  SwapExecuted: <RefreshCw className="h-3 w-3" />,
  TokenRuleSet: <Settings2 className="h-3 w-3" />,
  VaultInitialized: <Zap className="h-3 w-3" />,
  TokenDeposited: <ArrowDownToLine className="h-3 w-3" />,
  TokenWithdrawn: <ArrowUpFromLine className="h-3 w-3" />,
  ShieldTriggered: <ShieldAlert className="h-3 w-3" />,
};

const EVENT_COLORS: Record<string, string> = {
  SwapExecuted: "text-success",
  TokenRuleSet: "text-primary",
  VaultInitialized: "text-primary",
  TokenDeposited: "text-success",
  TokenWithdrawn: "text-warning",
  ShieldTriggered: "text-danger",
};

const EVENT_BORDER: Record<string, string> = {
  SwapExecuted: "border-l-2 border-l-success/60",
  TokenRuleSet: "border-l-2 border-l-primary/60",
  VaultInitialized: "border-l-2 border-l-primary/60",
  TokenDeposited: "border-l-2 border-l-success/60",
  TokenWithdrawn: "border-l-2 border-l-warning/60",
  ShieldTriggered: "border-l-2 border-l-danger/60",
};

function HistoryCol({ items }: { items: HistoryItem[] }) {
  return (
    <div className="space-y-3">
      <p className="text-muted mb-3 text-[10px] font-bold tracking-wider uppercase">
        Event History
      </p>

      <div className="border-border/50 bg-card-2/40 overflow-hidden rounded-xl border">
        {items.length === 0 ? (
          <div className="text-muted px-3 py-6 text-center text-xs">No events yet</div>
        ) : (
          items.map((e, i) => (
            <div
              key={`${e.tx_hash}-${e.log_index}-${i}`}
              className={`border-border/30 hover:bg-card-2/60 flex items-start gap-3 border-b px-3 py-3 transition-colors last:border-0 ${EVENT_BORDER[e.event_type] ?? ""}`}
            >
              <div
                className={`bg-card mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  EVENT_COLORS[e.event_type] ?? "text-muted"
                }`}
              >
                {EVENT_ICONS[e.event_type] ?? <Clock className="h-3 w-3" />}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs font-semibold ${EVENT_COLORS[e.event_type] ?? "text-muted"}`}
                >
                  {getEventLabel(e.event_type)}
                </p>
                <p className="text-muted mt-0.5 text-[10px] leading-relaxed">
                  {formatEventDetail(e)}
                </p>
                <Link
                  href={`${getExplorerBase(e.chain_id)}/tx/${e.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-1 inline-block text-[10px] hover:underline"
                >
                  {shortAddress(e.tx_hash)}
                </Link>
              </div>
              <span
                className="text-muted shrink-0 text-[10px]"
                title={formatTimestamp(e.timestamp)}
              >
                {timeAgo(e.timestamp)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Main VaultDetail ────────────────────────────────────────────────────────
export interface VaultDetailProps {
  vault: ApiVaultDetail;
  history: HistoryItem[];
  onBack: () => void;
}

export function VaultDetail({ vault, history, onBack }: VaultDetailProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mt-6 space-y-4 duration-300 md:mt-10">
      <button
        onClick={onBack}
        className="text-muted hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Top Vaults
      </button>

      <ActivityBar vault={vault} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <VaultInfoCol vault={vault} />
        <ContractInfoCol vault={vault} />
        <HistoryCol items={history} />
      </div>
    </div>
  );
}
