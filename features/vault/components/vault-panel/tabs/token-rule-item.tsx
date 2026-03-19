"use client";

import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFeedPrice } from "../../../hooks/use-feed-price";
import { DEFAULT_RULE, parseRule, RuleData } from "../../../types";
import { TOKEN_DATA } from "../constants";

interface TokenRuleItemProps {
  sym: string;
  rule: unknown;
  formByToken: Record<string, RuleData>;
  baseToken: string;
  chainId: number;
  isOpen: boolean;
  isPending: boolean;
  onToggle: () => void;
  onUpdate: (sym: string, upd: Partial<RuleData>) => void;
  onSave: (sym: string) => void;
  onDisable: (sym: string) => void;
}

export function TokenRuleItem({
  sym,
  rule,
  formByToken,
  baseToken,
  chainId,
  isOpen,
  isPending,
  onToggle,
  onUpdate,
  onSave,
  onDisable,
}: TokenRuleItemProps) {
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const livePrice = useFeedPrice(chainId, sym);
  const form = formByToken[sym] ?? DEFAULT_RULE;
  const onChainRule = parseRule(rule);
  const onChainEnabled = onChainRule?.enabled ?? false;
  const tokenAddr = TOKEN_DATA[sym]?.address as `0x${string}` | undefined;
  const baseAddr = TOKEN_DATA[baseToken]?.address as `0x${string}` | undefined;
  const enabled = form?.enabled ?? false;

  const buyVal = parseFloat(form?.buyThreshold ?? "");
  const sellVal = parseFloat(form?.sellThreshold ?? "");
  const tradeVal = parseFloat(form?.tradeAmount ?? "");
  const sellBelowBuy = enabled && form?.sellThreshold && form?.buyThreshold && sellVal <= buyVal;

  const canSave =
    tokenAddr &&
    baseAddr &&
    (enabled
      ? form?.buyThreshold &&
        form?.sellThreshold &&
        form?.tradeAmount &&
        buyVal > 0 &&
        sellVal > buyVal &&
        tradeVal > 0
      : true);

  const showSummary =
    enabled &&
    form?.buyThreshold &&
    form?.sellThreshold &&
    form?.tradeAmount &&
    buyVal > 0 &&
    sellVal > buyVal &&
    tradeVal > 0;

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
      {/* ── Header / toggle ───────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/30 transition-colors"
      >
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform ${isOpen ? "" : "-rotate-90"}`}
        />
        <span className="text-sm font-semibold">{sym}</span>
        {onChainEnabled && onChainRule?.buyThreshold && onChainRule?.sellThreshold ? (
          <span className="ml-auto text-[10px] text-muted truncate max-w-[160px]">
            Buy &lt; ${onChainRule.buyThreshold} · Sell &gt; ${onChainRule.sellThreshold}
          </span>
        ) : (
          <span
            className={`ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              onChainEnabled
                ? "bg-success/20 text-success border border-success/30"
                : "bg-muted/50 text-muted-foreground border border-border/40"
            }`}
          >
            {onChainEnabled ? "Active" : "Inactive"}
          </span>
        )}
      </button>

      {/* ── Expanded form ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div className="border-t border-border/50 px-3 py-3 space-y-5">
          {/* Enable toggle + status badge + Turn Off — single grouped row */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div className="relative shrink-0">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  onChange={(e) => {
                    if (!e.target.checked && enabled) {
                      setShowDisableConfirm(true);
                    } else {
                      onUpdate(sym, { enabled: e.target.checked });
                    }
                  }}
                />
                <div className="w-10 h-6 bg-card-2 border border-border/60 rounded-full peer peer-checked:bg-primary/30 peer-checked:border-primary/60 transition-all" />
                <div className="absolute top-1 left-1 w-4 h-4 bg-muted rounded-full transition-all peer-checked:translate-x-4 peer-checked:bg-primary" />
              </div>
              <span className="text-sm font-medium">Automate trading</span>
            </label>
          </div>

          {/* Threshold / amount inputs (only when enabled) */}
          {enabled && (
            <>
              {/* Buy threshold */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium shrink-0">
                  Buy when price drops below $
                </label>
                <input
                  type="text"
                  value={form?.buyThreshold ?? ""}
                  onChange={(e) => onUpdate(sym, { buyThreshold: e.target.value })}
                  placeholder={livePrice ?? "0.00"}
                  className="w-24 rounded-lg border border-border/60 bg-card px-2 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                />
              </div>

              {/* Sell threshold */}
              <div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-medium shrink-0">
                    Sell when price rises above $
                  </label>
                  <input
                    type="text"
                    value={form?.sellThreshold ?? ""}
                    onChange={(e) => onUpdate(sym, { sellThreshold: e.target.value })}
                    placeholder={livePrice ?? "0.00"}
                    className="w-24 rounded-lg border border-border/60 bg-card px-2 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                  />
                </div>
                {sellBelowBuy && (
                  <p className="text-[10px] text-warning mt-1">
                    ⚠ Must be higher than your buy price
                  </p>
                )}
              </div>

              {/* Trade amount */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium shrink-0">Trade amount</label>
                <input
                  type="text"
                  value={form?.tradeAmount ?? ""}
                  onChange={(e) => onUpdate(sym, { tradeAmount: e.target.value })}
                  placeholder="100"
                  className="w-24 rounded-lg border border-border/60 bg-card px-2 py-1.5 text-xs font-medium text-foreground outline-none focus:border-primary/50 placeholder:text-muted"
                />
                <span className="text-xs text-muted shrink-0">{baseToken}</span>
              </div>

              {/* Rule summary */}
              {showSummary && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 px-3 py-2.5 space-y-1">
                  <p className="text-xs font-semibold text-foreground">What the bot will do:</p>
                  <p className="text-xs text-muted">
                    • Buy {sym} when price &lt; ${form.buyThreshold}
                  </p>
                  <p className="text-xs text-muted">
                    • Sell {sym} when price &gt; ${form.sellThreshold}
                  </p>
                  <p className="text-xs text-muted">
                    • Trade ${form.tradeAmount} {baseToken} each time
                  </p>
                </div>
              )}
            </>
          )}

          {/* Save button — full width */}
          <button
            onClick={() => onSave(sym)}
            disabled={isPending || !canSave}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/20 py-2.5 text-xs font-semibold text-primary hover:bg-primary/30 disabled:opacity-50 transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5" />
                Save Rule
              </>
            )}
          </button>
        </div>
      )}
      {showDisableConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-border/60 bg-card p-5 shadow-xl space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold">Disable automation for {sym}?</p>
              <p className="text-xs text-muted">
                This will remove the on-chain rule and stop automated trading for this token.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDisableConfirm(false)}
                className="flex-1 rounded-xl border border-border/60 bg-card-2/40 py-2 text-xs font-semibold text-foreground hover:bg-muted/30 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDisableConfirm(false);
                  onDisable(sym);
                }}
                disabled={isPending}
                className="flex-1 rounded-xl border border-danger/40 bg-danger/10 py-2 text-xs font-semibold text-danger hover:bg-danger/20 disabled:opacity-50 transition-all"
              >
                {isPending ? <Loader2 className="mx-auto h-3.5 w-3.5 animate-spin" /> : "Disable"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
