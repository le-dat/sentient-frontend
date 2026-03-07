import type { ChainInfo } from "@/lib/types/dashboard";

export function ChainCard({
  chain,
  onCreate,
}: {
  chain: ChainInfo;
  onCreate: (chain: ChainInfo) => void;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/80 p-4">
      <div className="flex items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: chain.color }}
        >
          {chain.name[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold leading-tight">{chain.name}</p>
          <p className="text-xs text-muted">{chain.symbol}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted">
          {chain.vaultCount} vault{chain.vaultCount !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => onCreate(chain)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted transition-colors hover:border-primary/50 hover:text-primary"
          title={`Create vault on ${chain.name}`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
