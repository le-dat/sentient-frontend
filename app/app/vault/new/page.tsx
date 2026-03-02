import { SectionCard } from "@/components/ui/section-card";

export default function CreateVaultPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Create Vault" description="Simple form for non-tech users">
        <div className="rounded-lg border border-border bg-card-2/70 p-3 text-sm text-muted">
          Executor is auto-filled from server bot config. You only need to adjust limits.
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-xs text-muted">Executor (auto)</span>
            <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" defaultValue="0xServerExecutor..." readOnly />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-muted">Max trade amount (per trade)</span>
            <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="1000" />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-muted">Cooldown (seconds)</span>
            <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="300" />
          </label>

          <label className="grid gap-1">
            <span className="text-xs text-muted">Automation caller (optional)</span>
            <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="0x..." />
          </label>

          <label className="grid gap-1 md:col-span-2">
            <span className="text-xs text-muted">Network</span>
            <select className="rounded-lg border border-border bg-card-2/70 px-3 py-2">
              <option>Base Sepolia</option>
              <option>Base Mainnet</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">Create Vault</button>
          <button className="rounded-lg border border-border px-4 py-2">Advanced settings</button>
        </div>
      </SectionCard>
    </div>
  );
}
