import { useNotificationsViewModel } from "@/lib/view-models/use-notifications-view-model";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
    </svg>
  );
}

export default function NotificationsPage() {
  const { alertPrefs, recentNotifications } = useNotificationsViewModel();
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Alerts</h1>
        <p className="mt-0.5 text-sm text-muted">Manage notification channels and alert preferences</p>
      </div>

      {/* Telegram connection — branded blue tint */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
        <div className="h-0.5 w-full bg-gradient-to-r from-[#2AABEE]/60 via-[#2AABEE]/30 to-transparent" />
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/10 text-[#2AABEE]">
                <TelegramIcon />
              </div>
              <div>
                <p className="font-semibold">Telegram Notifications</p>
                <p className="mt-0.5 text-xs text-muted">
                  Receive real-time alerts directly in Telegram whenever a vault event fires.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card-2/60 px-3 py-1.5 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-muted" />
              <span className="text-muted">Not connected</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#2AABEE] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90 hover:shadow-[#2AABEE]/35">
              Connect Telegram
            </button>
            <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary">
              Send test notification
            </button>
          </div>

          <div className="mt-4 rounded-xl border border-border/60 bg-card-2/40 px-4 py-3 text-xs text-muted">
            Start a chat with <span className="font-semibold text-[#2AABEE]">@SentientVaultBot</span> and send{" "}
            <code className="rounded bg-card-3 px-1.5 py-0.5 font-mono text-foreground">
              /connect {"{your wallet address}"}
            </code>{" "}
            to link your account.
          </div>
        </div>
      </div>

      {/* Alert preferences */}
      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">Alert Preferences</p>
            <p className="text-xs text-muted">Choose which events trigger a notification</p>
          </div>
          <span className="rounded-full border border-border bg-card-2/60 px-2.5 py-1 text-xs text-muted">
            {alertPrefs.filter((p) => p.enabled).length} / {alertPrefs.length} active
          </span>
        </div>
        <div className="space-y-2">
          {alertPrefs.map((pref) => (
            <div
              key={pref.key}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
                pref.enabled
                  ? "border-border bg-card-2/50 hover:bg-card-2/70"
                  : "border-border/50 bg-card-2/20 hover:bg-card-2/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${pref.dot} ${!pref.enabled && "opacity-40"}`} />
                <div>
                  <p className={`text-sm font-medium ${pref.enabled ? "text-foreground" : "text-muted"}`}>
                    {pref.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{pref.desc}</p>
                </div>
              </div>
              {/* Toggle pill — larger and polished */}
              <div
                className={`relative ml-4 h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border transition-all ${
                  pref.enabled
                    ? "border-primary/50 bg-primary"
                    : "border-border bg-card-2"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    pref.enabled ? "translate-x-5" : "translate-x-0.5"
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
          <span className="rounded-full border border-border bg-card-2/60 px-2.5 py-1 text-xs text-muted">
            {recentNotifications.length} sent
          </span>
        </div>
        <div className="space-y-2">
          {recentNotifications.map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-card-2/30 px-3 py-3 transition-colors hover:bg-card-2/60"
            >
              <span className={`h-2 w-2 flex-shrink-0 rounded-full ${n.dot}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${n.textColor}`}>{n.type}</p>
                <p className="text-xs text-muted">
                  {n.vault} · {n.chain}
                </p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
