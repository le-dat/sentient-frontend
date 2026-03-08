"use client";

import { ChainCard } from "@/components/dashboard/chain-card";
import { VaultCard } from "@/components/dashboard/vault-card";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import type { VaultItem } from "@/lib/types/dashboard";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { useRef, useState } from "react";

export default function DashboardPage() {
  const { chains, vaults } = useDashboardViewModel();
  const [selected, setSelected] = useState<VaultItem | null>(null);

  const chainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function scrollToChain(chainName: string) {
    chainRefs.current[chainName]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Chains with vaults only
  const chainsWithVaults = chains.filter((c) => c.vaultCount > 0);

  // Group vaults by chain name
  const vaultsByChain = vaults.reduce<Record<string, VaultItem[]>>((acc, v) => {
    if (!acc[v.chain]) acc[v.chain] = [];
    acc[v.chain].push(v);
    return acc;
  }, {});

  return (
    <>
      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Chains</h2>
          <div className="flex flex-wrap gap-3">
            {chainsWithVaults.map((c) => (
              <ChainCard key={c.id} chain={c} onClick={() => scrollToChain(c.name)} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Vaults</h2>
          <div className="flex flex-col gap-6">
            {Object.keys(vaultsByChain).length === 0 ? (
              <p className="text-sm text-muted py-6 text-center">
                No vaults found. Run the indexer to sync from subgraph.
              </p>
            ) : (
              Object.entries(vaultsByChain).map(([chainName, chainVaults]) => (
                <div
                  key={chainName}
                  ref={(el) => { chainRefs.current[chainName] = el; }}
                  className="flex flex-col gap-3"
                >
                  <p className="text-xs font-medium text-muted">{chainName}</p>
                  {chainVaults.map((v) => (
                    <VaultCard key={v.addr} vault={v} onSelect={setSelected} />
                  ))}
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {selected && <VaultPanel vault={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
