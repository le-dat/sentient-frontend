import type { ChainInfo } from "@/features/dashboard/types";
import { ChainLogo } from "./chain-logo";

export function ChainCard({ chain, onClick }: { chain: ChainInfo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group border-border/60 bg-card/60 hover:border-primary/50 hover:bg-card/90 flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all hover:shadow-sm md:min-w-44 md:shrink-0"
    >
      <div
        className="ring-border/40 group-hover:ring-primary/30 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 transition-colors"
        style={{ backgroundColor: `${chain.color}18` }}
      >
        <ChainLogo chainId={chain.id} className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground leading-tight font-semibold">{chain.name}</p>
        <p className="text-muted mt-0.5 text-[11px]">{chain.symbol}</p>
      </div>
    </button>
  );
}
