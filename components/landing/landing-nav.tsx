import Link from "next/link";
import { LayoutGrid, Search, Bell } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutGrid className="h-3.5 w-3.5" /> },
  { href: "/dashboard/search", label: "Query Vault", icon: <Search className="h-3.5 w-3.5" /> },
  { href: "/dashboard/notifications", label: "Alerts", icon: <Bell className="h-3.5 w-3.5" /> },
];

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      {/* Top accent gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tight text-foreground">
            <span className="text-primary">S</span>entient
          </span>
          <div className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted transition-all duration-150 hover:bg-card/80 hover:text-foreground"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95"
        >
          Connect Wallet
        </Link>
      </div>
    </nav>
  );
}
