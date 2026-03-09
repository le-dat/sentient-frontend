"use client";

import { CountUp } from "@/components/ui/count-up";
import { ROUTES } from "@/lib/constants/routes";
import { useState } from "react";

const STATS = [
  {
    value: 128.4,
    decimals: 1,
    prefix: "$",
    suffix: "M",
    label: "TOTAL VALUE LOCKED",
    badge: "+4.2%",
  },
  { value: 9418, label: "ACTIVE VAULTS", badge: "+12%" },
  { value: 42310, label: "EXECUTIONS / 24H", badge: "+8.7%" },
  { value: 4, label: "CHAINS SUPPORTED", badge: null },
];

// Chain list with their colors — matches FeaturedVaults chain data
const CHAINS = [
  { name: "Ethereum", color: "#627EEA" },
  { name: "Arbitrum", color: "#12AAFF" },
  { name: "Optimism", color: "#FF0420" },
  { name: "Base", color: "#0052FF" },
];

// Teases the 4 core features shown in FeaturesSection
const FEATURE_TAGS = [
  "Rule-Based Automation",
  "Risk Shields",
  "Cross-Chain Monitoring",
  "TX History",
];

function StatsSection() {
  return (
    <div className="hs-in-6 mt-16 border-t border-border/50">
      <div className="hs-stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className="hs-stat-cell">
            <div className="hs-stat-shimmer" />
            {s.badge && (
              <span className="absolute right-4 top-[18px] rounded-[4px] border border-primary/20 bg-primary/[0.08] px-[7px] py-[2px] font-mono text-[10px] font-bold tracking-[0.04em] text-primary">
                {s.badge}
              </span>
            )}
            <p className="mb-1.5 text-[clamp(26px,3vw,38px)] font-extrabold leading-none tracking-[-0.03em] text-[#e6eeff]">
              <CountUp
                to={s.value}
                decimals={s.decimals ?? 0}
                prefix={s.prefix}
                suffix={s.suffix}
              />
            </p>
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted/35">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main HeroSection ──────────────────────────────────────────────────────────

export function HeroSection() {
  const [address, setAddress] = useState("");

  const handleSearch = () => {
    if (address.trim()) {
      window.open(ROUTES.SEARCH_VAULT(address.trim()), "_blank");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section className="relative overflow-hidden pt-20">
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute h-[560px] w-[560px]"
        style={{
          top: "-150px",
          left: "-100px",
          background: "radial-gradient(circle, rgba(79,140,255,0.06) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute h-[480px] w-[480px]"
        style={{
          top: "-60px",
          right: "-80px",
          background: "radial-gradient(circle, rgba(79,140,255,0.09) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-[1fr_340px] gap-[52px]">
        {/* LEFT */}
        <div className="flex flex-col pt-2">
          {/* Headline */}
          <h1 className="hs-in-2 mb-6 p-0 leading-[0.9]">
            {(["AUTOMATE", "YOUR DeFi", "VAULTS"] as const).map((line, i) => (
              <span
                key={i}
                className="block text-[clamp(50px,7vw,92px)] font-extrabold tracking-[-0.035em]"
                style={{
                  color: i === 2 ? "transparent" : "#e6eeff",
                  ...(i === 2
                    ? {
                        WebkitTextStroke: "1.5px rgba(96, 165, 255, 0.8)",
                        textShadow: "0 0 30px rgba(96, 165, 255, 0.25)",
                      }
                    : {}),
                }}
              >
                {line}
                {i === 2 && <span className="hs-cursor" />}
              </span>
            ))}
          </h1>

          {/* Feature capability tags — visually link to FeaturesSection below */}
          <div className="hs-in-3 mb-6 flex flex-wrap gap-2">
            {FEATURE_TAGS.map((label) => (
              <span
                key={label}
                className="rounded-[4px] border border-border/60 bg-card/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted/55"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Subtext — names both user paths: deploy or inspect */}
          <p className="hs-in-3 mb-10 max-w-[430px] font-mono text-[12.5px] leading-[1.85] text-muted/55">
            {`// Price triggers, circuit breakers, cross-chain monitoring.`}
            <br />
            {`// Deploy a vault in minutes — or track any wallet on-chain.`}
          </p>
          {/* Two-path CTAs: primary = deploy, secondary = inspect by address */}
          <div className="hs-in-4 max-w-[480px]">
            {/* Secondary — wallet inspection → FeaturedVaults whale tracking */}
            <div className="hs-input-wrap mb-2.5">
              <span className="hs-prompt">▸</span>
              <input
                className="hs-input"
                placeholder="inspect 0x... or ENS address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!address.trim()}
              className="hs-btn-secondary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Inspect Wallet →
            </button>
          </div>

          {/* Chain status list with brand colors */}
          <div className="hs-in-5 mt-9 flex flex-wrap items-center gap-0 font-mono text-[10px] uppercase tracking-widest">
            {CHAINS.map((c, i) => (
              <span key={c.name} className="flex items-center">
                <span
                  className="mr-1.5 h-[5px] w-[5px] rounded-full"
                  style={{ background: c.color, boxShadow: `0 0 5px ${c.color}80` }}
                />
                <span className="text-muted/35">{c.name}</span>
                {i < CHAINS.length - 1 && <span className="mx-3 text-muted/20">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <StatsSection />
    </section>
  );
}
