import { SectionCard } from "@/components/ui/section-card";
import { StatusChip } from "@/components/ui/status-chip";

const topCards = [
  { label: "Total Vaults", value: "12" },
  { label: "Active / Paused", value: "9 / 3" },
  { label: "Estimated TVL", value: "$128,430" },
  { label: "24h Executions", value: "42 (36 ✅ / 6 ❌)" },
];

const vaults = [
  {
    addr: "0x91...A4",
    chain: "Base Mainnet",
    status: "active" as const,
    balance: "3,200 USDC / 0.82 WETH",
    rule: "Buy < 1,900 • Sell > 2,350",
    lastExecution: "3m ago",
  },
  {
    addr: "0x52...19",
    chain: "Base Sepolia",
    status: "paused" as const,
    balance: "500 USDC / 0.00 WETH",
    rule: "Buy < 1,850 • Sell > 2,100",
    lastExecution: "2h ago",
  },
];

const activities = [
  { type: "SwapExecuted", vault: "0x91...A4", time: "2m ago" },
  { type: "TokenRuleSet", vault: "0x52...19", time: "40m ago" },
  { type: "ShieldTriggered", vault: "0x91...A4", time: "3h ago" },
  { type: "ExecutionFailed", vault: "0xA8...F3", time: "5h ago" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Dashboard" description="Overview → Status → Actions">
        <div className="grid gap-3 md:grid-cols-4">
          {topCards.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-card-2/70 p-4">
              <p className="text-xs text-muted">{c.label}</p>
              <p className="mt-2 text-lg font-semibold">{c.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Health Strip" description="Operational status for quick troubleshooting">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">Backend API: <span className="text-success">Healthy</span></div>
          <div className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">GraphQL lag: <span className="text-warning">2 blocks</span></div>
          <div className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">RPC: <span className="text-success">Up</span></div>
          <div className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">Queue backlog: <span className="text-muted">4 jobs</span></div>
        </div>
      </SectionCard>

      <SectionCard title="Vaults" description="Main vault table with quick actions">
        <div className="mb-3 grid gap-2 md:grid-cols-4">
          <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm" placeholder="Search vault address" />
          <select className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm"><option>All chains</option></select>
          <select className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm"><option>All status</option></select>
          <select className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm"><option>Sort: recent update</option></select>
        </div>

        <div className="space-y-3">
          {vaults.map((v) => (
            <div key={v.addr} className="rounded-xl border border-border bg-card-2/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-sm">{v.addr}</p>
                  <p className="text-xs text-muted">{v.chain} • Last execution: {v.lastExecution}</p>
                </div>
                <StatusChip status={v.status} />
              </div>

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <p className="text-sm text-muted">Balance: {v.balance}</p>
                <p className="text-sm text-muted">Rule: {v.rule}</p>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="rounded-lg border border-border px-3 py-1.5 text-sm">View</button>
                <button className="rounded-lg border border-border px-3 py-1.5 text-sm">Pause/Unpause</button>
                <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-white">Execute</button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-5 md:grid-cols-2">
        <SectionCard title="Recent Activity" description="Latest on-chain and execution events">
          <div className="space-y-2">
            {activities.map((a, i) => (
              <div key={i} className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">
                <span className="font-medium">{a.type}</span> • {a.vault}
                <span className="ml-2 text-xs text-muted">{a.time}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Alerts Summary" description="Risk snapshot in the last 24h">
          <div className="space-y-2 text-sm">
            <p>Total alerts: <span className="font-semibold">8</span></p>
            <p>Unresolved: <span className="font-semibold text-warning">2</span></p>
            <p>Top fail reasons:</p>
            <ul className="list-disc pl-5 text-muted">
              <li>SlippageTooHigh</li>
              <li>Stale oracle price</li>
              <li>Execution revert</li>
            </ul>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
