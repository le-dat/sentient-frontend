"use client";

import { AddChainCard } from "@/components/dashboard/add-chain-card";
import { ChainCard } from "@/components/dashboard/chain-card";
import { ChainSelectModal } from "@/components/dashboard/chain-select-modal";
import { VaultCard } from "@/components/dashboard/vault-card";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { useRef, useState } from "react";

function generateNewVault(chain: ChainInfo): VaultItem {
  return {
    addr: `0x${Math.random().toString(16).slice(2, 10)}...`,
    chain: chain.name,
    status: "active",
    balance: "0 USDC",
    rule: "Buy < $0 · Sell > $0",
    lastExecution: "never",
    pnl: "0%",
    pnlUp: true,
  };
}

export default function DashboardPage() {
  const { chains, vaults } = useDashboardViewModel();

  const [addedChains, setAddedChains] = useState<ChainInfo[]>(chains);
  const [localVaults, setLocalVaults] = useState<VaultItem[]>(vaults);
  const [chainSelectOpen, setChainSelectOpen] = useState(false);
  const [selected, setSelected] = useState<VaultItem | null>(null);

  const chainRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function scrollToChain(chainName: string) {
    chainRefs.current[chainName]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleChainSelect(chain: ChainInfo) {
    const newChain = { ...chain, vaultCount: 1 };
    setAddedChains((prev) => [...prev, newChain]);
    const newVault = generateNewVault(chain);
    setLocalVaults((prev) => [...prev, newVault]);
    setChainSelectOpen(false);
    setTimeout(() => scrollToChain(chain.name), 100);
  }

  // Group vaults by chain name
  const vaultsByChain = localVaults.reduce<Record<string, VaultItem[]>>((acc, v) => {
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
            {addedChains.map((c, i) => (
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
          chains={chains}
          onSelect={handleChainSelect}
          onClose={() => setChainSelectOpen(false)}
        />
      )}
    </>
  );
}
