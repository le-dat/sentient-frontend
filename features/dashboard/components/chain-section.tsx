import { AddChainCard } from "./add-chain-card";
import { ChainCard } from "./chain-card";
import { ChainCardSkeleton } from "./dashboard-skeleton";
import type { ChainInfo } from "@/features/dashboard/types";

interface ChainSectionProps {
  chains: ChainInfo[];
  onAddChain: () => void;
  onChainClick: (name: string) => void;
  isLoading?: boolean;
}

export function ChainSection({ chains, onAddChain, onChainClick, isLoading }: ChainSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Chains</h2>
      {isLoading ? (
        <div className="flex flex-wrap gap-3">
          <ChainCardSkeleton />
          <ChainCardSkeleton />
          <ChainCardSkeleton />
          <ChainCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-3">
          {chains.map((c, i) => (
            <ChainCard key={`${c.id}-${i}`} chain={c} onClick={() => onChainClick(c.name)} />
          ))}
          <AddChainCard onClick={onAddChain} />
        </div>
      )}
    </section>
  );
}
