"use client";

import { Copy } from "lucide-react";

export function TokenChip({
  shieldToken,
  vaultTokenBalanceFormatted,
  hasEnoughToken,
}: {
  shieldToken: string;
  vaultTokenBalanceFormatted: string | null;
  hasEnoughToken: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] text-muted block mb-1">Token (CCIP-BnM)</label>
      <div className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2.5 py-1.5">
        <span className="text-[11px] font-mono text-muted flex-1">
          {shieldToken.slice(0, 6)}…{shieldToken.slice(-4)}
        </span>
        <button
          onClick={() => navigator.clipboard.writeText(shieldToken)}
          title="Copy address"
          className="text-muted hover:text-primary transition-colors"
        >
          <Copy className="h-3 w-3" />
        </button>
      </div>

      {vaultTokenBalanceFormatted != null && (
        <p className="text-[11px] text-muted mt-1">
          Vault CCIP-BnM:{" "}
          <span className={!hasEnoughToken ? "text-danger font-semibold" : "font-semibold text-foreground"}>
            {vaultTokenBalanceFormatted}
          </span>
        </p>
      )}
    </div>
  );
}
