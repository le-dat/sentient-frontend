import React from "react";

export const PriceInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="text-xs text-muted">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs outline-none focus:border-primary/50"
    />
  </div>
);
