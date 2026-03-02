const alertPrefs = [
  { key: "buy", label: "Buy threshold triggered", desc: "Notify when price hits your buy rule", enabled: true },
  { key: "sell", label: "Sell threshold triggered", desc: "Notify when price hits your sell rule", enabled: true },
  { key: "fail", label: "Swap execution failed", desc: "Immediate alert on reverts or slippage", enabled: true },
  { key: "risk", label: "Risk shield activated", desc: "Notify when a circuit-breaker fires", enabled: true },
  { key: "health", label: "Chain health degraded", desc: "Alert on RPC lag or oracle staleness", enabled: false },
  { key: "queue", label: "Job queue backlog", desc: "Warn when pending jobs exceed threshold", enabled: false },
];

const recentNotifications = [
  { type: "SwapExecuted", vault: "0x91f7...A4c2", chain: "Base", time: "2m ago", color: "bg-success" },
  { type: "SlippageTooHigh", vault: "0x52c4...19f1", chain: "Arbitrum", time: "18m ago", color: "bg-danger" },
  { type: "ShieldTriggered", vault: "0x91f7...A4c2", chain: "Base", time: "1h ago", color: "bg-warning" },
  { type: "RuleUpdated", vault: "0xA8d3...F3b7", chain: "Ethereum", time: "3h ago", color: "bg-primary" },
  { type: "VaultPaused", vault: "0x52c4...19f1", chain: "Base Sepolia", time: "5h ago", color: "bg-muted" },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Alerts</h1>
        <p className="mt-0.5 text-sm text-muted">Manage notification channels and alert preferences</p>
      </div>

      {/* Telegram connection */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-semibold">Telegram Notifications</p>
            <p className="mt-1 text-xs text-muted">
              Receive real-time alerts directly in Telegram whenever a vault event fires.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card-2/60 px-3 py-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-muted" />
            <span className="text-muted">Not connected</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Connect Telegram
          </button>
          <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50">
            Send test notification
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-card-2/40 px-4 py-3 text-xs text-muted">
          Start a chat with <span className="text-primary">@SentientVaultBot</span> and send{" "}
          <span className="font-mono text-foreground">/connect {"{your wallet address}"}</span> to link your account.
        </div>
      </div>

      {/* Alert preferences */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4">
          <p className="font-semibold">Alert Preferences</p>
          <p className="text-xs text-muted">Choose which events trigger a notification</p>
        </div>
        <div className="space-y-2">
          {alertPrefs.map((pref) => (
            <div
              key={pref.key}
              className="flex items-center justify-between rounded-xl border border-border bg-card-2/40 px-4 py-3 transition-colors hover:bg-card-2/70"
            >
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="mt-0.5 text-xs text-muted">{pref.desc}</p>
              </div>
              {/* Toggle pill */}
              <div
                className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${
                  pref.enabled ? "bg-primary" : "bg-card-2"
                } border border-border`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    pref.enabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent notifications */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Recent Notifications</p>
            <p className="text-xs text-muted">Last 24 hours of sent alerts</p>
          </div>
          <span className="rounded-full border border-border bg-card-2/60 px-2.5 py-0.5 text-xs text-muted">
            {recentNotifications.length} sent
          </span>
        </div>
        <div className="space-y-2">
          {recentNotifications.map((n, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card-2/40 px-3 py-3">
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${n.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{n.type}</p>
                <p className="text-xs text-muted">{n.vault} · {n.chain}</p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
