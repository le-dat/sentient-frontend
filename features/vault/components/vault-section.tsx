import { VaultCard } from "./vault-card";
import type { VaultItem } from "@/features/vault/types";
import type { MutableRefObject } from "react";

interface VaultSectionProps {
  vaultsByChain: Record<string, VaultItem[]>;
  onSelect: (vault: VaultItem) => void;
  chainRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
}

export function VaultSection({ vaultsByChain, onSelect, chainRefs }: VaultSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Vaults</h2>
      <div className="flex flex-col gap-6">
        {Object.entries(vaultsByChain).map(([chainName, chainVaults]) => (
          <div
            key={chainName}
            ref={(el) => {
              chainRefs.current[chainName] = el;
            }}
            className="flex flex-col gap-3"
          >
            <p className="text-xs font-medium text-muted">{chainName}</p>
            {chainVaults.map((v) => (
              <VaultCard key={v.addr} vault={v} onSelect={onSelect} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
