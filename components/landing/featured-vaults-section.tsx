"use client";

import Link from "next/link";
import { RevealSection } from "@/components/ui/reveal-section";
import { ROUTES } from "@/lib/constants/routes";

const featuredVaults = [
  {
    addr: "0x91f7...A4c2",
    label: "ETH/USDC Yield",
    chain: "Base Mainnet",
    chainColor: "#0052FF",
    tvl: "$3,200,000",
    executions: "2,195",
    followers: "14.1K",
    status: "active" as const,
    rule: "Buy < $1,900 · Sell > $2,350",
    pnl: "+$42,810",
    pnlUp: true,
  },
  {
    addr: "0xA8d3...F3b7",
    label: "BTC Hedge",
    chain: "Ethereum",
    chainColor: "#627EEA",
    tvl: "$5,100,000",
    executions: "4,812",
    followers: "22.7K",
    status: "active" as const,
    rule: "Buy < $60,000 · Sell > $75,000",
    pnl: "+$128,300",
    pnlUp: true,
  },
  {
    addr: "0x52c4...19f1",
    label: "Stable Rebalancer",
    chain: "Arbitrum",
    chainColor: "#12AAFF",
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
    <section id="vaults" className="mx-auto max-w-6xl px-6 py-16 md:py-32">
      <RevealSection className="mb-10 text-center">
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
          Whale Tracking
        </p>
        <h2 className="text-3xl font-bold">Top Performing Vaults</h2>
        <p className="text-muted mt-2 text-sm">Community&apos;s best automated vault strategies</p>
      </RevealSection>

      <div className="grid gap-4 md:grid-cols-3">
        {featuredVaults.map((v, i) => (
          <RevealSection key={v.addr} delay={i * 100}>
            <div className="group border-border bg-card/80 hover:border-primary/40 hover:bg-card relative overflow-hidden rounded-2xl border transition-all hover:shadow-[0_0_40px_rgba(79,140,255,0.08)]">
              {/* Top accent */}
              <div
                className={`h-0.5 w-full ${
                  v.pnlUp
                    ? "from-success/60 bg-gradient-to-r to-transparent"
                    : "from-danger/40 bg-gradient-to-r to-transparent"
                }`}
              />

              <div className="p-5">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <p className="text-muted font-mono text-xs">{v.addr}</p>
                    <p className="mt-1 text-base font-bold">{v.label}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: v.chainColor }}
                      />
                      <p className="text-muted text-xs">{v.chain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        v.status === "active" ? "bg-success animate-pulse" : "bg-muted"
                      }`}
                    />
                    <span className="text-muted text-xs capitalize">{v.status}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="mb-4 grid grid-cols-3 gap-2">
                  <div className="border-border bg-card-2/50 rounded-xl border px-2 py-2.5 text-center">
                    <p className="text-muted text-[11px]">TVL</p>
                    <p className="mt-0.5 text-xs font-semibold">{v.tvl}</p>
                  </div>
                  <div className="border-border bg-card-2/50 rounded-xl border px-2 py-2.5 text-center">
                    <p className="text-muted text-[11px]">Execs</p>
                    <p className="mt-0.5 text-xs font-semibold">{v.executions}</p>
                  </div>
                  <div className="border-border bg-card-2/50 rounded-xl border px-2 py-2.5 text-center">
                    <p className="text-muted text-[11px]">P&amp;L</p>
                    <p
                      className={`mt-0.5 text-xs font-semibold ${v.pnlUp ? "text-success" : "text-danger"}`}
                    >
                      {v.pnl}
                    </p>
                  </div>
                </div>

                {/* Rule */}
                <div className="border-border bg-card-2/40 rounded-xl border px-3 py-2.5">
                  <p className="text-muted text-[11px]">Active Rule</p>
                  <p className="mt-0.5 truncate text-xs font-medium">{v.rule}</p>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-muted text-xs">{v.followers} followers</span>
                  <Link
                    href={ROUTES.DASHBOARD}
                    className="border-border hover:border-primary/50 hover:bg-primary/5 hover:text-primary flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all"
                  >
                    Track Vault
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      className="h-3 w-3"
                    >
                      <path d="M2 6h8M6 2l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
