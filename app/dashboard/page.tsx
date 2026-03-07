"use client";

import { ChainCard } from "@/components/dashboard/chain-card";
import { CreateVaultModal } from "@/components/dashboard/create-vault-modal";
import { VaultCard } from "@/components/dashboard/vault-card";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import type { ChainInfo, VaultItem } from "@/lib/types/dashboard";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { useState } from "react";

export default function DashboardPage() {
  const { chains, vaults } = useDashboardViewModel();
  const [selected, setSelected] = useState<VaultItem | null>(null);
  const [creatingOnChain, setCreatingOnChain] = useState<ChainInfo | null>(null);

  function handleCreate(data: { name: string; buyBelow: string; sellAbove: string }) {
    // TODO: submit vault creation to chain
    console.log("Create vault", data, "on", creatingOnChain?.name);
  }

  return (
    <>
      <div className="space-y-8">
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Chains</h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {chains.map((c) => (
              <ChainCard key={c.id} chain={c} onCreate={setCreatingOnChain} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">Vaults</h2>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {vaults.map((v) => (
              <VaultCard key={v.addr} vault={v} onSelect={setSelected} />
            ))}
          </div>
        </section>
      </div>

      {selected && <VaultPanel vault={selected} onClose={() => setSelected(null)} />}

      {creatingOnChain && (
        <CreateVaultModal
          chain={creatingOnChain}
          onClose={() => setCreatingOnChain(null)}
          onCreate={handleCreate}
        />
      )}
    </>
  );
}
