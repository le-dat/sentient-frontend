"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "@/components/query/search-bar";
import { ROUTES } from "@/lib/constants/routes";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Check if we are at the base search page
  const isRootSearch = pathname === ROUTES.SEARCH;
  const address = isRootSearch ? "" : (pathname.split("/").pop() ?? "");

  return (
    <div className="mx-auto space-y-8 px-3 py-4 transition-all duration-500 md:px-8 md:space-y-12 md:py-6">
      {/* Header Section: Scalable header based on whether we are in "Splash" mode or "Results" mode */}
      <header
        className={`text-center transition-all duration-700 ease-in-out ${
          isRootSearch
            ? "pt-10 pb-2 opacity-100 translate-y-0"
            : "pt-2 pb-0 opacity-80 -translate-y-2 scale-95"
        }`}
      >
        <h1
          className={`font-bold tracking-tight text-foreground transition-all duration-700 ${
            isRootSearch ? "mb-4 text-3xl md:text-5xl" : "text-xl md:text-2xl"
          }`}
        >
          Query{" "}
          <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(79,140,255,0.3)]">
            Any Vault
          </span>
        </h1>

        {isRootSearch && (
          <p className="text-muted text-lg max-w-2xl mx-auto animate-fadeUp delay-100">
            Enter a smart vault address to analyze its status, rules, and current performance
            metrics across the decentralized network.
          </p>
        )}
      </header>

      <section className={`transition-all duration-700 ${isRootSearch ? "mb-10" : "mb-2"}`}>
        <SearchBar key={pathname} defaultValue={address} />
      </section>

      {/* Main Content: Results or Top Vaults */}
      <main className="min-h-[400px]">{children}</main>
    </div>
  );
}
