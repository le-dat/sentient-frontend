"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LayoutGrid, Bell, Home, Plus, Search } from "lucide-react";

const nav = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutGrid className="h-3.5 w-3.5" />,
    exact: true,
  },
  { href: "/dashboard/search", label: "Query Vault", icon: <Search className="h-3.5 w-3.5" /> },
  { href: "/dashboard/notifications", label: "Alerts", icon: <Bell className="h-3.5 w-3.5" /> },
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

          <div className="flex items-center gap-2.5">
            <ConnectButton />
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

      <main className="mx-auto max-w-6xl px-4 py-6 pb-28 md:px-6">{children}</main>
    </div>
  );
}
