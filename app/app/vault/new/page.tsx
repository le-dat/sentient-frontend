import { SectionCard } from "@/components/ui/section-card";

export default function CreateVaultPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Create Vault" description="Wizard skeleton (REST write path)">
        <div className="grid gap-3 md:grid-cols-2">
          <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="Executor address" />
          <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="Max trade amount" />
          <input className="rounded-lg border border-border bg-card-2/70 px-3 py-2" placeholder="Cooldown seconds" />
          <button className="rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground">Create Vault</button>
        </div>
      </SectionCard>
    </div>
  );
}
