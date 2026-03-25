"use client";

import { Suspense } from "react";
import { useAccount } from "wagmi";
import { AlertCircle, Shield } from "lucide-react";
import { CCIPPanel } from "@/features/ccip";
import { useVaultsList } from "@/lib/api/hooks";
import { CCIPPageSkeleton } from "@/features/ccip/components/ccip-page-skeleton";

const Header = () => (
  <h1 className="text-foreground flex items-center gap-2 text-xl font-bold">
    <Shield className="text-primary h-5 w-5" />
    Config CCIP Cross-Chain
  </h1>
);

function CCIPPageContent() {
  const { address: userAddress, isConnected } = useAccount();
  const { data: vaultsData, isLoading } = useVaultsList(
    { owner: userAddress ?? undefined, limit: 10 },
    { enabled: !!userAddress }
  );

  const myVaults = vaultsData?.items ?? [];
  const vault = myVaults[0];

  if (!isConnected) {
    return (
      <div className="animate-in fade-in space-y-6 duration-300">
        <Header />
        <div className="border-border/50 bg-card-2/40 rounded-xl border p-6 text-center">
          <p className="text-muted text-sm">Connect wallet to manage CCIP for your vault.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <CCIPPageSkeleton />;
  }

  if (!vault) {
    return (
      <div className="animate-in fade-in space-y-6 duration-300">
        <Header />
        <div className="border-warning/30 bg-warning/5 flex items-center gap-3 rounded-xl border p-4">
          <AlertCircle className="text-warning h-5 w-5 shrink-0" />
          <div>
            <p className="text-foreground text-sm font-medium">No vault found</p>
            <p className="text-muted mt-0.5 text-xs">
              Create a vault first (e.g. via setup script), then return here to configure CCIP.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in space-y-6 duration-300">
      <Header />
      {myVaults.length > 1 && (
        <div className="border-border/50 bg-card-2/40 rounded-xl border p-3">
          <p className="text-muted mb-1 text-[10px]">Your vault</p>
          <p className="text-foreground font-mono text-xs break-all">{vault.address}</p>
        </div>
      )}

      <CCIPPanel
        vaultAddress={vault.address as `0x${string}`}
        chainId={vault.chain_id}
        vaultOwner={vault.owner}
      />
    </div>
  );
}

export default function CCIPPage() {
  return (
    <Suspense fallback={<CCIPPageSkeleton />}>
      <CCIPPageContent />
    </Suspense>
  );
}
