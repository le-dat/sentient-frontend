"use client";

import { useState } from "react";
import { useDashboardViewModel } from "@/lib/view-models/use-dashboard-view-model";
import { MetricCardItem } from "@/components/dashboard/metric-card";
import { VaultCard } from "@/components/dashboard/vault-card";
import { VaultPanel } from "@/components/dashboard/vault-panel";
import type { VaultItem } from "@/lib/types/dashboard";

export default function DashboardPage() {
  const { metrics, vaults } = useDashboardViewModel();
  const [selected, setSelected] = useState<VaultItem | null>(null);

  return (
    <>
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCardItem key={m.label} metric={m} />
          ))}
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          {vaults.map((v) => (
            <VaultCard key={v.addr} vault={v} onSelect={setSelected} />
          ))}
        </div>
      </div>

      {selected && <VaultPanel vault={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
