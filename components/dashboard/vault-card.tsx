import { StatusChip } from "@/components/ui/status-chip";
import type { VaultItem } from "@/lib/types/dashboard";

export function VaultCard({ vault, onSelect }: { vault: VaultItem; onSelect: (v: VaultItem) => void }) {
  return (
    <div
      onClick={() => onSelect(vault)}
      className="cursor-pointer rounded-2xl border border-border bg-card/80 p-4 transition-all hover:border-primary/40 hover:bg-card"
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-sm font-semibold">{vault.addr}</p>
        <StatusChip status={vault.status} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-muted">Chain</p>
          <p className="mt-0.5 font-medium">{vault.chain}</p>
        </div>
        <div>
          <p className="text-muted">PnL</p>
          <p className={`mt-0.5 font-bold ${vault.pnlUp ? "text-success" : "text-danger"}`}>
            {vault.pnlUp ? "▲" : "▼"} {vault.pnl}
          </p>
        </div>
        <div>
          <p className="text-muted">Balance</p>
          <p className="mt-0.5 font-medium">{vault.balance}</p>
        </div>
        <div>
          <p className="text-muted">Last execution</p>
          <p className="mt-0.5 font-medium">{vault.lastExecution}</p>
        </div>
        <div className="col-span-2">
          <p className="text-muted">Rule</p>
          <p className="mt-0.5 font-medium">{vault.rule}</p>
        </div>
      </div>
    </div>
  );
}
