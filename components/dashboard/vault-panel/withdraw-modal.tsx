"use client";

import { TokenIcon } from "@web3icons/react/dynamic";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { WithdrawStatus } from "@/hooks/use-withdraw";

interface VaultToken {
  amount: string;
  symbol: string;
}

interface WithdrawModalProps {
  vaultTokens: VaultToken[];
  onClose: () => void;
  onConfirm: (symbol: string, amount: string) => void;
  status: WithdrawStatus;
  error: string | null;
}

export function WithdrawModal({
  vaultTokens,
  onClose,
  onConfirm,
  status,
  error,
}: WithdrawModalProps) {
  const [selectedToken, setSelectedToken] = useState<VaultToken | null>(null);
  const [amount, setAmount] = useState("");

  const isPending = status === "withdrawing";
  const canClose = !isPending;

  useEffect(() => {
    if (status === "done") {
      setAmount("");
      setSelectedToken(null);
    }
  }, [status]);

  const handleConfirm = () => {
    if (!selectedToken || !amount || Number(amount) <= 0) return;
    onConfirm(selectedToken.symbol, amount);
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={canClose ? onClose : undefined}
    >
      <div
        className="relative flex w-[360px] flex-col rounded-2xl border border-border bg-card shadow-xl"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h3 className="text-sm font-semibold">Withdraw</h3>
          <button
            onClick={onClose}
            disabled={!canClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {isPending && (
          <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
            <p className="text-sm font-medium text-primary">Withdrawing…</p>
          </div>
        )}
        {status === "done" && (
          <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3">
            <p className="text-sm font-medium text-emerald-400">Withdraw confirmed!</p>
          </div>
        )}
        {status === "error" && error && (
          <div className="mx-5 mb-3 flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3">
            <p className="text-sm font-medium text-red-400">{error}</p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto border-y border-border/40">
          {vaultTokens.length === 0 ? (
            <p className="py-8 text-center text-xs text-muted">No tokens to withdraw</p>
          ) : (
            vaultTokens.map((t) => {
              const isSelected = selectedToken?.symbol === t.symbol;
              return (
                <button
                  key={t.symbol}
                  onClick={() => setSelectedToken(t)}
                  className={`flex w-full items-center gap-3 border-b border-border/20 px-5 py-3 last:border-0 transition-all ${
                    isSelected ? "bg-primary/10" : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                      isSelected ? "ring-1 ring-primary/50" : "bg-white/5"
                    }`}
                  >
                    <TokenIcon symbol={t.symbol} size={28} variant="branded" />
                  </div>
                  <div className="flex flex-1 flex-col items-start">
                    <span className="text-xs font-semibold leading-tight">{t.symbol}</span>
                    <span className="text-[10px] text-muted">Balance: {t.amount}</span>
                  </div>
                  {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              );
            })
          )}
        </div>

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
              disabled={!canClose}
              className="flex-1 rounded-lg border border-border/60 py-2 text-xs text-muted transition-colors hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedToken || !amount || Number(amount) <= 0 || isPending}
              className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Withdrawing…
                </span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
