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
      <label className="text-muted mb-1 block text-[10px]">Token (CCIP-BnM)</label>
      <div className="border-border/60 bg-card flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5">
        <span className="text-muted flex-1 font-mono text-[11px]">
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
        <p className="text-muted mt-1 text-[11px]">
          Vault CCIP-BnM:{" "}
          <span
            className={
              !hasEnoughToken ? "text-danger font-semibold" : "text-foreground font-semibold"
            }
          >
            {vaultTokenBalanceFormatted}
          </span>
        </p>
      )}
    </div>
  );
}
