import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";

const tabs = ["Overview", "Strategy", "History", "Settings"];

const overviewStats = [
  { label: "Total Value Locked", value: "$3,200,000", sub: "+4.2% today", subColor: "text-success" },
  { label: "Total P&L", value: "+$42,810", sub: "All time", subColor: "text-success" },
  { label: "Executions", value: "2,195", sub: "Lifetime", subColor: "text-muted" },
  { label: "Success Rate", value: "96.4%", sub: "Last 30 days", subColor: "text-muted" },
];

const allocation = [
  { token: "USDC", amount: "3,200", pct: 78, color: "bg-primary" },
  { token: "WETH", amount: "0.82", pct: 22, color: "bg-success" },
];

const history = [
  { type: "SwapExecuted", from: "USDC → WETH", price: "$1,892.40", gas: "0.00041 ETH", status: "success" as const, time: "2m ago" },
  { type: "SwapExecuted", from: "WETH → USDC", price: "$2,381.00", gas: "0.00038 ETH", status: "success" as const, time: "3h ago" },
  { type: "ExecutionFailed", from: "USDC → WETH", price: "—", gas: "—", status: "failed" as const, time: "6h ago" },
  { type: "SwapExecuted", from: "USDC → WETH", price: "$1,887.20", gas: "0.00042 ETH", status: "success" as const, time: "1d ago" },
];

const strategy = [
  { label: "Buy rule", value: "Price < $1,900", color: "text-success" },
  { label: "Sell rule", value: "Price > $2,350", color: "text-danger" },
  { label: "Max per trade", value: "1,000 USDC", color: "" },
  { label: "Slippage tolerance", value: "0.5%", color: "" },
  { label: "Cooldown", value: "300 seconds", color: "" },
  { label: "Max daily executions", value: "10", color: "" },
];

export default function VaultDetailPage({ params }: { params: { address: string } }) {
  const { address } = params;
  const activeTab = "Overview";

  return (
    <div className="space-y-5">
      {/* Breadcrumb + header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-muted">
            <Link href="/dashboard" className="hover:text-foreground">Dashboard</Link>
            <span>/</span>
            <span className="font-mono text-foreground">{address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-2xl font-bold">{address}</h1>
            <StatusChip status="active" />
          </div>
          <p className="mt-1 text-xs text-muted">Base Mainnet · Last execution: 2m ago</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-warning/50 hover:text-warning">
            Pause Vault
          </button>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Execute Now
          </button>
        </div>
      </div>

      {/* Metric strip */}
      <div className="grid grid-cols-2 gap-px rounded-2xl border border-border bg-border md:grid-cols-4">
        {overviewStats.map((s) => (
          <div key={s.label} className="flex flex-col bg-card/90 px-5 py-4 first:rounded-l-2xl last:rounded-r-2xl">
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
            <p className={`mt-0.5 text-xs ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-border bg-card/60 p-1">
        {tabs.map((t) => (
          <button
            key={t}
            className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${
              t === activeTab
                ? "bg-card font-semibold text-foreground shadow"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content: Overview + Strategy side-by-side */}
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Overview: Allocation + History */}
        <div className="space-y-5">
          {/* Allocation */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 font-semibold">Token Allocation</p>
            <div className="space-y-4">
              {/* Bar */}
              <div className="flex h-3 overflow-hidden rounded-full">
                {allocation.map((a) => (
                  <div key={a.token} className={`${a.color} transition-all`} style={{ width: `${a.pct}%` }} />
                ))}
              </div>
              {/* Legend */}
              <div className="flex flex-wrap gap-4">
                {allocation.map((a) => (
                  <div key={a.token} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${a.color}`} />
                    <span className="text-sm font-semibold">{a.token}</span>
                    <span className="text-xs text-muted">{a.amount}</span>
                    <span className="text-xs text-muted">({a.pct}%)</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance detail */}
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {allocation.map((a) => (
                <div key={a.token} className="rounded-xl border border-border bg-card-2/40 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${a.color}`} />
                    <p className="text-xs text-muted">{a.token}</p>
                  </div>
                  <p className="mt-1 text-lg font-bold">{a.amount}</p>
                  <p className="text-xs text-muted">{a.pct}% of vault</p>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Execution History</p>
              <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none">
                <option>All events</option>
                <option>Swaps only</option>
                <option>Failed only</option>
              </select>
            </div>
            <div className="space-y-2">
              {history.map((h, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border border-border bg-card-2/40 px-4 py-3 md:grid-cols-[1fr_1fr_80px_80px]"
                >
                  <div>
                    <p className="text-sm font-semibold">{h.type}</p>
                    <p className="text-xs text-muted">{h.from}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-xs text-muted">Price</p>
                    <p className="text-sm font-mono">{h.price}</p>
                  </div>
                  <div className="flex items-center md:justify-center">
                    <StatusChip status={h.status} />
                  </div>
                  <p className="text-right text-xs text-muted md:text-right">{h.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Strategy Rules</p>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
            <div className="space-y-2.5">
              {strategy.map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-lg border border-border bg-card-2/40 px-3 py-2">
                  <span className="text-xs text-muted">{s.label}</span>
                  <span className={`text-xs font-semibold ${s.color || "text-foreground"}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-3 font-semibold">Automation</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted">Chainlink Upkeep</span>
                <span className="flex items-center gap-1.5 text-success">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Executor</span>
                <span className="font-mono text-primary">0xServer…auto</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">LINK balance</span>
                <span className="font-semibold">12.4 LINK</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-xl border border-border py-2 text-xs font-medium transition-colors hover:border-primary/50">
              Top up LINK
            </button>
          </div>

          <div className="rounded-2xl border border-danger/20 bg-danger/5 p-5">
            <p className="mb-3 text-sm font-semibold text-danger">Danger Zone</p>
            <button className="w-full rounded-xl border border-danger/30 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10">
              Withdraw All & Close Vault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
