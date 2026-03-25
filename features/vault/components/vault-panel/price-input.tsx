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
    <label className="text-muted text-xs">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-border/60 bg-card focus:border-primary/50 mt-1 w-full rounded-lg border px-3 py-2 text-xs outline-none"
    />
  </div>
);
