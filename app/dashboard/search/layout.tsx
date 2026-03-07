"use client";

import { useState, ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";

export default function SearchLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("address") ?? "");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Điều hướng sang dynamic route /dashboard/search/[address]
    setIsSearching(true);
    router.push(`/dashboard/search/${query.trim()}`);

    // Reset loading state sau một khoảng ngắn (hoặc để trang đích xử lý)
    setTimeout(() => setIsSearching(false), 500);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Query Any Vault</h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          Enter a smart vault address to analyze its status, rules, and current performance.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-red-600/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <form
          onSubmit={handleSearch}
          className="relative flex items-center bg-card-2/60 backdrop-blur-md border border-border/60 rounded-2xl p-2 shadow-xl"
        >
          <div className="flex-1 flex items-center px-4">
            <Search className="h-5 w-5 text-muted mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="0x91f7... or search term"
              className="w-full bg-transparent border-none outline-none text-foreground py-3 text-lg placeholder:text-muted/60"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Analyze"}
            {!isSearching && <ArrowRight className="h-5 w-5" />}
          </button>
        </form>
      </div>

      <div className="min-h-[400px]">{children}</div>
    </div>
  );
}
