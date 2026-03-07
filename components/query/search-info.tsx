"use client";

import { Shield, Info } from "lucide-react";

export function SearchInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 rounded-2xl border border-border/40 bg-card/40 space-y-3">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-bold text-foreground">Verified Monitoring</h3>
        <p className="text-sm text-muted leading-relaxed">
          Instantly query any vault address on major L2s and Mainnet. Get real-time data on rules
          and executions.
        </p>
      </div>
      <div className="p-6 rounded-2xl border border-border/40 bg-card/40 space-y-3">
        <div className="h-10 w-10 rounded-xl bg-red-600/10 flex items-center justify-center">
          <Info className="h-5 w-5 text-red-600" />
        </div>
        <h3 className="font-bold text-foreground">Rule Analysis</h3>
        <p className="text-sm text-muted leading-relaxed">
          Our agent analyzes the vault bytecode and configuration to present its trading strategies
          in human-readable format.
        </p>
      </div>
    </div>
  );
}
