"use client";

import type { VaultItem } from "@/features/vault/types";
import { FACTORY_CHAIN } from "@/lib/constants/chains";
import { shortAddress } from "@/lib/utils";
import { Check, Copy, Power, X } from "lucide-react";
import { useMemo, useState } from "react";
import { STABLE_COINS, tabItems } from "./constants";
import { StatusBadge } from "./status-badge";
import { ConfigTab } from "./tabs/config-tab";
import { ConsoleTab } from "./tabs/console-tab";
import { HistoryTab } from "./tabs/history-tab";
import type { Tab } from "./types";
import { parseTokens } from "./utils";
import { DeactivateConfirmModal } from "./deactivate-confirm-modal";

interface VaultPanelProps {
  vault: VaultItem;
  onClose: () => void;
  onRefresh?: () => void;
}

export function VaultPanel({ vault, onClose, onRefresh }: VaultPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("console");
  const [isActive, setIsActive] = useState(vault.status === "active");
  const [showConfirmOff, setShowConfirmOff] = useState(false);
  const [copied, setCopied] = useState(false);

  const [selection, setSelection] = useState({ symbol: "", source: "system" });

  // Data Derivation
  const vaultTokens = useMemo(() => parseTokens(vault.balance), [vault.balance]);
  const vaultSymbols = useMemo(() => new Set(vaultTokens.map((t) => t.symbol)), [vaultTokens]);
  const systemTokens = useMemo(
    () => STABLE_COINS.filter((s) => !vaultSymbols.has(s)),
    [vaultSymbols],
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(vault.addr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="flex h-full w-full max-w-none flex-col bg-card/95 backdrop-blur-xl md:max-w-[540px] md:border-l md:border-border/60">
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
              onClick={() => {
                if (isActive) {
                  setShowConfirmOff(true);
                } else {
                  setIsActive(true);
                }
              }}
              className={`h-8 w-8 flex items-center justify-center rounded-lg border transition-all ${
                isActive
                  ? "border-success/60 text-success bg-success/15 shadow-[0_0_10px_rgba(52,211,153,0.25)] ring-1 ring-success/20"
                  : "border-border/60 text-muted hover:text-foreground hover:border-border"
              }`}
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
              vaultAddress={vault.addr as `0x${string}`}
              systemTokens={systemTokens}
              vaultTokens={vaultTokens}
              vaultSymbols={vaultSymbols}
              selection={selection}
              setSelection={setSelection}
              onDepositSuccess={onRefresh}
            />
          )}

          {activeTab === "config" && (
            <ConfigTab
              vaultAddress={vault.addr as `0x${string}`}
              chainId={vault.chainId ?? FACTORY_CHAIN.id}
              preselectedToken={selection.symbol || undefined}
            />
          )}

          {activeTab === "history" && (
            <HistoryTab
              vaultAddress={vault.addr as `0x${string}`}
              chainId={vault.chainId ?? FACTORY_CHAIN.id}
            />
          )}
        </main>
      </div>

      {showConfirmOff && (
        <DeactivateConfirmModal
          onCancel={() => setShowConfirmOff(false)}
          onConfirm={() => {
            setIsActive(false);
            setShowConfirmOff(false);
          }}
        />
      )}
    </div>
  );
}
