"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/features/search";
import { ROUTES } from "@/lib/constants/routes";

export function SearchLayoutClient({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isRootSearch = pathname === ROUTES.SEARCH;
  const address = isRootSearch ? "" : (pathname.split("/").pop() ?? "");

  return (
    <div className="mx-auto space-y-8 py-4 transition-all duration-500 md:space-y-12 md:px-8 md:py-6">
      <header
        className={`text-center transition-all duration-700 ease-in-out ${
          isRootSearch
            ? "translate-y-0 pt-10 pb-2 opacity-100"
            : "-translate-y-2 scale-95 pt-2 pb-0 opacity-80"
        }`}
      >
        <h1
          className={`text-foreground font-bold tracking-tight transition-all duration-700 ${
            isRootSearch ? "mb-4 text-3xl md:text-5xl" : "text-xl md:text-2xl"
          }`}
        >
          Query{" "}
          <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(79,140,255,0.3)]">
            Any Vault
          </span>
        </h1>

        {isRootSearch && (
          <p className="text-muted animate-fadeUp mx-auto hidden max-w-2xl text-lg delay-100 md:block">
            Enter a smart vault address to analyze its status, rules, and current performance
            metrics across the decentralized network.
          </p>
        )}
      </header>

      <section className={`transition-all duration-700 ${isRootSearch ? "mb-10" : "mb-2"}`}>
        <SearchBar key={pathname} defaultValue={address} />
      </section>

      <main className="min-h-[400px]">{children}</main>
    </div>
  );
}
