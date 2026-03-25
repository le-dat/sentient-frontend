/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { TokenIcon } from "@web3icons/react/dynamic";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { WithdrawStatus } from "@/features/vault/hooks/use-withdraw";

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
        className="border-border bg-card relative flex w-[360px] flex-col rounded-2xl border shadow-xl"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h3 className="text-sm font-semibold">Withdraw</h3>
          <button
            onClick={onClose}
            disabled={!canClose}
            className="text-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Status notification */}
        {isPending && (
          <div className="border-primary/40 bg-primary/10 mx-5 mb-3 flex items-center gap-2 rounded-lg border px-4 py-3">
            <Loader2 className="text-primary h-4 w-4 shrink-0 animate-spin" />
            <p className="text-primary text-sm font-medium">Withdrawing…</p>
          </div>
        )}
        {status === "done" && (
          <div className="border-success/40 bg-success/10 mx-5 mb-3 flex items-center gap-2 rounded-lg border px-4 py-3">
            <p className="text-success text-sm font-medium">Withdraw confirmed!</p>
          </div>
        )}
        {status === "error" && error && (
          <div className="border-danger/40 bg-danger/10 mx-5 mb-3 flex items-center gap-2 rounded-lg border px-4 py-3">
            <p className="text-danger text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="border-border/40 flex-1 overflow-y-auto border-y">
          {vaultTokens.length === 0 ? (
            <p className="text-muted py-8 text-center text-xs">No tokens to withdraw</p>
          ) : (
            vaultTokens.map((t) => {
              const isSelected = selectedToken?.symbol === t.symbol;
              return (
                <button
                  key={t.symbol}
                  onClick={() => setSelectedToken(t)}
                  className={`border-border/20 flex w-full items-center gap-3 border-b px-5 py-3 transition-all last:border-0 ${
                    isSelected ? "bg-primary/10" : "hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ${
                      isSelected ? "ring-primary/50 ring-1" : "bg-white/5"
                    }`}
                  >
                    <TokenIcon symbol={t.symbol} size={28} variant="branded" />
                  </div>
                  <div className="flex flex-1 flex-col items-start">
                    <span className="text-xs leading-tight font-semibold">{t.symbol}</span>
                    <span className="text-muted text-[10px]">Balance: {t.amount}</span>
                  </div>
                  {isSelected && <div className="bg-primary h-2 w-2 rounded-full" />}
                </button>
              );
            })
          )}
        </div>

        <div className="space-y-3 px-5 py-4">
          <div
            className={`focus-within:border-primary/50 flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors ${
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
              className="placeholder:text-muted flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
            />
            {selectedToken && (
              <span className="text-muted text-xs font-semibold">{selectedToken.symbol}</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={!canClose}
              className="border-border/60 text-muted hover:text-foreground flex-1 rounded-lg border py-2 text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedToken || !amount || Number(amount) <= 0 || isPending}
              className="bg-primary flex-1 rounded-lg py-2 text-xs font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
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
