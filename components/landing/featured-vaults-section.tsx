"use client";

import Link from "next/link";
import { RevealSection } from "@/components/ui/reveal-section";

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

export function FeaturedVaultsSection() {
  return (
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
                  href="/dashboard"
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
  );
}
