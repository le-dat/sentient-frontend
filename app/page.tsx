import { LandingNav } from "@/components/landing/landing-nav";
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
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary/70 text-[10px] font-black text-white">
              S
            </div>
            <span className="text-sm font-semibold text-foreground">Sentient Finance</span>
          </div>
          <p className="text-xs text-muted">
            © 2026 Sentient Finance · Built on Chainlink · All rights reserved
          </p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
            </span>
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
