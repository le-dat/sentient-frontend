"use client";

import { ROUTES } from "@/lib/constants/routes";
import { Bell, LayoutGrid, Search, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactElement;
  exact?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    href: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: <LayoutGrid className="h-3.5 w-3.5" />,
    exact: true,
  },
  {
    href: ROUTES.SEARCH,
    label: "Query Vault",
    icon: <Search className="h-3.5 w-3.5" />,
  },
  {
    href: ROUTES.CCIP,
    label: "CCIP",
    icon: <Shield className="h-3.5 w-3.5" />,
  },
  {
    href: ROUTES.NOTIFICATIONS,
    label: "Alerts",
    icon: <Bell className="h-3.5 w-3.5" />,
  },
];

interface NavbarProps {
  right?: React.ReactNode;
  showActiveState?: boolean;
  className?: string;
} 

export function Navbar({ right, showActiveState = false, className }: NavbarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (!showActiveState) return false;
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl ${className ?? ""}`}
    >
      {/* Top accent gradient line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 md:px-6">
        {/* Logo + desktop nav */}
        <div className="flex items-center gap-8">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <Image src="/logo.png" alt="Sentient" width={24} height={24} />
            <span className="text-primary">S</span>entient
          </Link>

          <div className="hidden h-4 w-px bg-border/60 md:block" />

          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item) => {
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

        {/* Right slot */}
        {right && <div className="flex items-center gap-2.5">{right}</div>}
      </div>

      {/* Mobile nav */}
      <div className="flex gap-1 overflow-x-auto border-t border-border/40 px-4 py-2 md:hidden">
        {NAV_ITEMS.map((item) => {
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
  );
}
