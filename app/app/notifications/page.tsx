import { SectionCard } from "@/components/ui/section-card";

export default function NotificationsPage() {
  return (
    <div className="space-y-5">
      <SectionCard title="Notifications" description="Telegram connect + alert preferences">
        <div className="space-y-3">
          <button className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">Connect Telegram</button>
          <div className="grid gap-2 md:grid-cols-2">
            <label className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">☑ Buy threshold alert</label>
            <label className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">☑ Sell threshold alert</label>
            <label className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">☑ Swap failed alert</label>
            <label className="rounded-lg border border-border bg-card-2/70 px-3 py-2 text-sm">☑ Risk alert</label>
          </div>
          <button className="rounded-lg border border-border px-4 py-2">Send test notification</button>
        </div>
      </SectionCard>
    </div>
  );
}
