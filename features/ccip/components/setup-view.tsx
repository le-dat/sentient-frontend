"use client";

import { AlertCircle, Check, Loader2 } from "lucide-react";

export function SetupView({
  ccipRouterAddress,
  setCcipRouterAddress,
  defaultRouter,
  isWritePending,
  onSubmit,
}: {
  ccipRouterAddress: string;
  setCcipRouterAddress: (v: string) => void;
  defaultRouter: string;
  isWritePending: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-muted flex items-center gap-1.5 text-[11px]">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        Set the Chainlink CCIP router to enable cross-chain Emergency Shield.
      </p>

      <div>
        <label htmlFor="ccip-router" className="text-muted mb-1 block text-[10px]">
          CCIP Router Address
        </label>
        <input
          id="ccip-router"
          type="text"
          value={ccipRouterAddress || defaultRouter}
          onChange={(e) => setCcipRouterAddress(e.target.value)}
          placeholder={defaultRouter}
          className="border-border/60 bg-card text-foreground focus:border-primary/50 w-full rounded-lg border px-3 py-2 font-mono text-xs outline-none"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isWritePending}
        className="bg-primary/20 text-primary hover:bg-primary/30 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all disabled:opacity-50"
      >
        {isWritePending ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            Setting...
          </>
        ) : (
          <>
            <Check className="h-3.5 w-3.5" />
            Set CCIP Config
          </>
        )}
      </button>
    </div>
  );
}
