import { Mail } from "lucide-react";

export function EmailConnectionCard() {
  return (
    <div className="min-w-[220px] shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-card/50 opacity-55">
      <div className="h-0.5 w-full bg-linear-to-r from-muted/30 to-transparent" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-border bg-card-2 text-muted">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted">Email</p>
              <p className="text-[11px] text-muted">Digest &amp; summary alerts</p>
            </div>
          </div>
          <span className="rounded-full border border-border/50 bg-card-2/40 px-2 py-0.5 text-[11px] text-muted">
            Soon
          </span>
        </div>
        <div className="mt-3">
          <button
            disabled
            className="w-full cursor-not-allowed rounded-lg border border-border/40 py-2 text-xs font-medium text-muted"
          >
            Coming soon
          </button>
        </div>
      </div>
    </div>
  );
}
