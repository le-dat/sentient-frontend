import type { ChainInfo } from "@/features/dashboard/types";
import { ChainLogo } from "./chain-logo";

export function ChainSelectModal({
  chains,
  onSelect,
  onClose,
  isCreating = false,
  error = null,
}: {
  chains: ChainInfo[];
  onSelect: (chain: ChainInfo) => void;
  onClose: () => void;
  isCreating?: boolean;
  error?: string | null;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={isCreating ? undefined : onClose}
    >
      <div
        className="border-border bg-card relative w-80 rounded-2xl border p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Select Chain</h3>
          <button
            onClick={onClose}
            disabled={isCreating}
            className="text-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors disabled:opacity-40"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {chains.map((chain) => {
            const supported = chain.enabled;
            const hasVault = chain.vaultCount > 0;
            const disabled = isCreating || !supported || hasVault;

            return (
              <li key={chain.id}>
                <button
                  onClick={() => onSelect(chain)}
                  disabled={disabled}
                  className="hover:border-primary/30 hover:bg-primary/5 flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <div className="bg-muted/20 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full">
                    <ChainLogo chainId={chain.id} className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <p className="leading-tight font-medium">{chain.name}</p>
                    <p className="text-muted text-xs">{chain.symbol}</p>
                  </div>
                  {hasVault && (
                    <span className="bg-success/15 text-success rounded-full px-2 py-0.5 text-[10px] font-semibold">
                      Created
                    </span>
                  )}
                  {!supported && (
                    <span className="bg-muted/20 text-muted rounded-full px-2 py-0.5 text-[10px] font-medium">
                      Soon
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {error && <p className="text-danger mt-3 text-xs">{error}</p>}

        {/* Loading overlay */}
        {isCreating && (
          <div className="bg-card/80 absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-sm">
            <svg className="text-primary h-7 w-7 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <p className="text-muted text-xs">Creating vault on-chain…</p>
          </div>
        )}
      </div>
    </div>
  );
}
