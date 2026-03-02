"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BenefitCard } from "@/components/ui/benefit-card";
import {
  CoinStackIllustration,
  RuleBasedIllustration,
  RiskShieldIllustration,
  CrossChainIllustration,
} from "@/components/ui/feature-illustrations";

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const featuredVaults = [
  {
    addr: "0x91f7...A4c2",
    label: "ETH/USDC Yield",
    chain: "Base Mainnet",
    tvl: "$3,200,000",
    executions: "2,195",
    followers: "14.1K",
    status: "active" as const,
    rule: "Buy < $1,900 • Sell > $2,350",
    pnl: "+$42,810",
    pnlUp: true,
  },
  {
    addr: "0xA8d3...F3b7",
    label: "BTC Hedge",
    chain: "Ethereum",
    tvl: "$5,100,000",
    executions: "4,812",
    followers: "22.7K",
    status: "active" as const,
    rule: "Buy < $60K • Sell > $75K",
    pnl: "+$128,300",
    pnlUp: true,
  },
  {
    addr: "0x52c4...19f1",
    label: "Stable Rebalancer",
    chain: "Arbitrum",
    tvl: "$1,850,000",
    executions: "1,241",
    followers: "8.3K",
    status: "paused" as const,
    rule: "Rebalance: USDC/DAI",
    pnl: "-$1,240",
    pnlUp: false,
  },
];

const features = [
  {
    illustration: <RuleBasedIllustration />,
    title: "Rule-Based Automation",
    desc: "Define price triggers, rebalancing, or custom conditions. Your vault executes on-chain automatically.",
  },
  {
    illustration: <RiskShieldIllustration />,
    title: "Risk Shields",
    desc: "Circuit breakers halt execution when market conditions are abnormal—protecting capital without manual intervention.",
  },
  {
    illustration: <CoinStackIllustration />,
    title: "Transaction History Analysis Mode",
    desc: "User-friendly transaction data summaries and record filter to track every move.",
  },
  {
    illustration: <CrossChainIllustration />,
    title: "Cross-Chain Monitoring",
    desc: "Track vault health, RPC status, and oracle freshness across 12 EVM chains from a single dashboard.",
  },
];

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

/* ─── Floating token badges ─────────────────────────────────────────────────── */

const floatingTokens = [
  { symbol: "ETH", color: "#627EEA", delay: "0s", x: "7%", y: "20%" },
  { symbol: "BTC", color: "#F7931A", delay: "1.3s", x: "87%", y: "16%" },
  { symbol: "LINK", color: "#2A5ADA", delay: "0.7s", x: "4%", y: "62%" },
  { symbol: "AAVE", color: "#B6509E", delay: "2.0s", x: "91%", y: "50%" },
  { symbol: "ARB", color: "#12AAFF", delay: "0.4s", x: "82%", y: "73%" },
  { symbol: "OP", color: "#FF0420", delay: "1.7s", x: "76%", y: "33%" },
  { symbol: "BASE", color: "#0052FF", delay: "1.0s", x: "16%", y: "79%" },
  { symbol: "SOL", color: "#9945FF", delay: "0.2s", x: "22%", y: "38%" },
];

/* ─── Helpers ───────────────────────────────────────────────────────────────── */

function useInView(ref: { current: Element | null }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return inView;
}

