import { type DepositToken } from "@/hooks/use-token-list";
import { useDeposit } from "@/hooks/use-deposit";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DepositModal } from "../deposit-modal";
import { SectionHeader } from "../section-header";
import { TokenGroup } from "../token-group";
import { TokenRow } from "../token-row";

interface ConsoleTabProps {
  vaultAddress: `0x${string}`;
  systemTokens: string[];
  vaultTokens: { amount: string; symbol: string }[];
  vaultSymbols: Set<string>;
  selection: { symbol: string; source: string };
  setSelection: (selection: { symbol: string; source: string }) => void;
}

export const ConsoleTab = ({
  vaultAddress,
  systemTokens,
  vaultTokens,
  vaultSymbols,
  selection,
  setSelection,
}: ConsoleTabProps) => {
  const [showDeposit, setShowDeposit] = useState(false);
  const { deposit, status, error } = useDeposit(vaultAddress);

  const handleDeposit = (token: DepositToken, amount: string) => {
    deposit(token, amount);
  };

  return (
    <div className="space-y-4">
      {showDeposit && (
        <DepositModal onClose={() => setShowDeposit(false)} onConfirm={handleDeposit} />
      )}

      <SectionHeader title="Select token swap default">
        <button
          onClick={() => setShowDeposit(true)}
          disabled={status === "approving" || status === "depositing"}
          className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-1 text-xs text-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-3 w-3" /> Deposit
        </button>
      </SectionHeader>

      {status === "approving" && (
        <p className="text-xs text-muted">Approving token…</p>
      )}
      {status === "depositing" && (
        <p className="text-xs text-muted">Depositing…</p>
      )}
      {status === "done" && (
        <p className="text-xs text-success">Deposit confirmed.</p>
      )}
      {status === "error" && error && (
        <p className="text-xs text-red-400">{error}</p>
      )}

      <TokenGroup title="System">
        {systemTokens.map((sym) => (
          <TokenRow
            key={sym}
            symbol={sym}
            isVault={vaultSymbols.has(sym)}
            isSelected={selection.symbol === sym && selection.source === "system"}
            onClick={() => setSelection({ symbol: sym, source: "system" })}
          />
        ))}
      </TokenGroup>

      <TokenGroup title="Token Holdings">
        {vaultTokens.length > 0 ? (
          vaultTokens.map((t) => (
            <TokenRow
              key={t.symbol}
              symbol={t.symbol}
              amount={t.amount}
              isSelected={selection.symbol === t.symbol && selection.source === "holdings"}
              onClick={() => setSelection({ symbol: t.symbol, source: "holdings" })}
            />
          ))
        ) : (
          <div className="text-center text-md text-secondary py-3">Empty</div>
        )}
      </TokenGroup>
    </div>
  );
};
