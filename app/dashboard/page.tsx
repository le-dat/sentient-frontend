"use client";

import { ChainSection, VaultSection, ChainSelectModal, VaultPanel } from "@/components/dashboard";
import { useDashboardFlow } from "@/hooks/use-dashboard-flow";

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
