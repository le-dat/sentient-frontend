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
      <p className="text-[11px] text-muted flex items-center gap-1.5">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        Set the Chainlink CCIP router to enable cross-chain Emergency Shield.
      </p>

      <div>
        <label htmlFor="ccip-router" className="text-[10px] text-muted block mb-1">
          CCIP Router Address
        </label>
        <input
          id="ccip-router"
          type="text"
          value={ccipRouterAddress || defaultRouter}
          onChange={(e) => setCcipRouterAddress(e.target.value)}
          placeholder={defaultRouter}
          className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isWritePending}
        className="flex items-center gap-2 w-full justify-center rounded-xl bg-primary/20 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/30 disabled:opacity-50"
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
