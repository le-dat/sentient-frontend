"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { ROUTES } from "@/lib/constants/routes";

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearching(true);
    router.push(ROUTES.SEARCH_VAULT(trimmedQuery));

    // Smooth reset of loading state
    const timer = setTimeout(() => setIsSearching(false), 800);
    return () => clearTimeout(timer);
  };

  return (
    <div className="group animate-fadeUp relative mx-auto w-full">
      <div className="from-primary/20 via-primary/10 absolute -inset-1 rounded-2xl bg-linear-to-r to-transparent opacity-25 blur transition duration-700 group-hover:opacity-40"></div>
      <form
        onSubmit={handleSearch}
        className="bg-card-2/40 border-border/40 focus-within:border-primary/40 relative flex items-center rounded-2xl border p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-300"
      >
        <div className="flex flex-1 items-center px-4">
          <Search className="text-muted/60 mr-3 h-5 w-5 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search address or domain"
            className="text-foreground placeholder:text-muted/30 w-full border-none bg-transparent py-2 text-base outline-none md:py-3 md:text-lg"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/10 flex h-10 cursor-pointer items-center gap-2 rounded-xl px-4 font-medium shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:h-12 md:px-6"
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span className="hidden md:inline">Analyze</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