/** Animates a number from 0 → `to` when scrolled into view */
function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 1500;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - (1 - p) ** 3; // cubic ease-out
      setVal(parseFloat((ease * to).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, to, decimals]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString();

  return (
    <span ref={spanRef}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Mobile phone frame wrapper */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full transition-transform duration-300 ease-out hover:-translate-y-7">
      {/* Outer bezel */}
      <div className="relative rounded-[44px] border-[6px] border-foreground/10 bg-foreground/5 p-[3px] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Inner shell */}
        <div className="flex min-h-[580px] flex-col overflow-hidden rounded-[38px] bg-[#0d0d12]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <span className="text-xs font-semibold text-white/70">21:54</span>
            {/* Dynamic island */}
            <div className="h-5 w-20 rounded-full bg-black" />
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3 w-4"
                viewBox="0 0 14 10"
                fill="currentColor"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <rect x="0" y="4" width="2" height="6" rx="0.5" />
                <rect x="3" y="2.5" width="2" height="7.5" rx="0.5" />
                <rect x="6" y="1" width="2" height="9" rx="0.5" />
                <rect x="9" y="0" width="2" height="10" rx="0.5" />
              </svg>
              <svg
                className="h-3 w-4"
                viewBox="0 0 15 11"
                fill="currentColor"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                <path d="M7.5 2.2C10.2 2.2 12.6 3.4 14.2 5.3L15 4.4C13.2 2.3 10.5 1 7.5 1S1.8 2.3 0 4.4l.8.9C2.4 3.4 4.8 2.2 7.5 2.2z" />
                <path d="M7.5 4.8c1.8 0 3.4.8 4.5 2l.8-.9C11.5 4.5 9.6 3.5 7.5 3.5S3.5 4.5 2.2 5.9l.8.9C4.1 5.6 5.7 4.8 7.5 4.8z" />
                <circle cx="7.5" cy="9" r="1.5" />
              </svg>
              <div className="h-3 w-6 rounded-sm border border-white/50 p-px">
                <div className="h-full w-3/4 rounded-[1px] bg-white/70" />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="flex flex-1 flex-col px-4 pb-5 pt-2">{children}</div>
          {/* Home indicator */}
          <div className="flex justify-center pb-3 pt-1">
            <div className="h-1 w-28 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Fades + slides a section in when it enters the viewport */
function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tight text-foreground">
              <span className="text-primary">S</span>entient
            </span>
            <div className="hidden gap-6 text-sm text-muted md:flex">
              <Link href="/app" className="transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/app/monitor" className="transition-colors hover:text-foreground">
                Monitor
              </Link>
              <Link href="/app/notifications" className="transition-colors hover:text-foreground">
                Notifications
              </Link>
              <a href="#vaults" className="transition-colors hover:text-foreground">
                Vaults
              </a>
            </div>
          </div>
          <Link
            href="/app"
            className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Connect Wallet
          </Link>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center">
        {/* Aurora background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-blob absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="animate-blob absolute -right-32 top-0 h-[400px] w-[400px] rounded-full blur-[100px]"
            style={{ animationDelay: "-5s", backgroundColor: "rgba(147,51,234,0.12)" }}
          />
          <div
            className="animate-blob absolute bottom-0 left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full blur-[100px]"
            style={{ animationDelay: "-9s", backgroundColor: "rgba(20,184,166,0.08)" }}
          />
        </div>

        {/* Expanding ripple rings */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="animate-ring h-[520px] w-[520px] rounded-full border border-primary/20"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="animate-ring absolute h-[360px] w-[360px] rounded-full border border-primary/25"
            style={{ animationDelay: "1.1s" }}
          />
          <div
            className="animate-ring absolute h-[200px] w-[200px] rounded-full border border-primary/30"
            style={{ animationDelay: "2.2s" }}
          />
        </div>

        {/* Floating token badges */}
        {floatingTokens.map((t) => (
          <div
            key={t.symbol}
            className="animate-float pointer-events-none absolute hidden items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold backdrop-blur-sm lg:flex"
            style={{
              left: t.x,
              top: t.y,
              animationDelay: t.delay,
              borderColor: t.color + "40",
              backgroundColor: t.color + "18",
              color: t.color,
              boxShadow: `0 0 16px ${t.color}25`,
            }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
            {t.symbol}
          </div>
        ))}

        {/* Hero text — staggered fade-up on load */}
        <p
          className="animate-fadeUp relative text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          style={{ animationDelay: "0.1s" }}
        >
          Sentient Finance
        </p>
        <h1
          className="animate-fadeUp relative mx-auto mt-4 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl"
          style={{ animationDelay: "0.22s" }}
        >
          Automate your DeFi vaults
          <br />
          <span className="text-primary">with on-chain intelligence</span>
        </h1>
        <p
          className="animate-fadeUp relative mx-auto mt-5 max-w-xl text-base text-muted"
          style={{ animationDelay: "0.38s" }}
        >
          Set price rules once. Let Sentient monitor conditions, execute swaps, and shield your
          capital—across every EVM chain.
        </p>

        {/* Search / CTA */}
        <div
          className="animate-fadeUp relative mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.52s" }}
        >
          <input
            className="w-full rounded-xl border border-border bg-card/80 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search vault address or ENS…"
          />
          <Link
            href="/app"
            className="w-full whitespace-nowrap rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Launch App
          </Link>
        </div>

        {/* Stats strip — numbers count up when visible */}
        <div
          className="animate-fadeUp relative mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-px rounded-2xl border border-border bg-border md:grid-cols-4"
          style={{ animationDelay: "0.68s" }}
        >
          <div className="flex flex-col items-center bg-card/90 px-4 py-5 first:rounded-l-2xl">
            <p className="text-2xl font-bold text-foreground">
              <CountUp to={128.4} decimals={1} prefix="$" suffix="M" />
            </p>
            <p className="mt-1 text-xs text-muted">Total Value Locked</p>
            <span className="mt-1 text-xs font-medium text-success">+4.2%</span>
          </div>
          <div className="flex flex-col items-center bg-card/90 px-4 py-5">
            <p className="text-2xl font-bold text-foreground">
              <CountUp to={9418} />
            </p>
            <p className="mt-1 text-xs text-muted">Active Vaults</p>
            <span className="mt-1 text-xs font-medium text-success">+12%</span>
          </div>
          <div className="flex flex-col items-center bg-card/90 px-4 py-5">
            <p className="text-2xl font-bold text-foreground">
              <CountUp to={42310} />
            </p>
            <p className="mt-1 text-xs text-muted">Executions (24h)</p>
            <span className="mt-1 text-xs font-medium text-success">+8.7%</span>
          </div>
          <div className="flex flex-col items-center bg-card/90 px-4 py-5 last:rounded-r-2xl">
            <p className="text-2xl font-bold text-foreground">
              <CountUp to={12} />
            </p>
            <p className="mt-1 text-xs text-muted">Chains Supported</p>
          </div>
        </div>
      </section>

      {/* ── Featured Vaults ───────────────────────────────────────────────────── */}
      <section id="vaults" className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <RevealSection className="mb-10 text-center">
          <h2 className="text-2xl font-bold">Tracking Whale Wallet</h2>
          <p className="mt-2 text-sm text-muted">Top performing automated vaults</p>
        </RevealSection>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredVaults.map((v, i) => (
            <RevealSection key={v.addr} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 p-5 transition-all hover:border-primary/40 hover:bg-card hover:shadow-[0_0_32px_rgba(79,140,255,0.08)]">
                {/* Status dot */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${v.status === "active" ? "bg-success animate-pulse" : "bg-muted"}`}
                  />
                  <span className="text-xs text-muted capitalize">{v.status}</span>
                </div>

                <div className="mb-4">
                  <p className="font-mono text-xs text-muted">{v.addr}</p>
                  <p className="mt-1 text-base font-bold">{v.label}</p>
                  <p className="text-xs text-muted">{v.chain}</p>
                </div>

                <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-card-2/60 px-2 py-2">
                    <p className="text-xs text-muted">TVL</p>
                    <p className="mt-0.5 text-sm font-semibold">{v.tvl}</p>
                  </div>
                  <div className="rounded-lg bg-card-2/60 px-2 py-2">
                    <p className="text-xs text-muted">Execs</p>
                    <p className="mt-0.5 text-sm font-semibold">{v.executions}</p>
                  </div>
                  <div className="rounded-lg bg-card-2/60 px-2 py-2">
                    <p className="text-xs text-muted">P&amp;L</p>
                    <p
                      className={`mt-0.5 text-sm font-semibold ${v.pnlUp ? "text-success" : "text-danger"}`}
                    >
                      {v.pnl}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card-2/40 px-3 py-2">
                  <p className="text-xs text-muted">Rule</p>
                  <p className="mt-0.5 truncate text-xs font-medium">{v.rule}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted">{v.followers} followers</span>
                  <Link
                    href="/app"
                    className="rounded-lg border border-border px-3 py-1 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    Track Vault →
                  </Link>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Features + Activity ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <div className="grid gap-12">
          {/* Feature cards */}
          <RevealSection className="text-center">
            <h2 className="text-2xl font-bold">Core Features</h2>
            <p className="mt-2 text-sm text-muted">
              Everything you need to automate and protect your DeFi strategy
            </p>
          </RevealSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <RevealSection key={f.title} delay={i * 100}>
                <BenefitCard
                  title={f.title}
                  description={f.desc}
                  icon={f.illustration}
                  className="h-full"
                />
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center py-15">
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
                        <span className="whitespace-nowrap text-[11px] text-white/40">
                          {a.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/app/notifications"
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
                    {[
                      {
                        title: "Rule Triggered",
                        desc: "ETH/USDC — Buy < $1,900",
                        time: "5m ago",
                        color: "text-primary",
                      },
                      {
                        title: "Shield Activated",
                        desc: "BTC Hedge — Circuit breaker",
                        time: "22m ago",
                        color: "text-warning",
                      },
                      {
                        title: "Vault Deployed",
                        desc: "Stable Rebalancer is live",
                        time: "2h ago",
                        color: "text-success",
                      },
                      {
                        title: "Execution Failed",
                        desc: "Arbitrum RPC timeout",
                        time: "4h ago",
                        color: "text-danger",
                      },
                      {
                        title: "New Follower",
                        desc: "0xB3e1...C8a9 followed vault",
                        time: "6h ago",
                        color: "text-white/50",
                      },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.color.replace("text-", "bg-")}`}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-semibold ${n.color}`}>{n.title}</p>
                          <p className="truncate text-[11px] text-white/40">{n.desc}</p>
                        </div>
                        <span className="whitespace-nowrap text-[11px] text-white/40">
                          {n.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/app/notifications"
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
                    {[
                      { step: "1", label: "Connect Wallet", done: true },
                      { step: "2", label: "Choose Strategy", done: false },
                      { step: "3", label: "Set Price Rules", done: false },
                      { step: "4", label: "Configure Shield", done: false },
                      { step: "5", label: "Deploy On-Chain", done: false },
                    ].map((s) => (
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
                        <p
                          className={`text-xs ${s.done ? "text-green-400 line-through" : "text-white/80"}`}
                        >
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/app/vault/new"
                    className="mt-4 block rounded-xl bg-blue-500 py-2.5 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Create Vault →
                  </Link>
                </div>
              </PhoneFrame>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
        <p>© 2026 Sentient Finance · Built on Chainlink · All rights reserved</p>
      </footer>
    </div>
  );
}
