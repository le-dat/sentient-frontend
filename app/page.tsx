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
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
        <p>© 2026 Sentient Finance · Built on Chainlink · All rights reserved</p>
      </footer>
    </div>
  );
}
