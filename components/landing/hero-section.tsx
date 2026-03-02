"use client";

import Link from "next/link";
import { CountUp } from "@/components/ui/count-up";

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

export function HeroSection() {
  return (
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

      {/* Hero text */}
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
          href="/dashboard"
          className="w-full whitespace-nowrap rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          Launch App
        </Link>
      </div>

      {/* Stats strip */}
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
  );
}
