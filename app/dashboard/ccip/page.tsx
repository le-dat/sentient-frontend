"use client";

import { Suspense } from "react";
import { useAccount } from "wagmi";
import { AlertCircle, Shield } from "lucide-react";
import { CCIPPanel } from "@/components/query/ccip-panel";
import { useVaultsList } from "@/lib/api/hooks";

function CCIPPageContent() {
  const { address: userAddress, isConnected } = useAccount();
  const { data: vaultsData, isLoading } = useVaultsList(
    { owner: userAddress ?? undefined, limit: 10 },
    { enabled: !!userAddress },
  );

  const myVaults = vaultsData?.items ?? [];
  const vault = myVaults[0];

  if (!isConnected) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            CCIP Cross-Chain
          </h1>
          <p className="mt-1 text-sm text-muted">
            Configure CCIP router and execute Emergency Shield on your vault.
          </p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card-2/40 p-6 text-center">
          <p className="text-sm text-muted">Connect wallet to manage CCIP for your vault.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            CCIP Cross-Chain
          </h1>
          <p className="mt-1 text-sm text-muted">
            Configure CCIP router and execute Emergency Shield on your vault.
          </p>
        </div>
        <div className="flex justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!vault) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
            <Shield className="h-5 w-5 text-primary" />
            CCIP Cross-Chain
          </h1>
          <p className="mt-1 text-sm text-muted">
            Configure CCIP router and execute Emergency Shield on your vault.
          </p>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-warning/30 bg-warning/5">
          <AlertCircle className="h-5 w-5 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-medium text-foreground">No vault found</p>
            <p className="text-xs text-muted mt-0.5">
              Create a vault first (e.g. via setup script), then return here to configure CCIP.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          CCIP Cross-Chain
        </h1>
        <p className="mt-1 text-sm text-muted">
          Configure CCIP router and execute Emergency Shield on your vault.
        </p>
      </div>

      {myVaults.length > 1 && (
        <div className="rounded-xl border border-border/50 bg-card-2/40 p-3">
          <p className="text-[10px] text-muted mb-1">Your vault</p>
          <p className="text-xs font-mono text-foreground break-all">{vault.address}</p>
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
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <CCIPPageContent />
    </Suspense>
  );
}
