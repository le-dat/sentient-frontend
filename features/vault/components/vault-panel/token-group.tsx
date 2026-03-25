import React from "react";

export const TokenGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-border/60 bg-card-2/40 overflow-hidden rounded-xl border">
    <div className="border-border/60 border-b px-4 py-2">
      <p className="text-muted text-[10px] font-bold tracking-wider uppercase">{title}</p>
    </div>
    <div className="flex flex-col">{children}</div>
  </div>
);
