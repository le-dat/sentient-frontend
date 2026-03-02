import { StatusChip } from "@/components/ui/status-chip";
import { useMonitorViewModel } from "@/lib/view-models/use-monitor-view-model";

export default function MonitorPage() {
  const { chainHealth, logs, systemPanels } = useMonitorViewModel();
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Monitor</h1>
          <p className="mt-0.5 text-sm text-muted">Execution logs, chain health and system status</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-3 py-1.5 text-xs text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          All systems live
        </span>
      </div>

      {/* System status grid */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">System Status</p>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {systemPanels.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center rounded-xl border border-border bg-card-2/50 px-3 py-3.5 text-center transition-colors hover:border-border/80 hover:bg-card-2/70"
            >
              <span className="relative mb-2.5 flex h-2 w-2">
                {s.pulse && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-60`} />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
              </span>
              <p className="text-xs text-muted">{s.label}</p>
              <p className={`mt-0.5 text-xs font-semibold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chain health */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Chain Health</p>
            <p className="text-xs text-muted">RPC connectivity and block freshness</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-success">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Live
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {chainHealth.map((c) => (
            <div
              key={c.chain}
              className={`overflow-hidden rounded-xl border bg-card-2/40 transition-all hover:bg-card-2/70 ${
                c.status === "success" ? "border-border hover:border-success/30" : "border-warning/30 hover:border-warning/50"
              }`}
            >
              {/* Color top bar */}
              <div className={`h-0.5 w-full ${c.dot}`} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{c.chain}</p>
                  <StatusChip status={c.status} />
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">RPC</span>
                    <span className={c.status === "success" ? "text-success" : "text-warning"}>{c.rpc}</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Latency</span>
                      <span className={c.latencyPct > 50 ? "text-warning" : "text-foreground"}>{c.latency}</span>
                    </div>
                    {/* Latency bar */}
                    <div className="h-1 w-full overflow-hidden rounded-full bg-card-3">
                      <div
                        className={`h-full rounded-full transition-all ${c.latencyPct > 50 ? "bg-warning/70" : "bg-success/70"}`}
                        style={{ width: `${c.latencyPct}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Last block</span>
                    <span className="font-mono text-foreground/80">{c.lastBlock}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Execution log */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">Execution Log</p>
            <p className="text-xs text-muted">All recent on-chain events and executions</p>
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none focus:ring-1 focus:ring-primary">
              <option>All types</option>
              <option>Execution</option>
              <option>Risk</option>
            </select>
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none focus:ring-1 focus:ring-primary">
              <option>All status</option>
              <option>Success</option>
              <option>Failed</option>
              <option>Queued</option>
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="mb-2 hidden grid-cols-[1fr_1fr_100px_80px_80px] gap-4 rounded-lg bg-card-2/40 px-3 py-2 text-xs text-muted md:grid">
          <span>Event · Vault</span>
          <span>Chain · TX</span>
          <span>Gas</span>
          <span>Status</span>
          <span className="text-right">Time</span>
        </div>

        <div className="space-y-2">
          {logs.map((l) => (
            <div
              key={l.id}
              className={`overflow-hidden rounded-xl border transition-colors hover:bg-card-2/60 md:grid md:grid-cols-[1fr_1fr_100px_80px_80px] md:items-center md:gap-4 ${
                l.status === "failed"
                  ? "border-danger/20 bg-danger/3 hover:border-danger/30"
                  : l.status === "queued"
                  ? "border-warning/20 bg-warning/3 hover:border-warning/30"
                  : "border-border bg-card-2/30"
              }`}
            >
              <div className="px-3 pt-3 md:py-3 md:px-3">
                <p className="text-sm font-semibold">{l.event}</p>
                <p className="font-mono text-xs text-muted">{l.vault}</p>
              </div>
              <div className="px-3 py-1 md:py-3 md:px-0">
                <p className="text-xs text-muted">{l.chain}</p>
                <p className="font-mono text-xs text-primary">{l.tx}</p>
              </div>
              <p className="px-3 text-xs text-muted md:px-0 md:py-3">{l.gas}</p>
              <div className="px-3 pb-2 md:py-3 md:px-0">
                <StatusChip status={l.status} />
              </div>
              <p className="px-3 pb-3 text-xs text-muted md:py-3 md:px-0 md:text-right">{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
