"use client";

import { type DepositToken, useBaseTokenList } from "@/hooks/use-token-list";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

interface DepositModalProps {
  onClose: () => void;
  onConfirm: (token: DepositToken, amount: string) => void;
}

export function DepositModal({ onClose, onConfirm }: DepositModalProps) {
  const { tokens, isLoading, error } = useBaseTokenList();
  const [query, setQuery] = useState("");
  const [selectedToken, setSelectedToken] = useState<DepositToken | null>(null);
  const [amount, setAmount] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tokens.slice(0, 50);
    return tokens
      .filter(
        (t) =>
          t.symbol.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.address.toLowerCase().includes(q),
      )
      .slice(0, 50);
  }, [tokens, query]);

  const handleConfirm = () => {
    if (!selectedToken || !amount || Number(amount) <= 0) return;
    onConfirm(selectedToken, amount);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex w-[360px] flex-col rounded-2xl border border-border bg-card shadow-xl"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h3 className="text-sm font-semibold">Deposit</h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card-2/40 px-3 py-2 focus-within:border-primary/50">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, symbol or address…"
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Token list */}
        <div className="flex-1 overflow-y-auto border-y border-border/40">
          {isLoading && (
            <div className="flex h-32 items-center justify-center">
              <svg className="h-5 w-5 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            </div>
          )}

          {error && (
            <p className="py-8 text-center text-xs text-red-400">{error}</p>
          )}

          {!isLoading && !error && filtered.length === 0 && (
            <p className="py-8 text-center text-xs text-muted">No tokens found</p>
          )}

          {!isLoading &&
            !error &&
            filtered.map((token) => {
              const isSelected = selectedToken?.address === token.address;
              return (
                <button
                  key={token.address}
                  onClick={() => setSelectedToken(token)}
                  className={`flex w-full items-center gap-3 border-b border-border/20 px-5 py-3 last:border-0 transition-all ${
                    isSelected
                      ? "bg-primary/10"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                      isSelected ? "ring-1 ring-primary/50" : "bg-white/5"
                    }`}
                  >
                    {token.logoURI ? (
                      <Image
                        src={token.logoURI}
                        alt={token.symbol}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                        unoptimized
                      />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-primary/20" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-start">
                    <span className="text-xs font-semibold leading-tight">{token.symbol}</span>
                    <span className="text-[10px] text-muted">{token.name}</span>
                  </div>

                  {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              );
            })}
        </div>

        {/* Amount + actions */}
        <div className="px-5 py-4 space-y-3">
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors focus-within:border-primary/50 ${
              selectedToken ? "border-border/60" : "border-border/30 opacity-50"
            }`}
          >
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              disabled={!selectedToken}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted disabled:cursor-not-allowed"
            />
            {selectedToken && (
              <span className="text-xs font-semibold text-muted">{selectedToken.symbol}</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-border/60 py-2 text-xs text-muted transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedToken || !amount || Number(amount) <= 0}
              className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-40"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
