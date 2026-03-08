import { type DepositToken } from "@/hooks/use-token-list";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DepositModal } from "../deposit-modal";
import { SectionHeader } from "../section-header";
import { TokenGroup } from "../token-group";
import { TokenRow } from "../token-row";

interface ConsoleTabProps {
  systemTokens: string[];
  vaultTokens: { amount: string; symbol: string }[];
  vaultSymbols: Set<string>;
  selection: { symbol: string; source: string };
  setSelection: (selection: { symbol: string; source: string }) => void;
}

export const ConsoleTab = ({
  systemTokens,
  vaultTokens,
  vaultSymbols,
  selection,
  setSelection,
}: ConsoleTabProps) => {
  const [showDeposit, setShowDeposit] = useState(false);

  const handleDeposit = (token: DepositToken, amount: string) => {
    console.log("Deposit:", token.symbol, token.address, amount);
    // TODO: call contract deposit
  };

  return (
    <div className="space-y-4">
      {showDeposit && (
        <DepositModal onClose={() => setShowDeposit(false)} onConfirm={handleDeposit} />
      )}

      <SectionHeader title="Select token swap default">
        <button
          onClick={() => setShowDeposit(true)}
          className="flex items-center gap-1.5 rounded-lg border border-primary/30 px-2.5 py-1 text-xs text-primary hover:bg-primary/10"
        >
          <Plus className="h-3 w-3" /> Deposit
        </button>
      </SectionHeader>

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
        {vaultTokens.map((t) => (
          <TokenRow
            key={t.symbol}
            symbol={t.symbol}
            amount={t.amount}
            isSelected={selection.symbol === t.symbol && selection.source === "holdings"}
            onClick={() => setSelection({ symbol: t.symbol, source: "holdings" })}
          />
        ))}
      </TokenGroup>
    </div>
  );
};
