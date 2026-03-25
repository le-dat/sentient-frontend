"use client";

export function VaultGasSection({
  vaultEthBalanceFormatted,
  hasEnoughEth,
  feeWei,
  depositEthAmount,
  setDepositEthAmount,
  canDepositEth,
  isWritePending,
  onDeposit,
}: {
  vaultEthBalanceFormatted: string | null;
  hasEnoughEth: boolean;
  feeWei: bigint;
  depositEthAmount: string;
  setDepositEthAmount: (v: string) => void;
  canDepositEth: boolean;
  isWritePending: boolean;
  onDeposit: () => void;
}) {
  if (vaultEthBalanceFormatted == null) return null;

  return (
    <div className="space-y-1.5">
      {/* Balance — always visible */}
      <p className="text-muted text-[11px]">
        Vault ETH:{" "}
        <span
          className={
            !hasEnoughEth && feeWei > 0n
              ? "text-danger font-semibold"
              : "text-foreground font-semibold"
          }
        >
          {vaultEthBalanceFormatted}
        </span>
      </p>

      {/* Deposit row — only when insufficient */}
      {!hasEnoughEth && (
        <div className="flex items-center gap-1.5">
          <label htmlFor="gas-deposit" className="text-muted shrink-0 text-[11px]">
            Add gas
          </label>
          <input
            id="gas-deposit"
            type="text"
            value={depositEthAmount}
            onChange={(e) => setDepositEthAmount(e.target.value)}
            placeholder="0.003"
            className="border-border/60 bg-card w-16 rounded border px-2 py-0.5 font-mono text-[11px]"
          />
          <button
            onClick={onDeposit}
            disabled={isWritePending || !canDepositEth}
            className="bg-primary/20 text-primary hover:bg-primary/30 rounded px-2 py-0.5 text-[11px] font-semibold disabled:opacity-50"
          >
            Deposit ETH
          </button>
        </div>
      )}
    </div>
  );
}
