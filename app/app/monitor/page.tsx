import { StatusChip } from "@/components/ui/status-chip";

const chainHealth = [
  { chain: "Base Mainnet", rpc: "Healthy", latency: "48ms", lastBlock: "12,841,002", color: "bg-success", status: "success" as const },
  { chain: "Arbitrum", rpc: "Healthy", latency: "61ms", lastBlock: "198,341,220", color: "bg-success", status: "success" as const },
  { chain: "Ethereum", rpc: "Degraded", latency: "210ms", lastBlock: "19,421,005", color: "bg-warning", status: "queued" as const },
  { chain: "Base Sepolia", rpc: "Healthy", latency: "55ms", lastBlock: "11,204,118", color: "bg-success", status: "success" as const },
];

const logs = [
  {
    id: "exec-001",
    type: "execution",
    status: "success" as const,
    event: "SwapExecuted",
    vault: "0x91f7...A4c2",
    chain: "Base Mainnet",
    tx: "0xabc...def1",
    time: "2m ago",
    gas: "0.00042 ETH",
  },
  {
    id: "exec-002",
    type: "execution",
    status: "failed" as const,
    event: "SlippageTooHigh",
    vault: "0x52c4...19f1",
    chain: "Base Sepolia",
    tx: "0xfff...0001",
    time: "18m ago",
    gas: "—",
  },
  {
    id: "risk-001",
    type: "risk",
    status: "queued" as const,
    event: "ShieldTriggered",
    vault: "0x91f7...A4c2",
    chain: "Base Mainnet",
    tx: "—",
    time: "1h ago",
    gas: "—",
  },
  {
    id: "exec-003",
    type: "execution",
    status: "success" as const,
    event: "SwapExecuted",
    vault: "0xA8d3...F3b7",
    chain: "Ethereum",
    tx: "0x123...ab99",
    time: "3h ago",
    gas: "0.00081 ETH",
  },
  {
    id: "exec-004",
    type: "execution",
    status: "failed" as const,
    event: "ExecutionRevert",
    vault: "0x52c4...19f1",
    chain: "Arbitrum",
    tx: "0xdeadbeef",
    time: "5h ago",
    gas: "—",
  },
];

const systemPanels = [
  { label: "Backend API", value: "Operational", color: "text-success", dot: "bg-success" },
  { label: "GraphQL Indexer", value: "2 block lag", color: "text-warning", dot: "bg-warning" },
  { label: "Chainlink Oracle", value: "Fresh", color: "text-success", dot: "bg-success" },
  { label: "Job Queue", value: "4 pending", color: "text-muted", dot: "bg-muted" },
  { label: "Telegram Bot", value: "Connected", color: "text-success", dot: "bg-success" },
  { label: "Automation Node", value: "Running", color: "text-success", dot: "bg-success" },
];

export default function MonitorPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Monitor</h1>
        <p className="mt-0.5 text-sm text-muted">Execution logs, chain health and system status</p>
      </div>

      {/* System status grid */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">System Status</p>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {systemPanels.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card-2/50 px-3 py-3 text-center">
              <span className={`mx-auto mb-2 block h-2 w-2 rounded-full ${s.dot}`} />
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
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Live
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {chainHealth.map((c) => (
            <div key={c.chain} className="rounded-xl border border-border bg-card-2/40 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{c.chain}</p>
                <StatusChip status={c.status} />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">RPC</span>
                  <span className={c.status === "success" ? "text-success" : "text-warning"}>{c.rpc}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Latency</span>
                  <span>{c.latency}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Last block</span>
                  <span className="font-mono">{c.lastBlock}</span>
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
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none">
              <option>All types</option>
              <option>Execution</option>
              <option>Risk</option>
            </select>
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none">
              <option>All status</option>
              <option>Success</option>
              <option>Failed</option>
              <option>Queued</option>
            </select>
          </div>
        </div>

        {/* Table header */}
        <div className="mb-2 hidden grid-cols-[1fr_1fr_100px_80px_80px] gap-4 px-3 text-xs text-muted md:grid">
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
              className="rounded-xl border border-border bg-card-2/40 px-3 py-3 transition-colors hover:bg-card-2/70 md:grid md:grid-cols-[1fr_1fr_100px_80px_80px] md:items-center md:gap-4"
            >
              <div>
                <p className="text-sm font-semibold">{l.event}</p>
                <p className="font-mono text-xs text-muted">{l.vault}</p>
              </div>
              <div className="mt-1 md:mt-0">
                <p className="text-xs text-muted">{l.chain}</p>
                <p className="font-mono text-xs text-primary">{l.tx}</p>
              </div>
              <p className="mt-1 text-xs text-muted md:mt-0">{l.gas}</p>
              <div className="mt-2 md:mt-0">
                <StatusChip status={l.status} />
              </div>
              <p className="mt-1 text-xs text-muted md:mt-0 md:text-right">{l.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
