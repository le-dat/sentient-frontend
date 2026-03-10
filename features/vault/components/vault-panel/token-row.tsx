import { TokenIcon } from "@web3icons/react/dynamic";
import { Check } from "lucide-react";
import { TOKEN_DATA } from "./constants";

interface TokenRowProps {
  symbol: string;
  amount?: string;
  isSelected: boolean;
  isVault?: boolean;
  onClick: () => void;
}

export const TokenRow = ({ symbol, amount, isSelected, isVault, onClick }: TokenRowProps) => {
  const info = TOKEN_DATA[symbol] || { name: symbol, icon: "" };

  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 border-b border-border/30 px-4 py-3 last:border-0 transition-all ${
        isSelected
          ? "border-l-2 border-l-primary bg-primary/10"
          : "opacity-40 hover:opacity-70 hover:bg-white/5"
      }`}
    >
      <div
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full p-1.5 overflow-hidden ${isSelected ? "bg-primary/20 ring-1 ring-primary/40" : "bg-white/5"}`}
      >
        <TokenIcon
          symbol={symbol.toLowerCase()}
          size={24}
          variant="branded"
          fallback={<div className="h-5 w-5 rounded-full bg-primary/20" />}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-foreground">{info.name}</span>
          <span className="text-xs font-medium text-muted">{symbol}</span>
          {isVault && (
            <span className="rounded-[4px] bg-primary/10 px-1.5 py-0.5 text-[9px] font-black uppercase text-primary">
              vault
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {amount && <span className="text-xs font-bold text-foreground">{amount}</span>}
        {isSelected && <Check className="h-4 w-4 text-primary" />}
      </div>
    </button>
  );
};
