"use client";

import { BenefitCard } from "@/components/ui/benefit-card";
import {
  CoinStackIllustration,
  RuleBasedIllustration,
  RiskShieldIllustration,
  CrossChainIllustration,
} from "@/components/ui/feature-illustrations";
import { RevealSection } from "@/components/ui/reveal-section";

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

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <RevealSection className="mb-10 text-center">
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
    </section>
  );
}
