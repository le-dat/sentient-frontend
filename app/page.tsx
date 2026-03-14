import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/landing-nav";

export const metadata: Metadata = {
  title: "Sentient Finance — DeFi Vault Automation",
  description:
    "Automate your DeFi vaults with on-chain intelligence. Set price rules, execute swaps, and shield capital across every EVM chain.",
};

import { HeroSection } from "@/components/landing/hero-section";
import { FeaturedVaultsSection } from "@/components/landing/featured-vaults-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { LiveActivitySection } from "@/components/landing/live-activity-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <FeaturedVaultsSection />
      <FeaturesSection />
      <LiveActivitySection />

      <footer className="border-t border-border/60 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted mx-auto">
            © 2026 Sentient Finance · Built on Chainlink · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
