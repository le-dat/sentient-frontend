import { AddChainCard } from "./add-chain-card";
import { ChainCard } from "./chain-card";
import type { ChainInfo } from "@/lib/types/dashboard";

interface ChainSectionProps {
  chains: ChainInfo[];
  onAddChain: () => void;
  onChainClick: (name: string) => void;
}

export function ChainSection({ chains, onAddChain, onChainClick }: ChainSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Chains</h2>
      <div className="flex flex-wrap gap-3">
        {chains.map((c, i) => (
          <ChainCard key={`${c.id}-${i}`} chain={c} onClick={() => onChainClick(c.name)} />
        ))}
        <AddChainCard onClick={onAddChain} />
      </div>
    </section>
  );
}
