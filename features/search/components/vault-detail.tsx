"use client";

import { getChainName } from "@/lib/api/constants";
import type { VaultDetail as ApiVaultDetail, HistoryItem } from "@/lib/api/types";
import { formatTimestamp, getExplorerBase } from "@/lib/utils";
import { ArrowLeft, Check, Clock, Copy, ExternalLink, ShieldAlert, Zap } from "lucide-react";
import { useState } from "react";

function formatEventDetail(e: HistoryItem): string {
  if (e.event_type === "TokenRuleSet" && e.payload_json) {
    const p = e.payload_json as Record<string, unknown>;
    const buy = p.buyThreshold ?? p.buy_threshold;
    const sell = p.sellThreshold ?? p.sell_threshold;
    if (buy != null || sell != null) {
      return `Buy < $${buy ?? "—"} · Sell > $${sell ?? "—"}`;
    }
  }
  if (e.event_type === "SwapExecuted" && e.payload_json) {
    const p = e.payload_json as Record<string, unknown>;
    return `Amount: ${JSON.stringify(p.amountIn ?? p.amountOut ?? p)}`;
  }
  return Object.keys(e.payload_json || {}).length > 0
    ? JSON.stringify(e.payload_json).slice(0, 80) + "..."
    : `Block #${e.block_number}`;
}

// ─── Column 1: Vault Info ────────────────────────────────────────────────────
function VaultInfoCol({ vault }: { vault: ApiVaultDetail }) {
  const [copied, setCopied] = useState(false);
  const chainName = getChainName(vault.chain_id);

  function copyAddress() {
    navigator.clipboard.writeText(vault.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const explorerTx = vault.created_tx_hash
    ? `${getExplorerBase(vault.chain_id)}/tx/${vault.created_tx_hash}`
    : null;

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">Vault Info</p>

      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        <div>
          <p className="text-[10px] text-muted mb-1">Address</p>
          <div className="flex items-center gap-1.5">
            <p className="font-mono text-xs font-semibold text-foreground break-all">
              {vault.address}
            </p>
            <button
              onClick={copyAddress}
              className="text-muted hover:text-foreground transition-colors shrink-0"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-muted mb-1">Owner</p>
          <p className="font-mono text-xs font-medium text-foreground break-all">
            {vault.owner ?? "—"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] text-muted mb-1">Chain</p>
            <p className="text-xs font-medium text-foreground">{chainName}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted mb-1">Events</p>
            <p className="text-xs font-medium text-foreground">{vault.event_count}</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-muted mb-1">Created</p>
          <p className="text-xs font-medium text-foreground">
            {formatTimestamp(vault.created_timestamp)}
          </p>
          {explorerTx && (
            <a
              href={explorerTx}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline mt-1"
            >
              View tx <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {vault.latest_event_timestamp && (
          <div>
            <p className="text-[10px] text-muted mb-1">Last Event</p>
            <p className="text-xs font-medium text-foreground">
              {formatTimestamp(vault.latest_event_timestamp)}
              {vault.latest_event_block != null && <> · Block #{vault.latest_event_block}</>}
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
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">Contract</p>

      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        <p className="text-xs text-muted">
          Vault metadata is indexed from the subgraph. Rules and balance are configured on-chain.
        </p>
        <a
          href={`${explorerBase}/address/${vault.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          View on Explorer <ExternalLink className="h-3 w-3" />
        </a>
        <p className="text-[10px] text-muted">
          {chainName} · Chain ID {vault.chain_id}
        </p>
      </div>
    </div>
  );
}

// ─── Column 3: History ───────────────────────────────────────────────────────
function HistoryCol({ items }: { items: HistoryItem[] }) {
  const icons: Record<string, React.ReactNode> = {
    SwapExecuted: <Zap className="h-3 w-3" />,
    TokenRuleSet: <Check className="h-3 w-3" />,
    VaultInitialized: <Check className="h-3 w-3" />,
    TokenDeposited: <Zap className="h-3 w-3" />,
    TokenWithdrawn: <Zap className="h-3 w-3" />,
    ShieldTriggered: <ShieldAlert className="h-3 w-3" />,
  };

  const eventColors: Record<string, string> = {
    SwapExecuted: "text-success",
    TokenRuleSet: "text-primary",
    VaultInitialized: "text-primary",
    TokenDeposited: "text-success",
    TokenWithdrawn: "text-warning",
  };

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-3">
        Event History
      </p>

      <div className="rounded-xl border border-border/50 bg-card-2/40 overflow-hidden">
        {items.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-muted">No events yet</div>
        ) : (
          items.map((e, i) => (
            <div
              key={`${e.tx_hash}-${e.log_index}-${i}`}
              className="flex items-start gap-3 px-3 py-3 border-b border-border/30 last:border-0"
            >
              <div
                className={`mt-0.5 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-card ${
                  eventColors[e.event_type] ?? "text-muted"
                }`}
              >
                {icons[e.event_type] ?? <Clock className="h-3 w-3" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${eventColors[e.event_type] ?? "text-muted"}`}>
                  {e.event_type}
                </p>
                <p className="text-[10px] text-muted leading-relaxed mt-0.5">
                  {formatEventDetail(e)}
                </p>
                <a
                  href={`${getExplorerBase(e.chain_id)}/tx/${e.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-primary hover:underline mt-1 inline-block"
                >
                  {e.tx_hash.slice(0, 10)}...{e.tx_hash.slice(-8)}
                </a>
              </div>
              <span className="text-[10px] text-muted shrink-0">
                {formatTimestamp(e.timestamp)}
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
    <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 md:mt-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Top Vaults
      </button>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <VaultInfoCol vault={vault} />
        <ContractInfoCol vault={vault} />
        <HistoryCol items={history} />
      </div>
    </div>
  );
}
