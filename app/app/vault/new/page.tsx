import Link from "next/link";

const steps = [
  { n: 1, label: "Configuration" },
  { n: 2, label: "Strategy" },
  { n: 3, label: "Review" },
];

const networks = ["Base Mainnet", "Base Sepolia", "Arbitrum", "Ethereum", "Optimism"];

export default function CreateVaultPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/app"
          className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
        >
          ← Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Vault</h1>
          <p className="mt-0.5 text-sm text-muted">Deploy an automated vault with execution rules</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center">
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm ${
              s.n === 1
                ? "bg-primary/10 font-semibold text-primary"
                : "text-muted"
            }`}>
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                s.n === 1 ? "bg-primary text-white" : "border border-border text-muted"
              }`}>
                {s.n}
              </span>
              {s.label}
            </div>
            {i < steps.length - 1 && (
              <span className="mx-1 text-xs text-muted/40">——</span>
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        {/* Main form */}
        <div className="space-y-4">
          {/* Info banner */}
          <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
            <span className="mt-0.5 text-primary">ℹ</span>
            <p className="text-xs leading-relaxed text-muted">
              The executor address is pre-filled from your server bot configuration.
              You only need to define limits and choose a network.
            </p>
          </div>

          {/* Section: Vault config */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 text-sm font-semibold">Vault Configuration</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5 md:col-span-2">
                <span className="text-xs font-medium text-muted">Executor address (auto-filled)</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm font-mono text-muted focus:outline-none"
                  defaultValue="0xServerExecutor...auto"
                  readOnly
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Network</span>
                <select className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  {networks.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Automation caller (optional)</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm font-mono placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="0x…"
                />
              </label>
            </div>
          </div>

          {/* Section: Execution limits */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 text-sm font-semibold">Execution Limits</p>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Max trade amount per execution</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="1000"
                  />
                  <span className="flex items-center border-l border-border bg-card-2 px-3 text-xs text-muted">USDC</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Max slippage tolerance</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="0.5"
                  />
                  <span className="flex items-center border-l border-border bg-card-2 px-3 text-xs text-muted">%</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Cooldown between executions</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="300"
                  />
                  <span className="flex items-center border-l border-border bg-card-2 px-3 text-xs text-muted">sec</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium text-muted">Max daily executions</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="10"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Continue to Strategy →
            </button>
            <button className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-primary/50">
              Advanced settings
            </button>
          </div>
        </div>

        {/* Sidebar: Estimations */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 text-sm font-semibold">Estimated Costs</p>
            <div className="space-y-3">
              {[
                { label: "Deployment gas", value: "~0.002 ETH" },
                { label: "Avg execution gas", value: "~0.0004 ETH" },
                { label: "Chainlink upkeep", value: "~5 LINK / mo" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between text-xs">
                  <span className="text-muted">{r.label}</span>
                  <span className="font-mono font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-3 text-sm font-semibold">Checklist</p>
            <ul className="space-y-2">
              {[
                { label: "Wallet connected", done: true },
                { label: "Network selected", done: true },
                { label: "Executor configured", done: true },
                { label: "Trade limits set", done: false },
                { label: "Strategy defined", done: false },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-xs">
                  <span className={`h-1.5 w-1.5 rounded-full ${item.done ? "bg-success" : "bg-border"}`} />
                  <span className={item.done ? "text-foreground" : "text-muted"}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
