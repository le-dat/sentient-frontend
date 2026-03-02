import { SectionCard } from "@/components/ui/section-card";
import { StatusChip } from "@/components/ui/status-chip";

const vaults = [
  { addr: "0x91..A4", chain: "Base Sepolia", status: "active" as const },
  { addr: "0x52..19", chain: "Sepolia", status: "paused" as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Dashboard" description="Vault overview (GraphQL read path)">
        <div className="grid gap-3 md:grid-cols-2">
          {vaults.map((v) => (
            <div key={v.addr} className="rounded-xl border border-border bg-card-2/70 p-4">
              <p className="text-xs text-muted">{v.chain}</p>
              <p className="mt-1 font-mono text-sm">{v.addr}</p>
              <div className="mt-2">
                <StatusChip status={v.status} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
