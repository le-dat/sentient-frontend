"use client";

import type { VaultItem } from "@/lib/types/dashboard";
import { shortAddress } from "@/lib/utils";
import { Check, Copy, Power, X } from "lucide-react";
import { useMemo, useState } from "react";
import { STABLE_COINS, tabItems } from "./constants";
import { StatusBadge } from "./status-badge";
import { ConfigTab } from "./tabs/config-tab";
import { ConsoleTab } from "./tabs/console-tab";
import type { Tab } from "./types";
import { parsePrices, parseTokens } from "./utils";

export function VaultPanel({ vault, onClose }: { vault: VaultItem; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("console");
  const [isActive, setIsActive] = useState(vault.status === "active");
  const [copied, setCopied] = useState(false);

  // Form State
  const initialPrices = useMemo(() => parsePrices(vault.rule), [vault.rule]);
  const [prices, setPrices] = useState(initialPrices);
  const [selection, setSelection] = useState({ symbol: "", source: "system" });

  // Data Derivation
  const vaultTokens = useMemo(() => parseTokens(vault.balance), [vault.balance]);
  const vaultSymbols = useMemo(() => new Set(vaultTokens.map((t) => t.symbol)), [vaultTokens]);
  const systemTokens = useMemo(() => {
    const tokensInVault = vaultTokens.map((t) => t.symbol);
    const extras = STABLE_COINS.filter((s) => !vaultSymbols.has(s));
    return [...tokensInVault, ...extras];
  }, [vaultTokens, vaultSymbols]);

  const handleCopy = () => {
    navigator.clipboard.writeText(vault.addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="flex h-full w-full max-w-none flex-col bg-card/95 backdrop-blur-xl md:max-w-[460px] md:border-l md:border-border/60">
        {/* Header Section */}
        <header className="flex items-start justify-between px-5 pt-5 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="break-all text-sm font-bold md:text-base">{shortAddress(vault.addr)}</p>
              <button onClick={handleCopy} className="text-muted hover:text-foreground">
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              </button>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <StatusBadge active={isActive} />
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{vault.chain}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`h-8 w-8 flex items-center justify-center rounded-lg border transition-colors ${isActive ? "border-success/40 text-success bg-success/5" : "border-border/60 text-muted"}`}
            >
              <Power className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/60 text-muted"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex border-b border-border/50 px-5">
          {tabItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as Tab)}
              className={`flex items-center gap-1.5 px-1 pb-2.5 pt-1 text-xs font-medium mr-5 border-b-2 transition-colors ${
                activeTab === id
                  ? "border-red-500 text-foreground"
                  : "border-transparent text-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </nav>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === "console" && (
            <ConsoleTab
              systemTokens={systemTokens}
              vaultTokens={vaultTokens}
              vaultSymbols={vaultSymbols}
              selection={selection}
              setSelection={setSelection}
            />
          )}

          {activeTab === "config" && <ConfigTab prices={prices} setPrices={setPrices} />}

          {activeTab === "history" && (
            <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border/60 text-xs text-muted">
              No history available
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
