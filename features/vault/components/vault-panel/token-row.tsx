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
      className={`border-border/30 flex w-full items-center gap-3 border-b px-4 py-3 transition-all last:border-0 ${
        isSelected
          ? "border-l-primary bg-primary/10 border-l-2"
          : "opacity-40 hover:bg-white/5 hover:opacity-70"
      }`}
    >
      <div
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full p-1.5 ${isSelected ? "bg-primary/20 ring-primary/40 ring-1" : "bg-white/5"}`}
      >
        <TokenIcon
          symbol={symbol.toLowerCase()}
          size={24}
          variant="branded"
          fallback={<div className="bg-primary/20 h-5 w-5 rounded-full" />}
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-[14px] font-bold">{info.name}</span>
          <span className="text-muted text-xs font-medium">{symbol}</span>
          {isVault && (
            <span className="bg-primary/10 text-primary rounded-[4px] px-1.5 py-0.5 text-[9px] font-black uppercase">
              vault
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {amount && <span className="text-foreground text-xs font-bold">{amount}</span>}
        {isSelected && <Check className="text-primary h-4 w-4" />}
      </div>
    </button>
  );
};
