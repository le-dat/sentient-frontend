"use client";

import { VaultDetail } from "@/features/search";
import { SearchDetailSkeleton } from "@/features/search/components/search-detail-skeleton";
import { useVaultDetail, useVaultHistory } from "@/lib/api/hooks";
import { ROUTES } from "@/lib/constants/routes";
import { isValidAddress } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function SearchAddressPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const router = useRouter();
  const decoded = decodeURIComponent(address ?? "");

  const { data: vault, isLoading: vaultLoading, error: vaultError } = useVaultDetail(decoded);

  const { data: historyData } = useVaultHistory(decoded, {
    limit: 50,
    chain: vault?.chain_id,
  });

  const history = historyData?.items ?? [];

  if (!decoded || decoded.length < 6) {
    return (
      <div className="border-danger/20 bg-danger/5 text-danger animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-xl border p-4">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">Please enter a valid vault address.</p>
      </div>
    );
  }

  if (!isValidAddress(decoded)) {
    return (
      <div className="border-danger/20 bg-danger/5 text-danger animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-xl border p-4">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Invalid address format. Use full 0x + 40 hex characters.
        </p>
      </div>
    );
  }

  if (vaultLoading) {
    return <SearchDetailSkeleton />;
  }

  if (vaultError) {
    const err = vaultError as { detail?: string; status?: number };
    const msg =
      typeof err.detail === "string"
        ? err.detail
        : err.status === 404
          ? "Vault not found"
          : err.status === 409
            ? "Address exists on multiple chains. Add ?chain=<chainId> to the URL."
            : "Failed to load vault";
    return (
      <div className="border-danger/20 bg-danger/5 text-danger animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-xl border p-4">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{msg}</p>
      </div>
    );
  }

  if (!vault) return null;

  return <VaultDetail vault={vault} history={history} onBack={() => router.push(ROUTES.SEARCH)} />;
}
