import Link from "next/link";
import { StatusChip } from "@/components/ui/status-chip";

const tabs = ["Overview", "Strategy", "History", "Settings"];

const overviewStats = [
  { label: "Total Value Locked", value: "$3,200,000", sub: "+4.2% today", subColor: "text-success", border: "border-success/30", gradient: "from-success/8" },
  { label: "Total P&L", value: "+$42,810", sub: "All time", subColor: "text-success", border: "border-success/30", gradient: "from-success/8" },
  { label: "Executions", value: "2,195", sub: "Lifetime", subColor: "text-muted", border: "border-border/60", gradient: "from-card-2/40" },
  { label: "Success Rate", value: "96.4%", sub: "Last 30 days", subColor: "text-primary", border: "border-primary/30", gradient: "from-primary/8" },
];

const allocation = [
  { token: "USDC", amount: "3,200", pct: 78, color: "bg-primary", textColor: "text-primary" },
  { token: "WETH", amount: "0.82", pct: 22, color: "bg-success", textColor: "text-success" },
];

const history = [
  { type: "SwapExecuted", from: "USDC → WETH", price: "$1,892.40", gas: "0.00041 ETH", status: "success" as const, time: "2m ago" },
  { type: "SwapExecuted", from: "WETH → USDC", price: "$2,381.00", gas: "0.00038 ETH", status: "success" as const, time: "3h ago" },
  { type: "ExecutionFailed", from: "USDC → WETH", price: "—", gas: "—", status: "failed" as const, time: "6h ago" },
  { type: "SwapExecuted", from: "USDC → WETH", price: "$1,887.20", gas: "0.00042 ETH", status: "success" as const, time: "1d ago" },
];

