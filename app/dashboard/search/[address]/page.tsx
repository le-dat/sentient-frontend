"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";
import { shortAddress } from "@/lib/utils";
import { VaultDetail } from "@/components/query/vault-detail";
import { dashboardVaults } from "@/lib/mockdata/dashboard";
import type { VaultItem } from "@/lib/types/dashboard";

export default function SearchAddressPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const router = useRouter();
  const [vault, setVault] = useState<VaultItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!address) return;

    const q = decodeURIComponent(address);
    let isMounted = true;

    setIsSearching(true);
    setError(null);

    setTimeout(() => {
      if (!isMounted) return;

      if (!q.startsWith("0x") || q.length < 6) {
        setError("Please enter a valid vault address (starting with 0x)");
        setIsSearching(false);
        return;
      }

      const found = dashboardVaults.find((v) =>
        v.addr.toLowerCase().includes(q.toLowerCase()),
      );

      if (found) {
        setVault(found);
      } else {
        setVault({
          addr: q.length > 12 ? shortAddress(q) : q,
          chain: "Ethereum Mainnet",
          status: "active",
          balance: "1,200 USDC / 0.5 WETH",
          rule: "Monitoring Active · Default Protection",
          lastExecution: "Never",
          pnl: "$0.00",
          pnlUp: true,
        });
      }

      setIsSearching(false);
    }, 800);

    return () => { isMounted = false; };
  }, [address]);

  if (isSearching) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl border border-danger/20 bg-danger/5 text-danger animate-in fade-in slide-in-from-top-2">
        <AlertCircle className="h-5 w-5" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!vault) return null;

  return (
    <VaultDetail
      vault={vault}
      onBack={() => router.push(ROUTES.SEARCH)}
    />
  );
}
