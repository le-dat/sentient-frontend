"use client";

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import { dashboardVaults } from "@/lib/mockdata/dashboard";
import type { VaultItem } from "@/lib/types/dashboard";

import { use } from "react";

interface SearchDetailProps {
  address: string | null;
  onSearchingChange?: (isSearching: boolean) => void;
}

export default function SearchAddressPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  return <SearchDetail address={address} />;
}

export function SearchDetail({ address, onSearchingChange }: SearchDetailProps) {
  const [selectedVault, setSelectedVault] = useState<VaultItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!address) return;

    let isMounted = true;

    const runSearch = (q: string) => {
      setIsSearching(true);
      onSearchingChange?.(true);
      setError(null);

      setTimeout(() => {
        if (!isMounted) return;

        if (!q.startsWith("0x") || q.length < 10) {
          setError("Please enter a valid vault address (starting with 0x)");
          setIsSearching(false);
          onSearchingChange?.(false);
          return;
        }

        const found = dashboardVaults.find((v: VaultItem) =>
          v.addr.toLowerCase().includes(q.toLowerCase()),
        );

        if (found) {
          setSelectedVault(found);
        } else {
          const mockDiscovered: VaultItem = {
            addr: q.length > 12 ? `${q.slice(0, 6)}...${q.slice(-4)}` : q,
            chain: "Ethereum Mainnet",
            status: "active",
            balance: "1,200 USDC / 0.5 WETH",
            rule: "Monitoring Active · Default Protection",
            lastExecution: "Never",
            pnl: "$0.00",
            pnlUp: true,
          };
          setSelectedVault(mockDiscovered);
        }
        setIsSearching(false);
        onSearchingChange?.(false);
      }, 800);
    };

    runSearch(address);

    return () => {
      isMounted = false;
    };
  }, [address, onSearchingChange]);

  return (
    <>
      {isSearching && (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}

      {error && !isSearching && (
        <div className="flex items-center gap-3 p-4 rounded-xl border border-danger/20 bg-danger/5 text-danger animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {selectedVault && !isSearching && (
        <VaultPanel vault={selectedVault} onClose={() => setSelectedVault(null)} />
      )}
    </>
  );
}
