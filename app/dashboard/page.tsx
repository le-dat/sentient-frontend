"use client";

import { AddChainCard } from "@/components/dashboard/add-chain-card";
import { ChainCard } from "@/components/dashboard/chain-card";
import { ChainSelectModal } from "@/components/dashboard/chain-select-modal";
import { VaultCard } from "@/components/dashboard/vault-card";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import { useCreateVault } from "@/hooks/use-create-vault";
import { SUPPORTED_CHAINS } from "@/lib/constants/chains";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { useRef, useState } from "react";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { chains: onChainChains, vaults: onChainVaults } = useDashboardViewModel(refreshKey);
  const { createVault, isCreating, error: vaultError } = useCreateVault();

  // Locally added this session (before next on-chain refresh)
  const [addedChains, setAddedChains] = useState<ChainInfo[]>([]);
  const [addedVaults, setAddedVaults] = useState<VaultItem[]>([]);

  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);

  const chainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Merge on-chain data with newly added (deduplicate by id / addr)
  const allChains = [
    ...onChainChains,
    ...addedChains.filter((c) => !onChainChains.some((oc) => oc.id === c.id)),
  ];
  const allVaults = [
    ...onChainVaults,
    ...addedVaults.filter((v) => !onChainVaults.some((ov) => ov.addr === v.addr)),
  ];

  // Chains not yet on the dashboard
  const availableChains = SUPPORTED_CHAINS.filter(
    (c) => !allChains.some((a) => a.id === c.id),
  );

  function scrollToChain(chainName: string) {
    chainRefs.current[chainName]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleChainSelect(chain: ChainInfo) {
    const vaultAddr = await createVault();
    setChainSelectOpen(false);
    if (!vaultAddr) return;

    setAddedChains((prev) => [...prev, { ...chain, vaultCount: 1 }]);
    setAddedVaults((prev) => [
      ...prev,
      {
        addr: vaultAddr,
        chain: chain.name,
        status: "active",
        balance: "—",
        rule: "—",
        lastExecution: "—",
        pnl: "—",
        pnlUp: true,
      },
    ]);
    setRefreshKey((k) => k + 1);
    setTimeout(() => scrollToChain(chain.name), 100);
  }

  const vaultsByChain = allVaults.reduce<Record<string, VaultItem[]>>((acc, v) => {
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
            {allChains.map((c, i) => (
              <ChainCard key={`${c.id}-${i}`} chain={c} onClick={() => scrollToChain(c.name)} />
            ))}
            <AddChainCard onClick={() => setChainSelectOpen(true)} />
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Vaults</h2>
          <div className="flex flex-col gap-6">
            {Object.entries(vaultsByChain).map(([chainName, chainVaults]) => (
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
            ))}
          </div>
        </section>
      </div>

      {selected && <VaultPanel vault={selected} onClose={() => setSelected(null)} />}

      {chainSelectOpen && (
        <ChainSelectModal
          chains={availableChains}
          onSelect={handleChainSelect}
          onClose={() => setChainSelectOpen(false)}
          isCreating={isCreating}
          error={vaultError}
        />
      )}
    </>
  );
}
