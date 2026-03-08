"use client";

import type { VaultItem } from "@/lib/types/dashboard";
import { Check, Clock, Copy, Plus, Power, Settings2, Terminal, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const TOKEN_DATA: Record<string, { name: string; icon: string }> = {
  USDC: {
    name: "USD Coin",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  USDT: {
    name: "Tether",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
  },
  DAI: {
    name: "Dai",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
  },
  WETH: {
    name: "Wrapped Ethereum",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
  },
  ETH: {
    name: "Ethereum",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/info/logo.png",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    icon: "https://assets.trustwalletapp.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2E597/logo.png",
  },
  BTC: {
    name: "Bitcoin",
    icon: "https://assets.trustwalletapp.com/blockchains/bitcoin/info/logo.png",
  },
  SOL: {
    name: "Solana",
    icon: "https://assets.trustwalletapp.com/blockchains/solana/info/logo.png",
  },
  BNB: { name: "BNB", icon: "https://assets.trustwalletapp.com/blockchains/binance/info/logo.png" },
  XRP: { name: "XRP", icon: "https://assets.trustwalletapp.com/blockchains/ripple/info/logo.png" },
};

const STABLE_COINS = [{ symbol: "USDC" }, { symbol: "USDT" }, { symbol: "DAI" }];

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

  // Merge vault tokens + stablecoins (dedup by symbol)
  const vaultSymbols = new Set(tokens.map((t) => t.symbol));
  const extraStables = STABLE_COINS.filter((s) => !vaultSymbols.has(s.symbol));
  const allTokens = [...tokens.map((t) => t.symbol), ...extraStables.map((s) => s.symbol)];

  const [defaultToken, setDefaultToken] = useState<string>(
    tokens[0]?.symbol ?? STABLE_COINS[0].symbol,
  );
  const [defaultTokenSource, setDefaultTokenSource] = useState<"system" | "holdings">("system");

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
      <div className="flex h-full w-full max-w-none flex-col bg-card/95 backdrop-blur-xl md:max-w-[460px] md:border-l md:border-border/60">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="break-all text-sm font-bold md:text-base">{vault.addr}</p>
              {/* Copy address */}
              <button
                onClick={copyAddress}
                title="Copy address"
                className="flex h-6 w-6 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
              >
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
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
              {vault.owner && (
                <>
                  <span className="text-xs text-muted">·</span>
                  <span className="text-xs text-muted font-mono" title={vault.owner}>
                    Owner {vault.owner.length > 14 ? `${vault.owner.slice(0, 6)}...${vault.owner.slice(-4)}` : vault.owner}
                  </span>
                </>
              )}
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
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">Select token swap default</p>
                <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
                  <Plus className="h-3 w-3" />
                  Deposit
                </button>
              </div>

              {/* Default Swap Token */}
              <div className="overflow-hidden rounded-xl border border-border/60 bg-card-2/40">
                <div className="border-b border-border/60 px-4 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    System
                  </p>
                </div>
                <div className="flex flex-col">
                  {allTokens.map((symbol) => {
                    const isVaultToken = vaultSymbols.has(symbol);
                    const isSelected = defaultToken === symbol && defaultTokenSource === "system";
                    const info = TOKEN_DATA[symbol] || { name: symbol, icon: "" };
                    return (
                      <button
                        key={symbol}
                        onClick={() => { setDefaultToken(symbol); setDefaultTokenSource("system"); }}
                        className={`flex w-full items-center gap-3 border-b border-border/30 px-4 py-3 last:border-0 transition-all ${
                          isSelected
                            ? "border-l-2 border-l-primary bg-primary/10"
                            : "opacity-40 hover:opacity-70 hover:bg-white/5"
                        }`}
                      >
                        <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-1.5 overflow-hidden transition-colors ${isSelected ? "bg-primary/20 ring-1 ring-primary/40" : "bg-white/5"}`}>
                          {info.icon ? (
                            <Image
                              src={info.icon}
                              alt={symbol}
                              width={36}
                              height={36}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-primary/20" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col items-start gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-[14px] font-bold ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                              {info.name}
                            </span>
                            <span className="text-xs font-medium text-muted">{symbol}</span>
                            {isVaultToken && (
                              <span className="rounded-[4px] bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-primary">
                                vault
                              </span>
                            )}
                          </div>
                        </div>
                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Token Holdings */}
              <div className="overflow-hidden rounded-xl border border-border/60 bg-card-2/40">
                <div className="border-b border-border/60 px-4 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Token Holdings
                  </p>
                </div>
                <div className="flex flex-col">
                  {tokens.map(({ amount, symbol }) => {
                    const info = TOKEN_DATA[symbol] || { name: symbol, icon: "" };
                    const isSelected = defaultToken === symbol && defaultTokenSource === "holdings";
                    return (
                      <button
                        key={symbol}
                        onClick={() => { setDefaultToken(symbol); setDefaultTokenSource("holdings"); }}
                        className={`flex w-full items-center gap-3 border-b border-border/30 px-4 py-3 last:border-0 transition-all ${
                          isSelected
                            ? "border-l-2 border-l-primary bg-primary/10"
                            : "opacity-40 hover:opacity-70 hover:bg-white/5"
                        }`}
                      >
                        <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-1.5 overflow-hidden transition-colors ${isSelected ? "bg-primary/20 ring-1 ring-primary/40" : "bg-white/5"}`}>
                          {info.icon ? (
                            <Image
                              src={info.icon}
                              alt={symbol}
                              width={36}
                              height={36}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-primary/20" />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col items-start gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-[14px] font-bold ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                              {info.name}
                            </span>
                            <span className="text-xs font-medium text-muted">{symbol}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{amount}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
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
