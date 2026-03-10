"use client";

import { BASE_TOKENS, TRADE_TOKENS } from "../../../types";
import { TokenRuleItem } from "./token-rule-item";
import { useVaultRules } from "../../../hooks/use-vault-rules";
import { TOKEN_DATA } from "../constants";
import { useState } from "react";

interface ConfigTabProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  preselectedToken?: string;
}

export function ConfigTab({ vaultAddress, chainId, preselectedToken }: ConfigTabProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(preselectedToken ? [preselectedToken] : [TRADE_TOKENS[0]]),
  );

  const {
    rulesAndFeeds,
    formByToken,
    baseToken,
    setBaseToken,
    updateForm,
    handleSave,
    handleDisable,
    isPending,
    error,
    reset,
  } = useVaultRules({ vaultAddress, chainId });

  const toggleExpanded = (sym: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(sym)) next.delete(sym);
      else next.add(sym);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-card-2/40 p-4 space-y-2">
        <p className="text-xs font-semibold">Token Rules</p>

        {/* Base token selector */}
        <div>
          <label className="text-[10px] text-muted block mb-1">Base token (chung)</label>
          <select
            value={baseToken}
            onChange={(e) => setBaseToken(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
          >
            {BASE_TOKENS.filter((s) => TOKEN_DATA[s]).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Error banner */}
        {error && (
          <p className="text-xs text-danger">
            {error.message}
            <button onClick={reset} className="ml-2 text-muted hover:text-foreground">
              Dismiss
            </button>
          </p>
        )}

        {/* Per-token accordion list */}
        <div className="space-y-1">
          {rulesAndFeeds.map(({ sym, rule }) => (
            <TokenRuleItem
              key={sym}
              sym={sym}
              rule={rule}
              formByToken={formByToken}
              baseToken={baseToken}
              isOpen={expanded.has(sym)}
              isPending={isPending}
              onToggle={() => toggleExpanded(sym)}
              onUpdate={updateForm}
              onSave={handleSave}
              onDisable={handleDisable}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
