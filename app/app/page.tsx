import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";

const metrics = [
  { label: "Total Vaults", value: "12", sub: "3 paused" },
  { label: "Estimated TVL", value: "$128,430", sub: "+4.2% today" },
  { label: "24h Executions", value: "42", sub: "36 ✓ · 6 ✗", subColor: "text-muted" },
  { label: "Active Alerts", value: "2", sub: "unresolved", subColor: "text-warning" },
];

const health = [
  { label: "Backend API", value: "Healthy", color: "text-success", dot: "bg-success" },
  { label: "GraphQL lag", value: "2 blocks", color: "text-warning", dot: "bg-warning" },
  { label: "RPC", value: "Up", color: "text-success", dot: "bg-success" },
  { label: "Queue backlog", value: "4 jobs", color: "text-muted", dot: "bg-muted" },
];

const vaults = [
  {
    addr: "0x91f7...A4c2",
    chain: "Base Mainnet",
    status: "active" as const,
    balance: "3,200 USDC / 0.82 WETH",
    rule: "Buy < $1,900 · Sell > $2,350",
    lastExecution: "3m ago",
    pnl: "+$4,210",
    pnlUp: true,
  },
  {
    addr: "0x52c4...19f1",
    chain: "Base Sepolia",
    status: "paused" as const,
    balance: "500 USDC / 0.00 WETH",
    rule: "Buy < $1,850 · Sell > $2,100",
    lastExecution: "2h ago",
    pnl: "-$120",
    pnlUp: false,
  },
];

const activities = [
  { type: "SwapExecuted", vault: "0x91f7...A4c2", time: "2m ago", color: "text-success" },
  { type: "TokenRuleSet", vault: "0x52c4...19f1", time: "40m ago", color: "text-primary" },
  { type: "ShieldTriggered", vault: "0x91f7...A4c2", time: "3h ago", color: "text-warning" },
  { type: "ExecutionFailed", vault: "0xA8d3...F3b7", time: "5h ago", color: "text-danger" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-0.5 text-sm text-muted">Overview of all vaults and system health</p>
        </div>
        <Link
          href="/app/vault/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          + Create Vault
        </Link>
      </div>

      {/* Metric strip */}
      <div className="grid grid-cols-2 gap-px rounded-2xl border border-border bg-border md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col bg-card/90 px-5 py-4 first:rounded-l-2xl last:rounded-r-2xl">
            <p className="text-xs text-muted">{m.label}</p>
            <p className="mt-1 text-2xl font-bold">{m.value}</p>
            <p className={`mt-0.5 text-xs ${m.subColor ?? "text-success"}`}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Health strip */}
      <div className="rounded-2xl border border-border bg-card/80 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">System Health</p>
        <div className="grid gap-3 md:grid-cols-4">
          {health.map((h) => (
            <div key={h.label} className="flex items-center gap-2.5 rounded-xl border border-border bg-card-2/60 px-3 py-2.5">
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${h.dot}`} />
              <div className="min-w-0">
                <p className="text-xs text-muted">{h.label}</p>
                <p className={`text-sm font-semibold ${h.color}`}>{h.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vaults */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-semibold">Vaults</p>
            <p className="text-xs text-muted">Your automated vault positions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search address…"
            />
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted">
              <option>All chains</option>
              <option>Base Mainnet</option>
              <option>Arbitrum</option>
            </select>
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted">
              <option>All status</option>
              <option>Active</option>
              <option>Paused</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {vaults.map((v) => (
            <div
              key={v.addr}
              className="rounded-xl border border-border bg-card-2/40 p-4 transition-colors hover:border-primary/30 hover:bg-card-2/70"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm font-semibold">{v.addr}</p>
                    <StatusChip status={v.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{v.chain} · Last execution: {v.lastExecution}</p>
                </div>
                <span className={`text-sm font-bold ${v.pnlUp ? "text-success" : "text-danger"}`}>{v.pnl}</span>
              </div>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-card/40 px-3 py-2">
                  <p className="text-xs text-muted">Balance</p>
                  <p className="mt-0.5 text-sm">{v.balance}</p>
                </div>
                <div className="rounded-lg border border-border bg-card/40 px-3 py-2">
                  <p className="text-xs text-muted">Rule</p>
                  <p className="mt-0.5 text-sm">{v.rule}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Link
                  href={`/app/vault/${v.addr}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
                >
                  View
                </Link>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-warning/50 hover:text-warning">
                  {v.status === "active" ? "Pause" : "Unpause"}
                </button>
                <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  Execute
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity + Alerts */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Recent Activity</p>
              <p className="text-xs text-muted">Latest on-chain and execution events</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              Live
            </span>
          </div>
          <div className="space-y-2.5">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card-2/40 px-3 py-2.5">
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                  a.color === "text-success" ? "bg-success" :
                  a.color === "text-warning" ? "bg-warning" :
                  a.color === "text-danger" ? "bg-danger" : "bg-primary"
                }`} />
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-semibold ${a.color}`}>{a.type}</span>
                  <span className="ml-2 text-xs text-muted">{a.vault}</span>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">{a.time}</span>
              </div>
            ))}
          </div>
          <Link href="/app/notifications" className="mt-4 block text-center text-xs text-primary hover:underline">
            View all events →
          </Link>
        </div>

        {/* Alerts Summary */}
        <div className="rounded-2xl border border-border bg-card/80 p-5">
          <div className="mb-4">
            <p className="font-semibold">Alerts Summary</p>
            <p className="text-xs text-muted">Risk snapshot in the last 24h</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-card-2/40 px-3 py-2.5">
              <span className="text-xs text-muted">Total alerts</span>
              <span className="text-sm font-bold">8</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-warning/30 bg-warning/5 px-3 py-2.5">
              <span className="text-xs text-muted">Unresolved</span>
              <span className="text-sm font-bold text-warning">2</span>
            </div>
            <div className="rounded-lg border border-border bg-card-2/40 px-3 py-2.5">
              <p className="text-xs text-muted">Top failure reasons</p>
              <ul className="mt-2 space-y-1">
                {["SlippageTooHigh", "Stale oracle price", "Execution revert"].map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs">
                    <span className="h-1 w-1 rounded-full bg-danger" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
