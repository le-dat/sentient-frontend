"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LayoutGrid, Bell, Home, Plus } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutGrid className="h-3.5 w-3.5" />, exact: true },
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

      {/* Floating Bottom Bar */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-2xl border border-border/60 bg-card/90 px-3 py-2 shadow-2xl backdrop-blur-xl">
          {/* Home */}
          <Link
            href="/dashboard"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              isActive("/dashboard", true) ? "text-primary" : "text-muted hover:text-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
          </Link>

          <div className="mx-1 h-6 w-px bg-border/50" />

          {/* Create / Plus */}
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-600/40 transition-all hover:bg-red-500 hover:shadow-red-500/50">
            <Plus className="h-5 w-5 text-white" strokeWidth={2.5} />
          </button>

          <div className="mx-1 h-6 w-px bg-border/50" />

          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              isActive("/dashboard/notifications")
                ? "text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
