"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Copy,
  Power,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  ShieldAlert,
} from "lucide-react";
import type { VaultItem } from "@/lib/types/dashboard";
import { StatusChip } from "@/components/ui/status-chip";

function parsePrices(rule: string) {
  const buyMatch = rule.match(/Buy\s*[<>]\s*\$([0-9,]+)/);
  const sellMatch = rule.match(/Sell\s*[<>]\s*\$([0-9,]+)/);
  return {
    buy: buyMatch ? buyMatch[1].replace(/,/g, "") : "",
    sell: sellMatch ? sellMatch[1].replace(/,/g, "") : "",
  };
}

function parseTokens(balance: string) {
  return balance.split(" / ").map((part) => {
    const trimmed = part.trim();
    const lastSpace = trimmed.lastIndexOf(" ");
    return { amount: trimmed.slice(0, lastSpace), symbol: trimmed.slice(lastSpace + 1) };
  });
}

const MOCK_HISTORY = [
  { type: "SwapExecuted", time: "2m ago", color: "bg-success", textColor: "text-success", detail: "Bought 0.12 WETH @ $1,892" },
  { type: "RuleEvaluated", time: "15m ago", color: "bg-primary", textColor: "text-primary", detail: "Condition not met, holding" },
  { type: "ShieldTriggered", time: "3h ago", color: "bg-warning", textColor: "text-warning", detail: "Slippage protection active" },
  { type: "SwapExecuted", time: "5h ago", color: "bg-success", textColor: "text-success", detail: "Sold 0.08 WETH @ $2,381" },
  { type: "RuleEvaluated", time: "8h ago", color: "bg-primary", textColor: "text-primary", detail: "Condition met, executing" },
];

// ─── Column 1: Vault Info ────────────────────────────────────────────────────
function VaultInfoCol({ vault }: { vault: VaultItem }) {
  const [copied, setCopied] = useState(false);
  const tokens = parseTokens(vault.balance);

  function copyAddress() {
    navigator.clipboard.writeText(vault.addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">Vault Info</p>

      {/* Address */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        <div>
          <p className="text-[10px] text-muted mb-1">Address</p>
          <div className="flex items-center gap-1.5">
            <p className="font-mono text-xs font-semibold text-foreground">{vault.addr}</p>
            <button onClick={copyAddress} className="text-muted hover:text-foreground transition-colors">
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] text-muted mb-1">Status</p>
            <StatusChip status={vault.status} />
          </div>
          <div>
            <p className="text-[10px] text-muted mb-1">Chain</p>
            <p className="text-xs font-medium text-foreground">{vault.chain}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-muted mb-1">Last Execution</p>
          <p className="text-xs font-medium text-foreground">{vault.lastExecution}</p>
        </div>
      </div>

      {/* PnL */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3">
        <p className="text-[10px] text-muted mb-1.5">PnL</p>
        <span className={`flex items-center gap-1.5 text-lg font-bold ${vault.pnlUp ? "text-success" : "text-destructive"}`}>
          {vault.pnlUp ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {vault.pnl}
        </span>
      </div>

      {/* Holdings */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3">
        <p className="text-[10px] text-muted mb-2">Holdings</p>
        <div className="space-y-2">
          {tokens.map(({ amount, symbol }) => (
            <div key={symbol} className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">{symbol}</span>
              <span className="text-xs text-muted font-mono">{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Column 2: Settings ──────────────────────────────────────────────────────
function SettingsCol({ vault }: { vault: VaultItem }) {
  const initial = parsePrices(vault.rule);
  const [buyPrice, setBuyPrice] = useState(initial.buy);
  const [sellPrice, setSellPrice] = useState(initial.sell);
  const [active, setActive] = useState(vault.status === "active");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">Settings</p>

      {/* Price Rules */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        <p className="text-xs font-semibold text-foreground">Price Rules</p>
        <div>
          <label className="text-[10px] text-muted">Buy below ($)</label>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="e.g. 1900"
            className="mt-1 w-full rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs font-medium text-foreground outline-none focus:border-success/50 focus:ring-1 focus:ring-success/20"
          />
        </div>
        <div>
          <label className="text-[10px] text-muted">Sell above ($)</label>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            placeholder="e.g. 2350"
            className="mt-1 w-full rounded-lg border border-border/60 bg-card px-2.5 py-1.5 text-xs font-medium text-foreground outline-none focus:border-destructive/50 focus:ring-1 focus:ring-destructive/20"
          />
        </div>
        <button
          onClick={handleSave}
          className="w-full rounded-lg bg-primary/10 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          {saved ? "Saved ✓" : "Save Rules"}
        </button>
      </div>

      {/* Vault Status */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-2">
        <p className="text-xs font-semibold text-foreground">Vault Status</p>
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${active ? "text-success" : "text-muted"}`}>
            {active ? "Active" : "Paused"}
          </span>
          <button
            onClick={() => setActive((v) => !v)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
              active
                ? "border-success/40 text-success hover:bg-success/10"
                : "border-border/60 text-muted hover:border-success/40 hover:text-success"
            }`}
          >
            <Power className="h-3 w-3" />
            {active ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      {/* Rule summary */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3">
        <p className="text-[10px] text-muted mb-1.5">Current Rule</p>
        <p className="text-xs text-foreground font-medium">{vault.rule}</p>
      </div>
    </div>
  );
}

// ─── Column 3: History ───────────────────────────────────────────────────────
function HistoryCol() {
  const icons: Record<string, React.ReactNode> = {
    SwapExecuted: <Zap className="h-3 w-3" />,
    RuleEvaluated: <Check className="h-3 w-3" />,
    ShieldTriggered: <ShieldAlert className="h-3 w-3" />,
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">History</p>

      <div className="rounded-xl border border-border/50 bg-card-2/40 overflow-hidden">
        {MOCK_HISTORY.map((e, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-3 py-3 border-b border-border/30 last:border-0"
          >
            <div className={`mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-card ${e.textColor}`}>
              {icons[e.type] ?? <Clock className="h-3 w-3" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold ${e.textColor}`}>{e.type}</p>
              <p className="text-[10px] text-muted leading-relaxed mt-0.5">{e.detail}</p>
            </div>
            <span className="text-[10px] text-muted shrink-0">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main VaultDetail ────────────────────────────────────────────────────────
export function VaultDetail({ vault, onBack }: { vault: VaultItem; onBack: () => void }) {
  return (
    <div className="mt-10 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Top Vaults
      </button>

      {/* 3-column grid */}
      <div className="grid grid-cols-3 gap-4">
        <VaultInfoCol vault={vault} />
        <SettingsCol vault={vault} />
        <HistoryCol />
      </div>
    </div>
  );
}
