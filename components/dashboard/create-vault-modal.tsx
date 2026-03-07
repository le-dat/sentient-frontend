"use client";

import type { ChainInfo } from "@/lib/types/dashboard";
import { X } from "lucide-react";
import { useState } from "react";

export function CreateVaultModal({
  chain,
  onClose,
  onCreate,
}: {
  chain: ChainInfo;
  onClose: () => void;
  onCreate: (data: { name: string; buyBelow: string; sellAbove: string }) => void;
}) {
  const [name, setName] = useState("");
  const [buyBelow, setBuyBelow] = useState("");
  const [sellAbove, setSellAbove] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onCreate({ name, buyBelow, sellAbove });
    onClose();
  }

  const isValid = name.trim() !== "" && buyBelow !== "" && sellAbove !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: chain.color }}
            >
              {chain.name[0]}
            </span>
            <div>
              <p className="text-sm font-semibold">New Vault</p>
              <p className="text-xs text-muted">{chain.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/60 text-muted transition-colors hover:border-border hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">Vault name</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. ETH Bull Strategy"
              className="w-full rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>

          {/* Buy / Sell row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Buy below ($)</label>
              <input
                type="number"
                min="0"
                value={buyBelow}
                onChange={(e) => setBuyBelow(e.target.value)}
                placeholder="e.g. 1900"
                className="w-full rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-success/50 focus:ring-1 focus:ring-success/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted">Sell above ($)</label>
              <input
                type="number"
                min="0"
                value={sellAbove}
                onChange={(e) => setSellAbove(e.target.value)}
                placeholder="e.g. 2350"
                className="w-full rounded-xl border border-border/60 bg-card-2/40 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-danger/50 focus:ring-1 focus:ring-danger/20"
              />
            </div>
          </div>

          {/* Rule preview */}
          {(buyBelow || sellAbove) && (
            <div className="rounded-xl border border-border/40 bg-card-2/30 px-3 py-2">
              <p className="text-xs text-muted">
                Rule preview:{" "}
                <span className="font-medium text-foreground">
                  {buyBelow && `Buy < $${buyBelow}`}
                  {buyBelow && sellAbove && " · "}
                  {sellAbove && `Sell > $${sellAbove}`}
                </span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-border/60 py-2.5 text-sm font-medium text-muted transition-colors hover:border-border hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Vault
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
