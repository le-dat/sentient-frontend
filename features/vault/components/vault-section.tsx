import { VaultCard } from "./vault-card";
import { VaultCardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import type { VaultItem } from "@/features/vault/types";
import type { MutableRefObject } from "react";

interface VaultSectionProps {
  vaultsByChain: Record<string, VaultItem[]>;
  onSelect: (vault: VaultItem) => void;
  chainRefs: MutableRefObject<Record<string, HTMLDivElement | null>>;
  isLoading?: boolean;
}

export function VaultSection({ vaultsByChain, onSelect, chainRefs, isLoading }: VaultSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Vaults</h2>
      {isLoading ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-2.5 w-24 rounded" />
            <VaultCardSkeleton />
            <VaultCardSkeleton />
          </div>
        </div>
      ) : (
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
      )}
    </section>
  );
}
