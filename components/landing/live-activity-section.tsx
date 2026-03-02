"use client";

import Link from "next/link";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { RevealSection } from "@/components/ui/reveal-section";

const activities = [
  { type: "SwapExecuted", vault: "0x91f7...A4c2", chain: "Base", time: "2m ago", color: "text-success", dot: "bg-success" },
  { type: "RuleTriggered", vault: "0xA8d3...F3b7", chain: "Ethereum", time: "18m ago", color: "text-primary", dot: "bg-primary" },
  { type: "ShieldActivated", vault: "0x91f7...A4c2", chain: "Base", time: "1h ago", color: "text-warning", dot: "bg-warning" },
  { type: "ExecutionFailed", vault: "0x52c4...19f1", chain: "Arbitrum", time: "3h ago", color: "text-red-400", dot: "bg-red-400" },
  { type: "VaultDeployed", vault: "0xB3e1...C8a9", chain: "Base", time: "5h ago", color: "text-success", dot: "bg-success" },
];

const notifications = [
  { title: "Rule Triggered", desc: "ETH/USDC — Buy < $1,900", time: "5m ago", color: "text-primary", dot: "bg-primary" },
  { title: "Shield Activated", desc: "BTC Hedge — Circuit breaker", time: "22m ago", color: "text-yellow-400", dot: "bg-yellow-400" },
  { title: "Vault Deployed", desc: "Stable Rebalancer is live", time: "2h ago", color: "text-success", dot: "bg-success" },
  { title: "Execution Failed", desc: "Arbitrum RPC timeout", time: "4h ago", color: "text-red-400", dot: "bg-red-400" },
  { title: "New Follower", desc: "0xB3e1...C8a9 followed vault", time: "6h ago", color: "text-white/50", dot: "bg-white/30" },
];

const deploySteps = [
  { step: "1", label: "Connect Wallet", done: true },
  { step: "2", label: "Choose Strategy", done: false },
  { step: "3", label: "Set Price Rules", done: false },
  { step: "4", label: "Configure Shield", done: false },
  { step: "5", label: "Deploy On-Chain", done: false },
];

export function LiveActivitySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <RevealSection className="mb-12 py-4 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Real-time</p>
        <h2 className="text-3xl font-bold">Live Activity</h2>
        <p className="mt-2 text-sm text-muted">
          Real-time events, notifications, and vault deployment—all in one place
        </p>
      </RevealSection>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Live Activity phone */}
        <RevealSection delay={300}>
          <PhoneFrame>
            <div className="flex flex-1 flex-col rounded-2xl bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Live Activity</p>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
                  </span>
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${a.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold ${a.color}`}>{a.type}</p>
                      <p className="truncate text-[11px] text-white/40">
                        {a.vault} · {a.chain}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-[11px] text-white/40">{a.time}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/notifications"
                className="mt-4 block text-center text-xs text-blue-400 transition-opacity hover:opacity-80"
              >
                View all events →
              </Link>
            </div>
          </PhoneFrame>
        </RevealSection>

        {/* Notifications phone */}
        <RevealSection delay={400}>
          <PhoneFrame>
            <div className="flex flex-1 flex-col rounded-2xl bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Notifications</p>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                  3
                </span>
              </div>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${n.dot}`} />
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold ${n.color}`}>{n.title}</p>
                      <p className="truncate text-[11px] text-white/40">{n.desc}</p>
                    </div>
                    <span className="whitespace-nowrap text-[11px] text-white/40">{n.time}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/notifications"
                className="mt-4 block text-center text-xs text-blue-400 transition-opacity hover:opacity-80"
              >
                View all notifications →
              </Link>
            </div>
          </PhoneFrame>
        </RevealSection>

        {/* Deploy Vault phone */}
        <RevealSection delay={500}>
          <PhoneFrame>
            <div className="flex flex-1 flex-col rounded-2xl bg-white/5 p-4">
              <div className="mb-4">
                <p className="text-sm font-bold text-white">Deploy Vault</p>
                <p className="mt-0.5 text-xs text-white/40">Launch a new automated vault</p>
              </div>
              <div className="space-y-3">
                {deploySteps.map((s, i) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        s.done
                          ? "bg-green-500 text-white"
                          : i === 1
                          ? "border border-blue-400/50 text-blue-400/70"
                          : "border border-white/20 text-white/30"
                      }`}
                    >
                      {s.done ? "✓" : s.step}
                    </div>
                    <p
                      className={`text-xs ${
                        s.done
                          ? "text-green-400 line-through opacity-60"
                          : i === 1
                          ? "text-blue-400"
                          : "text-white/50"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/vault/new"
                className="mt-4 block rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 py-2.5 text-center text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition-opacity hover:opacity-90"
              >
                Create Vault →
              </Link>
            </div>
          </PhoneFrame>
        </RevealSection>
      </div>
    </section>
  );
}
