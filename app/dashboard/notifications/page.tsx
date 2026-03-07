"use client";

import { Mail } from "lucide-react";
import { TelegramIcon } from "@/components/ui/icons";
import { useNotificationsViewModel } from "@/lib/view-models/use-notifications-view-model";

export default function NotificationsPage() {
  const { alertPrefs, recentNotifications } = useNotificationsViewModel();
  return (
    <div className="space-y-5">
      {/* Two-column layout */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.6fr]">
        {/* LEFT — Connections */}
        <div className="space-y-3 md:sticky md:top-24 md:self-start">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Connections</p>

          {/* Telegram — available */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card/80">
            <div className="h-0.5 w-full bg-linear-to-r from-[#2AABEE]/60 via-[#2AABEE]/30 to-transparent" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2AABEE]/30 bg-[#2AABEE]/10 text-[#2AABEE]">
                    <TelegramIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Telegram</p>
                    <p className="mt-0.5 text-xs text-muted">Real-time alerts via bot</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-card-2/60 px-2.5 py-1 text-xs text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                  Not connected
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button className="rounded-xl bg-[#2AABEE] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#2AABEE]/20 transition-all hover:opacity-90">
                  Connect
                </button>
                <button className="rounded-xl border border-border px-4 py-2 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary">
                  Test
                </button>
              </div>

              <div className="mt-3 rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-xs text-muted">
                Chat with <span className="font-semibold text-[#2AABEE]">@SentientVaultBot</span>{" "}
                and send{" "}
                <code className="rounded bg-card-3 px-1 py-0.5 font-mono text-foreground">
                  /connect {"{wallet}"}
                </code>
              </div>
            </div>
          </div>

          {/* Email — disabled / coming soon */}
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/50 opacity-60">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card-2 text-muted">
                    <Mail className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-muted">Email</p>
                    <p className="mt-0.5 text-xs text-muted">Digest & summary alerts</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/50 bg-card-2/40 px-2.5 py-1 text-xs text-muted">
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Alert preferences + Recent notifications */}
        <div className="space-y-5">
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
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${pref.dot} ${!pref.enabled && "opacity-40"}`}
                    />
                    <div>
                      <p
                        className={`text-sm font-medium ${pref.enabled ? "text-foreground" : "text-muted"}`}
                      >
                        {pref.label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">{pref.desc}</p>
                    </div>
                  </div>
                  <div
                    className={`relative ml-4 h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-all ${
                      pref.enabled ? "border-primary/50 bg-primary" : "border-border bg-card-2"
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
                  <span className={`h-2 w-2 shrink-0 rounded-full ${n.dot}`} />
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
      </div>
    </div>
  );
}
