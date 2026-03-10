"use client";

import { Ban, Check, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { DEFAULT_RULE, RuleData, THRESHOLD_HINTS } from "../../../types";
import { TOKEN_DATA } from "../constants";

interface TokenRuleItemProps {
  sym: string;
  rule: unknown;
  formByToken: Record<string, RuleData>;
  baseToken: string;
  isOpen: boolean;
  isPending: boolean;
  onToggle: () => void;
  onUpdate: (sym: string, upd: Partial<RuleData>) => void;
  onSave: (sym: string) => void;
  onDisable: (sym: string) => void;
}

export function TokenRuleItem({
  sym,
  formByToken,
  baseToken,
  isOpen,
  isPending,
  onToggle,
  onUpdate,
  onSave,
  onDisable,
}: TokenRuleItemProps) {
  const form = formByToken[sym] ?? DEFAULT_RULE;
  const tokenAddr = TOKEN_DATA[sym]?.address as `0x${string}` | undefined;
  const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;
  const enabled = form?.enabled ?? false;

  const canSave =
    tokenAddr &&
    baseAddr &&
    (enabled
      ? form?.buyThreshold &&
        form?.sellThreshold &&
        form?.tradeAmount &&
        parseFloat(form.buyThreshold) > 0 &&
        parseFloat(form.sellThreshold) > parseFloat(form.buyThreshold) &&
        parseFloat(form.tradeAmount) > 0
      : true);

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
      {/* ── Header / toggle ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
        )}
        <span className="text-xs font-semibold">{sym}</span>
        <span
          className={`ml-auto rounded px-2 py-0.5 text-[10px] font-medium ${
            enabled ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
          }`}
        >
          {enabled ? "On" : "Off"}
        </span>
        {enabled && form?.buyThreshold && form?.sellThreshold && (
          <span className="text-[10px] text-muted truncate max-w-[140px]">
            Buy &lt; ${form.buyThreshold} · Sell &gt; ${form.sellThreshold}
          </span>
        )}
      </button>

      {/* ── Expanded form ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="border-t border-border/50 px-3 py-3 space-y-3">
          {/* Enable toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`enabled-${sym}`}
              checked={enabled}
              onChange={(e) => onUpdate(sym, { enabled: e.target.checked })}
              className="rounded border-border/60"
            />
            <label htmlFor={`enabled-${sym}`} className="text-xs font-medium">
              Enable rule
            </label>
          </div>

          {/* Threshold / amount inputs (only when enabled) */}
          {enabled && (
            <>
              <div>
                <label className="text-[10px] text-muted block mb-1">Buy {sym} below ($)</label>
                <input
                  type="text"
                  value={form?.buyThreshold ?? ""}
                  onChange={(e) => onUpdate(sym, { buyThreshold: e.target.value })}
                  placeholder={THRESHOLD_HINTS[sym]?.buy ?? "e.g. 2500"}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted block mb-1">Sell {sym} above ($)</label>
                <input
                  type="text"
                  value={form?.sellThreshold ?? ""}
                  onChange={(e) => onUpdate(sym, { sellThreshold: e.target.value })}
                  placeholder={THRESHOLD_HINTS[sym]?.sell ?? "e.g. 3200"}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted block mb-1">
                  Trade amount ({baseToken})
                </label>
                <input
                  type="text"
                  value={form?.tradeAmount ?? ""}
                  onChange={(e) => onUpdate(sym, { tradeAmount: e.target.value })}
                  placeholder="100"
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                />
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onSave(sym)}
              disabled={isPending || !canSave}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary/20 py-2 text-xs font-semibold text-primary hover:bg-primary/30 disabled:opacity-50 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Save
                </>
              )}
            </button>
            {enabled && tokenAddr && baseAddr && (
              <button
                onClick={() => onDisable(sym)}
                disabled={isPending}
                className="flex items-center justify-center gap-2 rounded-xl border border-warning/40 bg-warning/10 px-3 py-2 text-xs font-semibold text-warning hover:bg-warning/20 disabled:opacity-50 transition-all"
              >
                <Ban className="h-3.5 w-3.5" />
                Disable
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
