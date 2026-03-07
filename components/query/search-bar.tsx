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
    <div className="relative group w-full mx-auto animate-fadeUp">
      <div className="absolute -inset-1 bg-linear-to-r from-primary/20 via-primary/10 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-700"></div>
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-card-2/40 backdrop-blur-xl border border-border/40 rounded-2xl p-1.5 shadow-2xl focus-within:border-primary/40 transition-all duration-300"
      >
        <div className="flex-1 flex items-center px-4">
          <Search className="h-5 w-5 text-muted/60 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vault address (0x...) or domain"
            className="w-full bg-transparent border-none outline-none text-foreground py-3 text-lg placeholder:text-muted/30"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/10 cursor-pointer active:scale-95"
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
