import Link from "next/link";

const steps = [
  { n: 1, label: "Configuration" },
  { n: 2, label: "Strategy" },
  { n: 3, label: "Review" },
];

const networks = ["Base Mainnet", "Base Sepolia", "Arbitrum", "Ethereum", "Optimism"];

const estimatedCosts = [
  { label: "Deployment gas", value: "~0.002 ETH", sub: "one-time" },
  { label: "Avg execution gas", value: "~0.0004 ETH", sub: "per execution" },
  { label: "Chainlink upkeep", value: "~5 LINK", sub: "per month" },
];

const checklist = [
  { label: "Wallet connected", done: true },
  { label: "Network selected", done: true },
  { label: "Executor configured", done: true },
  { label: "Trade limits set", done: false },
  { label: "Strategy defined", done: false },
];

export default function CreateVaultPage() {
  const currentStep = 1;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-border/80 hover:text-foreground"
        >
          <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-3 w-3">
            <path d="M8 2L4 6l4 4" />
          </svg>
          Back
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create Vault</h1>
          <p className="mt-0.5 text-sm text-muted">Deploy an automated vault with execution rules</p>
        </div>
      </div>

      {/* Step indicator — connected nodes */}
      <div className="flex items-center">
        {steps.map((s, i) => {
          const done = s.n < currentStep;
          const active = s.n === currentStep;
          return (
            <div key={s.n} className="flex flex-1 items-center">
              <div className="flex items-center gap-2.5">
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : done
                      ? "bg-success text-white"
                      : "border border-border bg-card-2 text-muted"
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  ) : (
                    s.n
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    active ? "text-foreground" : done ? "text-success" : "text-muted"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="mx-3 flex-1">
                  <div className={`h-px ${done ? "bg-success/50" : "bg-border/60"}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* Main form */}
        <div className="space-y-4">
          {/* Info banner */}
          <div className="flex gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5">
            <svg viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 12v.25a.75.75 0 01-1.5 0V12a.75.75 0 011.5 0zM8 4.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 4.5z" />
            </svg>
            <p className="text-xs leading-relaxed text-muted">
              The executor address is pre-filled from your server bot configuration.
              You only need to define limits and choose a network.
            </p>
          </div>

          {/* Section: Vault config */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">1</span>
              <p className="text-sm font-semibold">Vault Configuration</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5 md:col-span-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Executor address (auto-filled)</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 font-mono text-sm text-muted focus:outline-none"
                  defaultValue="0xServerExecutor...auto"
                  readOnly
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Network</span>
                <select className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  {networks.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Automation caller (optional)</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 font-mono text-sm placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="0x…"
                />
              </label>
            </div>
          </div>

          {/* Section: Execution limits */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-card-2 text-[10px] font-bold text-muted">2</span>
              <p className="text-sm font-semibold">Execution Limits</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Max trade per execution</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="1000"
                  />
                  <span className="flex items-center border-l border-border bg-card-2/80 px-3 text-xs font-medium text-muted">USDC</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Max slippage tolerance</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="0.5"
                  />
                  <span className="flex items-center border-l border-border bg-card-2/80 px-3 text-xs font-medium text-muted">%</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Cooldown between executions</span>
                <div className="flex overflow-hidden rounded-xl border border-border bg-card-2/70 focus-within:ring-1 focus-within:ring-primary">
                  <input
                    className="flex-1 bg-transparent px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none"
                    placeholder="300"
                  />
                  <span className="flex items-center border-l border-border bg-card-2/80 px-3 text-xs font-medium text-muted">sec</span>
                </div>
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Max daily executions</span>
                <input
                  className="rounded-xl border border-border bg-card-2/70 px-3 py-2.5 text-sm placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="10"
                />
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95">
              Continue to Strategy →
            </button>
            <button className="rounded-xl border border-border px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:border-primary/50 hover:text-foreground">
              Advanced settings
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Estimated Costs */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-4 text-sm font-semibold">Estimated Costs</p>
            <div className="space-y-2.5">
              {estimatedCosts.map((r) => (
                <div key={r.label} className="flex items-start justify-between gap-2 rounded-lg border border-border/60 bg-card-2/40 px-3 py-2.5">
                  <div>
                    <p className="text-xs text-muted">{r.label}</p>
                    <p className="mt-0.5 text-[11px] text-muted/60">{r.sub}</p>
                  </div>
                  <span className="font-mono text-sm font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div className="rounded-2xl border border-border bg-card/80 p-5">
            <p className="mb-3 text-sm font-semibold">Checklist</p>
            <ul className="space-y-2.5">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5 text-xs">
                  <span
                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                      item.done ? "bg-success/20 text-success" : "border border-border bg-card-2"
                    }`}
                  >
                    {item.done && (
                      <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-2.5 w-2.5">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" />
                      </svg>
                    )}
                  </span>
                  <span className={item.done ? "text-foreground" : "text-muted"}>{item.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted">Progress</span>
                <span className="text-success">{checklist.filter((c) => c.done).length} / {checklist.length}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-card-3">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-success/80 to-success/60 transition-all"
                  style={{ width: `${(checklist.filter((c) => c.done).length / checklist.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
