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
    isLoading,
  } = useDashboardFlow();

  return (
    <>
      <div className="space-y-8">
        <ChainSection
          chains={allChains}
          onAddChain={() => setChainSelectOpen(true)}
          onChainClick={scrollToChain}
          isLoading={isLoading}
        />
        <VaultSection vaultsByChain={vaultsByChain} onSelect={setSelected} chainRefs={chainRefs} isLoading={isLoading} />
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
