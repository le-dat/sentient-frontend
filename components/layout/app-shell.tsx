"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconGrid() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function IconActivity() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M1 9.5l2.5-4 2.5 3.5L9 3l3 8 1.5-2.5" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M8 1.5A4.5 4.5 0 003.5 6v2.5l-1 1.5h11l-1-1.5V6A4.5 4.5 0 008 1.5z" />
      <path d="M6.5 13.5a1.5 1.5 0 003 0H6.5z" />
    </svg>
  );
}

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: <IconGrid />, exact: true },
  { href: "/dashboard/vault/new", label: "New Vault", icon: <IconPlus /> },
  { href: "/dashboard/monitor", label: "Monitor", icon: <IconActivity /> },
  { href: "/dashboard/notifications", label: "Alerts", icon: <IconBell /> },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen">
      {/* Sticky Top Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        {/* Top accent gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Logo + Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
              <span className="text-primary">S</span>entient
            </Link>

            <div className="hidden h-4 w-px bg-border/60 md:block" />

            <nav className="hidden items-center gap-0.5 md:flex">
              {nav.map((item) => {
                const active = isActive(item.href, item.exact);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-all duration-150 ${
                      active
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted hover:bg-card/80 hover:text-foreground"
                    }`}
                  >
                    <span className={active ? "text-primary" : ""}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2.5">
            {/* Network status - animated ping dot */}
            <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1.5 text-xs text-muted md:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
              </span>
              Base Mainnet
            </div>

            {/* Wallet button with gradient */}
            <button className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1.5 font-mono text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95">
              0x91f7…A4c2
            </button>
          </div>
        </div>

        {/* Mobile nav with icons */}
        <div className="flex gap-1 overflow-x-auto border-t border-border/40 px-4 py-2 md:hidden">
          {nav.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs transition-colors ${
                  active
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted hover:bg-card hover:text-foreground"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">{children}</main>
    </div>
  );
}
