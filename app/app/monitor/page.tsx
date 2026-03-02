import { SectionCard } from "@/components/ui/section-card";
import { StatusChip } from "@/components/ui/status-chip";

const logs = [
  { type: "execution", status: "success" as const, note: "SwapExecuted" },
  { type: "execution", status: "failed" as const, note: "SlippageTooHigh" },
  { type: "risk", status: "queued" as const, note: "Alert scheduled" },
];

export default function MonitorPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Monitor" description="Execution logs + health view">
        <div className="space-y-2">
          {logs.map((l, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg border border-border bg-card-2/70 px-3 py-2">
              <span className="text-sm text-muted">{l.type} · {l.note}</span>
              <StatusChip status={l.status} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
