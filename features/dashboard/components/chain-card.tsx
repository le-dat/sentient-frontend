import type { ChainInfo } from "@/features/dashboard/types";
import { ChainLogo } from "./chain-logo";

export function ChainCard({ chain, onClick }: { chain: ChainInfo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex md:min-w-44 md:shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-4 py-3 text-left transition-all hover:border-primary/50 hover:bg-card/90 hover:shadow-sm"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl overflow-hidden ring-1 ring-border/40 transition-colors group-hover:ring-primary/30"
        style={{ backgroundColor: `${chain.color}18` }}
      >
        <ChainLogo chainId={chain.id} className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground leading-tight">{chain.name}</p>
        <p className="text-[11px] text-muted mt-0.5">{chain.symbol}</p>
      </div>
    </button>
  );
}