const strategy = [
  { label: "Buy rule", value: "Price < $1,900", color: "text-success", variant: "buy" },
  { label: "Sell rule", value: "Price > $2,350", color: "text-danger", variant: "sell" },
  { label: "Max per trade", value: "1,000 USDC", color: "", variant: "neutral" },
  { label: "Slippage tolerance", value: "0.5%", color: "", variant: "neutral" },
  { label: "Cooldown", value: "300 seconds", color: "", variant: "neutral" },
  { label: "Max daily executions", value: "10", color: "", variant: "neutral" },
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
            <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <span className="text-border">/</span>
            <span className="font-mono text-foreground">{address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-2xl font-bold">{address}</h1>
            <StatusChip status="active" />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            Base Mainnet · Last execution: 2m ago
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-warning/50 hover:bg-warning/5 hover:text-warning">
            Pause Vault
          </button>
          <button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95">
            Execute Now
          </button>
        </div>
      </div>

      {/* Metric strip — individual gradient cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {overviewStats.map((s) => (
          <div
            key={s.label}
            className={`rounded-2xl border bg-gradient-to-br ${s.gradient} to-transparent bg-card/90 px-5 py-4 ${s.border}`}
          >
            <p className="text-xs text-muted">{s.label}</p>
            <p className="mt-1 text-xl font-bold">{s.value}</p>
            <p className={`mt-0.5 text-xs ${s.subColor}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs — underline active indicator */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            className={`relative px-4 py-2.5 text-sm transition-colors ${
              t === activeTab
                ? "font-semibold text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t}
            {t === activeTab && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-t-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content: Overview + Strategy side-by-side */}
      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* Overview: Allocation + History */}
        <div className="space-y-5">
          {/* Allocation */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 font-semibold">Token Allocation</p>
            {/* Segmented bar */}
            <div className="flex h-3 overflow-hidden rounded-full">
              {allocation.map((a) => (
                <div key={a.token} className={`${a.color} transition-all`} style={{ width: `${a.pct}%` }} />
              ))}
            </div>
            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-4">
              {allocation.map((a) => (
                <div key={a.token} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${a.color}`} />
                  <span className="text-sm font-semibold">{a.token}</span>
                  <span className="text-xs text-muted">{a.amount}</span>
                  <span className={`text-xs font-semibold ${a.textColor}`}>{a.pct}%</span>
                </div>
              ))}
            </div>
            {/* Balance cards */}
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {allocation.map((a) => (
                <div key={a.token} className="rounded-xl border border-border bg-card-2/40 px-4 py-3 transition-colors hover:bg-card-2/60">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${a.color}`} />
                    <p className="text-xs text-muted">{a.token}</p>
                  </div>
                  <p className="mt-1 text-lg font-bold">{a.amount}</p>
                  <p className={`text-xs font-medium ${a.textColor}`}>{a.pct}% of vault</p>
                </div>
              ))}
            </div>
          </div>

          {/* Execution History */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Execution History</p>
              <select className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-xs text-muted focus:outline-none focus:ring-1 focus:ring-primary">
                <option>All events</option>
                <option>Swaps only</option>
                <option>Failed only</option>
              </select>
            </div>

            {/* Column headers */}
            <div className="mb-2 hidden grid-cols-[1fr_1fr_80px_80px] gap-3 rounded-lg bg-card-2/40 px-4 py-2 text-xs text-muted md:grid">
              <span>Type · Direction</span>
              <span>Price</span>
              <span>Status</span>
              <span className="text-right">Time</span>
            </div>

            <div className="space-y-2">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl border transition-colors hover:bg-card-2/60 md:grid md:grid-cols-[1fr_1fr_80px_80px] md:items-center md:gap-3 ${
                    h.status === "failed"
                      ? "border-danger/20 bg-danger/3"
                      : "border-border bg-card-2/30"
                  }`}
                >
                  <div className="px-4 pt-3 md:py-3">
                    <p className="text-sm font-semibold">{h.type}</p>
                    <p className="text-xs text-muted">{h.from}</p>
                  </div>
                  <div className="hidden px-0 md:block md:py-3">
                    <p className="text-xs text-muted">Price</p>
                    <p className="font-mono text-sm">{h.price}</p>
                  </div>
                  <div className="px-4 py-2 md:py-3 md:px-0">
                    <StatusChip status={h.status} />
                  </div>
                  <p className="px-4 pb-3 text-xs text-muted md:py-3 md:px-0 md:text-right">{h.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategy sidebar */}
        <div className="space-y-4">
          {/* Strategy Rules */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Strategy Rules</p>
              <button className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary">
                Edit
              </button>
            </div>
            <div className="space-y-2">
              {strategy.map((s) => (
                <div
                  key={s.label}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2.5 ${
                    s.variant === "buy"
                      ? "border-success/20 bg-success/5"
                      : s.variant === "sell"
                      ? "border-danger/20 bg-danger/5"
                      : "border-border bg-card-2/40"
                  }`}
                >
                  <span className="text-xs text-muted">{s.label}</span>
                  <span className={`text-xs font-semibold ${s.color || "text-foreground"}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Automation */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-3 font-semibold">Automation</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-border bg-card-2/40 px-3 py-2">
                <span className="text-muted">Chainlink Upkeep</span>
                <span className="flex items-center gap-1.5 text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card-2/40 px-3 py-2">
                <span className="text-muted">Executor</span>
                <span className="font-mono text-primary">0xServer…auto</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-card-2/40 px-3 py-2">
                <span className="text-muted">LINK balance</span>
                <span className="font-semibold">12.4 LINK</span>
              </div>
            </div>
            <button className="mt-4 w-full rounded-xl border border-border py-2 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary">
              Top up LINK
            </button>
          </div>

          {/* Danger Zone */}
          <div className="overflow-hidden rounded-2xl border border-danger/20 bg-danger/5">
            <div className="h-0.5 w-full bg-gradient-to-r from-danger/50 to-transparent" />
            <div className="p-5">
              <p className="mb-2 text-sm font-semibold text-danger">Danger Zone</p>
              <p className="mb-3 text-xs text-muted">Permanently close the vault and withdraw all assets.</p>
              <button className="w-full rounded-xl border border-danger/30 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10">
                Withdraw All &amp; Close Vault
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
