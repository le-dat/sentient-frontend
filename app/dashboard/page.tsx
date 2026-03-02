import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";

const metrics = [
  {
    label: "Total Vaults",
    value: "12",
    sub: "3 paused",
    subColor: "text-muted",
    border: "border-primary/30",
    gradient: "from-primary/8 to-transparent",
    iconColor: "text-primary",
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <rect x="1" y="1" width="6" height="6" rx="1.5" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Estimated TVL",
    value: "$128,430",
    sub: "+4.2% today",
    subColor: "text-success",
    border: "border-success/30",
    gradient: "from-success/8 to-transparent",
    iconColor: "text-success",
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.5 11.5v.5a.5.5 0 01-1 0v-.5A1.5 1.5 0 016 10a.5.5 0 011 0 .5.5 0 001 0c0-.276-.224-.5-.5-.5h-.5a1.5 1.5 0 010-3v-.5a.5.5 0 011 0V6a1.5 1.5 0 011 1.5.5.5 0 01-1 0 .5.5 0 00-.5-.5H8a.5.5 0 000 1h.5A1.5 1.5 0 018.5 11.5z" />
      </svg>
    ),
  },
  {
    label: "24h Executions",
    value: "42",
    sub: "36 ✓ · 6 ✗",
    subColor: "text-muted",
    border: "border-border/60",
    gradient: "from-card-2/40 to-transparent",
    iconColor: "text-muted",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M1 10l2.5-4.5L6 8.5 9 3l3.5 8.5 1-2" />
      </svg>
    ),
  },
  {
    label: "Active Alerts",
    value: "2",
    sub: "unresolved",
    subColor: "text-warning",
    border: "border-warning/30",
    gradient: "from-warning/8 to-transparent",
    iconColor: "text-warning",
    icon: (
      <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
        <path d="M8 1.5A4.5 4.5 0 003.5 6v2.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 008 1.5z" />
        <path d="M6.5 13.5a1.5 1.5 0 003 0H6.5z" />
      </svg>
    ),
  },
];

const health = [
  { label: "Backend API", value: "Healthy", color: "text-success", dot: "bg-success", pulse: true },
  { label: "GraphQL lag", value: "2 blocks", color: "text-warning", dot: "bg-warning", pulse: false },
  { label: "RPC", value: "Up", color: "text-success", dot: "bg-success", pulse: true },
  { label: "Queue backlog", value: "4 jobs", color: "text-muted", dot: "bg-muted", pulse: false },
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
  { type: "SwapExecuted", vault: "0x91f7...A4c2", time: "2m ago", dotColor: "bg-success", textColor: "text-success" },
  { type: "TokenRuleSet", vault: "0x52c4...19f1", time: "40m ago", dotColor: "bg-primary", textColor: "text-primary" },
  { type: "ShieldTriggered", vault: "0x91f7...A4c2", time: "3h ago", dotColor: "bg-warning", textColor: "text-warning" },
  { type: "ExecutionFailed", vault: "0xA8d3...F3b7", time: "5h ago", dotColor: "bg-danger", textColor: "text-danger" },
];

const alertReasons = ["SlippageTooHigh", "Stale oracle price", "Execution revert"];

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
          href="/dashboard/vault/new"
          className="rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95"
        >
          + Create Vault
        </Link>
      </div>

      {/* Metric cards — individual with per-color accent */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className={`rounded-2xl border bg-gradient-to-br ${m.gradient} ${m.border} bg-card/90 px-5 py-4`}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-muted">{m.label}</p>
              <span className={m.iconColor}>{m.icon}</span>
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className={`mt-0.5 text-xs ${m.subColor}`}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Health strip */}
      <div className="rounded-2xl border border-border bg-card/80 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">System Health</p>
        <div className="grid gap-3 md:grid-cols-4">
          {health.map((h) => (
            <div key={h.label} className="flex items-center gap-2.5 rounded-xl border border-border bg-card-2/60 px-3 py-2.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                {h.pulse && (
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${h.dot} opacity-60`} />
                )}
                <span className={`relative inline-flex h-2 w-2 rounded-full ${h.dot}`} />
              </span>
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
            <p className="font-semibold">Your Vaults</p>
            <p className="text-xs text-muted">Automated vault positions</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Search address…"
            />
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none">
              <option>All chains</option>
              <option>Base Mainnet</option>
              <option>Arbitrum</option>
            </select>
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none">
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
              className={`overflow-hidden rounded-xl border bg-card-2/40 transition-all hover:bg-card-2/70 ${
                v.status === "active"
                  ? "border-border hover:border-success/30"
                  : "border-border hover:border-warning/30"
              }`}
            >
              {/* Status accent bar */}
              <div className={`h-0.5 w-full ${v.status === "active" ? "bg-success/50" : "bg-warning/50"}`} />

              <div className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-semibold">{v.addr}</p>
                      <StatusChip status={v.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {v.chain} · Last execution: {v.lastExecution}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${v.pnlUp ? "text-success" : "text-danger"}`}>
                    {v.pnlUp ? "▲" : "▼"} {v.pnl}
                  </span>
                </div>

                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-card/40 px-3 py-2">
                    <p className="text-xs text-muted">Balance</p>
                    <p className="mt-0.5 text-sm font-medium">{v.balance}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-card/40 px-3 py-2">
                    <p className="text-xs text-muted">Rule</p>
                    <p className="mt-0.5 text-sm font-medium">{v.rule}</p>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/dashboard/vault/${v.addr}`}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    View Details
                  </Link>
                  <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:border-warning/50 hover:text-warning">
                    {v.status === "active" ? "Pause" : "Unpause"}
                  </button>
                  <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
                    Execute
                  </button>
                </div>
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
            <span className="flex items-center gap-1.5 rounded-full border border-success/20 bg-success/5 px-2.5 py-1 text-xs text-success">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Live
            </span>
          </div>
          <div className="space-y-2">
            {activities.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card-2/30 px-3 py-2.5 transition-colors hover:bg-card-2/60">
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.dotColor}`} />
                <div className="min-w-0 flex-1">
                  <span className={`text-xs font-semibold ${a.textColor}`}>{a.type}</span>
                  <span className="ml-2 text-xs text-muted">{a.vault}</span>
                </div>
                <span className="whitespace-nowrap text-xs text-muted">{a.time}</span>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/notifications"
            className="mt-4 flex items-center justify-center gap-1 text-xs text-primary transition-colors hover:text-primary/80"
          >
            View all events
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-3 w-3">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
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
              <span className="flex items-center gap-2 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-warning" />
                Unresolved
              </span>
              <span className="text-sm font-bold text-warning">2</span>
            </div>
            <div className="rounded-lg border border-border bg-card-2/40 px-3 py-2.5">
              <p className="text-xs text-muted">Top failure reasons</p>
              <ul className="mt-2 space-y-1.5">
                {alertReasons.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-danger/70" />
                    <span className="text-foreground/80">{r}</span>
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
