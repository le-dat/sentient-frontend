import React from "react";
import { PriceInput } from "../price-input";

interface ConfigTabProps {
  prices: { buy: string; sell: string };
  setPrices: React.Dispatch<React.SetStateAction<{ buy: string; sell: string }>>;
}

export const ConfigTab = ({ prices, setPrices }: ConfigTabProps) => {
  return (
    <div className="rounded-xl border border-border/60 bg-card-2/40 p-4 space-y-4">
      <p className="text-xs font-semibold">Price Rules</p>
      <PriceInput
        label="Buy below ($)"
        value={prices.buy}
        onChange={(v) => setPrices((p) => ({ ...p, buy: v }))}
      />
      <PriceInput
        label="Sell above ($)"
        value={prices.sell}
        onChange={(v) => setPrices((p) => ({ ...p, sell: v }))}
      />
      <button className="w-full rounded-xl bg-primary/10 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all">
        Save Rules
      </button>
    </div>
  );
};
