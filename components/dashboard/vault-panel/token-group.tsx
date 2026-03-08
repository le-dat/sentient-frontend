import React from "react";

export const TokenGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="overflow-hidden rounded-xl border border-border/60 bg-card-2/40">
    <div className="border-b border-border/60 px-4 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{title}</p>
    </div>
    <div className="flex flex-col">{children}</div>
  </div>
);
