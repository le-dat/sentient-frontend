"use client";

import { BASE_TOKENS, TRADE_TOKENS } from "../../../types";
import { TokenRuleItem } from "./token-rule-item";
import { useVaultRules } from "../../../hooks/use-vault-rules";
import { TOKEN_DATA } from "../constants";
import { ErrorDescription } from "@/components/ui/error-description";
import { useState } from "react";

interface ConfigTabProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  preselectedToken?: string;
}

export function ConfigTab({ vaultAddress, chainId, preselectedToken }: ConfigTabProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(preselectedToken ? [preselectedToken] : [TRADE_TOKENS[0]])
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
    <div className="border-border/60 bg-card-2/40 space-y-2 rounded-xl border p-4">
      <div className="flex items-center gap-2">
        <label className="shrink-0 text-xs font-medium">Settlement</label>
        <select
          value={baseToken}
          onChange={(e) => setBaseToken(e.target.value)}
          className="border-border/60 bg-card text-foreground focus:border-primary/50 rounded-lg border px-3 py-2 text-xs font-medium outline-none"
        >
          {BASE_TOKENS.filter((s) => TOKEN_DATA[s]).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="border-danger/30 bg-danger/5 text-danger rounded-lg border px-3 py-2">
          <ErrorDescription message={error.message} />
          <button
            onClick={reset}
            className="text-muted hover:text-foreground mt-1 text-[10px] underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="space-y-1">
        {rulesAndFeeds.map(({ sym, rule }) => (
          <TokenRuleItem
            key={sym}
            sym={sym}
            rule={rule}
            formByToken={formByToken}
            baseToken={baseToken}
            chainId={chainId}
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
  );
}
