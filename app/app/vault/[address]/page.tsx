import { SectionCard } from "@/components/ui/section-card";

export default function VaultDetailPage({ params }: { params: { address: string } }) {
  const { address } = params;

  return (
    <div className="space-y-5">
      <SectionCard title={`Vault ${address}`} description="Overview / Strategy / History structure">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card-2/70 p-3">Overview</div>
          <div className="rounded-xl border border-border bg-card-2/70 p-3">Strategy</div>
          <div className="rounded-xl border border-border bg-card-2/70 p-3">History</div>
        </div>
      </SectionCard>
    </div>
  );
}
