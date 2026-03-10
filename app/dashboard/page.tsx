"use client";

import { ChainSection, ChainSelectModal } from "@/features/dashboard";
import { VaultSection, VaultPanel } from "@/features/vault";
import { useDashboardFlow } from "@/features/dashboard";

export default function DashboardPage() {
  const {
    allChains,
    availableChains,
    vaultsByChain,
    selected,
    setSelected,
    chainSelectOpen,
    setChainSelectOpen,
    isCreating,
    vaultError,
    chainRefs,
    scrollToChain,
    handleChainSelect,
    refreshVaults,
  } = useDashboardFlow();

  return (
    <>
      <div className="space-y-8">
        <ChainSection
          chains={allChains}
          onAddChain={() => setChainSelectOpen(true)}
          onChainClick={scrollToChain}
        />
        <VaultSection vaultsByChain={vaultsByChain} onSelect={setSelected} chainRefs={chainRefs} />
      </div>

      {selected && (
        <VaultPanel
          vault={selected}
          onClose={() => setSelected(null)}
          onRefresh={refreshVaults}
        />
      )}

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
