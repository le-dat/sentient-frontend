"use client";

import { useState } from "react";
import { X, Copy, Check, Power, Terminal, Clock, Settings2, Plus } from "lucide-react";
import { StatusChip } from "@/components/ui/status-chip";
import type { VaultItem } from "@/lib/types/dashboard";

type Tab = "console" | "history" | "config";

function parseTokens(balance: string) {
  return balance.split(" / ").map((part) => {
    const trimmed = part.trim();
    const lastSpace = trimmed.lastIndexOf(" ");
    return { amount: trimmed.slice(0, lastSpace), symbol: trimmed.slice(lastSpace + 1) };
  });
}

function parsePrices(rule: string) {
  const buyMatch = rule.match(/Buy\s*[<>]\s*\$([0-9,]+)/);
  const sellMatch = rule.match(/Sell\s*[<>]\s*\$([0-9,]+)/);
  return {
    buy: buyMatch ? buyMatch[1].replace(/,/g, "") : "",
    sell: sellMatch ? sellMatch[1].replace(/,/g, "") : "",
  };
}

export function VaultPanel({ vault, onClose }: { vault: VaultItem; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("console");
  const initial = parsePrices(vault.rule);
  const [buyPrice, setBuyPrice] = useState(initial.buy);
  const [sellPrice, setSellPrice] = useState(initial.sell);
  const [active, setActive] = useState(vault.status === "active");
  const [copied, setCopied] = useState(false);

  const tokens = parseTokens(vault.balance);

  function copyAddress() {
    navigator.clipboard.writeText(vault.addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="flex h-full w-full max-w-[460px] flex-col border-l border-border/60 bg-card/95 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base font-bold">{vault.addr}</p>
              {/* Copy address */}
              <button
                onClick={copyAddress}
                title="Copy address"
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-success" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${active ? "text-success" : "text-muted"}`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {active && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  )}
                  <span
                    className={`relative h-1.5 w-1.5 rounded-full ${active ? "bg-success" : "bg-muted"}`}
                  />
                </span>
                {active ? "ACTIVE" : "INACTIVE"}
              </span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{vault.chain}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {/* Toggle active */}
            <button
              onClick={() => setActive((v) => !v)}
              title={active ? "Deactivate" : "Activate"}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${active ? "border-success/40 text-success hover:bg-success/10" : "border-border/60 text-muted hover:border-success/40 hover:text-success"}`}
            >
              <Power className="h-3.5 w-3.5" />
            </button>
            {/* Close */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted transition-colors hover:border-border hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/50 px-5">
          {(["console", "history", "config"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-1 pb-2.5 pt-1 text-xs font-medium capitalize transition-colors mr-5 border-b-2 -mb-px ${
                tab === t
                  ? "border-red-500 text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              {t === "console" && <Terminal className="h-3 w-3" />}
              {t === "history" && <Clock className="h-3 w-3" />}
              {t === "config" && <Settings2 className="h-3 w-3" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {tab === "console" && (
            <>
              {/* Vault Status */}
              <div className="rounded-xl border border-border/60 bg-card-2/40 p-4">
                <p className="mb-3 text-xs font-semibold text-foreground">Vault Status</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                  <div>
                    <p className="text-muted">PnL</p>
                    <p
                      className={`mt-0.5 font-bold ${vault.pnlUp ? "text-success" : "text-danger"}`}
                    >
                      {vault.pnlUp ? "▲" : "▼"} {vault.pnl}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted">Last execution</p>
                    <p className="mt-0.5 font-medium text-foreground">{vault.lastExecution}</p>
                  </div>
                  <div>
                    <p className="text-muted">Status</p>
                    <StatusChip status={active ? "active" : "paused"} />
                  </div>
                </div>
              </div>

              {/* Token Holdings */}
              <div className="rounded-xl border border-border/60 bg-card-2/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-semibold text-foreground">Token Holdings</p>
                  <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
                    <Plus className="h-3 w-3" />
                    Deposit
                  </button>
                </div>
                <div className="space-y-2">
                  {tokens.map(({ amount, symbol }) => (
                    <div key={symbol} className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground">{symbol}</span>
                      <span className="text-muted">{amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {tab === "history" && (
            <div className="rounded-xl border border-border/60 bg-card-2/40 p-4 space-y-3">
              {[
                {
                  type: "SwapExecuted",
                  time: "2m ago",
                  color: "bg-success",
                  textColor: "text-success",
                },
                {
                  type: "RuleEvaluated",
                  time: "15m ago",
                  color: "bg-primary",
                  textColor: "text-primary",
                },
                {
                  type: "ShieldTriggered",
                  time: "3h ago",
                  color: "bg-warning",
                  textColor: "text-warning",
                },
              ].map((e, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className={`h-1.5 w-1.5 rounded-full ${e.color} shrink-0`} />
                  <span className={`text-xs font-semibold ${e.textColor}`}>{e.type}</span>
                  <span className="ml-auto text-xs text-muted">{e.time}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "config" && (
            <div className="space-y-4">
              {/* Buy / Sell price settings */}
              <div className="rounded-xl border border-border/60 bg-card-2/40 p-4">
                <p className="mb-3 text-xs font-semibold text-foreground">Price Rules</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted">Buy below ($)</label>
                    <input
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="e.g. 1900"
                      className="mt-1 w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-success/50 focus:ring-1 focus:ring-success/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted">Sell above ($)</label>
                    <input
                      type="number"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      placeholder="e.g. 2350"
                      className="mt-1 w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-danger/50 focus:ring-1 focus:ring-danger/20"
                    />
                  </div>
                  <button className="w-full rounded-xl bg-primary/10 py-2 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Save Rules
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
