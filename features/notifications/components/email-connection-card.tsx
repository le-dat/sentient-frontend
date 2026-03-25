import { Mail } from "lucide-react";

export function EmailConnectionCard() {
  return (
    <div className="border-border/50 bg-card/50 min-w-[220px] shrink-0 overflow-hidden rounded-2xl border opacity-55">
      <div className="from-muted/30 h-0.5 w-full bg-linear-to-r to-transparent" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="border-border bg-card-2 text-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-muted text-sm font-semibold">Email</p>
              <p className="text-muted text-[11px]">Digest &amp; summary alerts</p>
            </div>
          </div>
          <span className="border-border/50 bg-card-2/40 text-muted rounded-full border px-2 py-0.5 text-[11px]">
            Soon
          </span>
        </div>
        <div className="mt-3">
          <button
            disabled
            className="border-border/40 text-muted w-full cursor-not-allowed rounded-lg border py-2 text-xs font-medium"
          >
            Coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
