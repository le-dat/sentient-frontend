"use client";

import Link from "next/link";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { RevealSection } from "@/components/ui/reveal-section";

const activities = [
  {
    type: "SwapExecuted",
    vault: "0x91f7...A4c2",
    chain: "Base",
    time: "2m ago",
    color: "text-success",
  },
  {
    type: "RuleTriggered",
    vault: "0xA8d3...F3b7",
    chain: "Ethereum",
    time: "18m ago",
    color: "text-primary",
  },
  {
    type: "ShieldActivated",
    vault: "0x91f7...A4c2",
    chain: "Base",
    time: "1h ago",
    color: "text-warning",
  },
  {
    type: "ExecutionFailed",
    vault: "0x52c4...19f1",
    chain: "Arbitrum",
    time: "3h ago",
    color: "text-danger",
  },
  {
    type: "VaultDeployed",
    vault: "0xB3e1...C8a9",
    chain: "Base",
    time: "5h ago",
    color: "text-success",
  },
];

const notifications = [
  { title: "Rule Triggered", desc: "ETH/USDC — Buy < $1,900", time: "5m ago", color: "text-primary" },
  { title: "Shield Activated", desc: "BTC Hedge — Circuit breaker", time: "22m ago", color: "text-warning" },
  { title: "Vault Deployed", desc: "Stable Rebalancer is live", time: "2h ago", color: "text-success" },
  { title: "Execution Failed", desc: "Arbitrum RPC timeout", time: "4h ago", color: "text-danger" },
  { title: "New Follower", desc: "0xB3e1...C8a9 followed vault", time: "6h ago", color: "text-white/50" },
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
      <RevealSection className="mb-10 text-center py-15">
        <h2 className="text-2xl font-bold">Live Activity</h2>
        <p className="mt-2 text-sm text-muted">
          Real-time events, notifications, and vault deployment—all in one place
        </p>
      </RevealSection>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Live Activity */}
        <RevealSection delay={300}>
          <PhoneFrame>
            <div className="flex flex-1 flex-col rounded-2xl bg-white/5 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Live Activity</p>
                <span className="flex items-center gap-1.5 text-xs text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Live
                </span>
              </div>
              <div className="space-y-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
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
                className="mt-4 block text-center text-xs text-blue-400 hover:underline"
              >
                View all events →
              </Link>
            </div>
          </PhoneFrame>
        </RevealSection>

        {/* Notifications */}
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
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.color.replace("text-", "bg-")}`}
                    />
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
                className="mt-4 block text-center text-xs text-blue-400 hover:underline"
              >
                View all notifications →
              </Link>
            </div>
          </PhoneFrame>
        </RevealSection>

        {/* Deploy Vault */}
        <RevealSection delay={500}>
          <PhoneFrame>
            <div className="flex flex-1 flex-col rounded-2xl bg-white/5 p-4">
              <div className="mb-4">
                <p className="text-sm font-bold text-white">Deploy Vault</p>
                <p className="mt-0.5 text-xs text-white/40">Launch a new automated vault</p>
              </div>
              <div className="space-y-3">
                {deploySteps.map((s) => (
                  <div key={s.step} className="flex items-center gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        s.done
                          ? "bg-green-500 text-white"
                          : "border border-white/20 text-white/40"
                      }`}
                    >
                      {s.done ? "✓" : s.step}
                    </div>
                    <p className={`text-xs ${s.done ? "text-green-400 line-through" : "text-white/80"}`}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/vault/new"
                className="mt-4 block rounded-xl bg-blue-500 py-2.5 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
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
