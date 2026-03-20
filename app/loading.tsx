import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const NAV_WIDTHS = [76, 80, 48, 52] as const;
const MOBILE_NAV_WIDTHS = [68, 80, 48, 52] as const;

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Scan-line overlay (animation defined in globals.css) */}
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <div className="loading-scan-line via-primary/50 absolute right-0 left-0 h-px bg-linear-to-r from-transparent to-transparent shadow-[0_0_8px_2px_rgba(96,165,255,0.25)]" />
      </div>

      {/* ── Navbar skeleton ───────────────────────────────────────── */}
      <header className="border-border/60 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-xl">
        {/* Accent line with animated progress */}
        <div className="bg-border/20 relative h-px w-full overflow-hidden">
          <div className="loading-progress-bar from-primary/40 via-primary to-primary/40 absolute top-0 left-0 h-full bg-linear-to-r" />
        </div>

        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 md:px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-md md:size-8" />
              <Skeleton className="h-4 w-14 rounded" />
            </div>

            <div className="bg-border/60 hidden h-4 w-px md:block" />

            <nav className="hidden items-center gap-0.5 md:flex">
              {NAV_WIDTHS.map((w) => (
                <div key={w} className="px-3 py-1.5">
                  <Skeleton className={cn("h-[18px] rounded-lg", { width: w })} />
                </div>
              ))}
            </nav>
          </div>

          <Skeleton className="h-9 w-28 rounded-xl" />
        </div>

        {/* Mobile nav strip */}
        <div className="border-border/40 flex gap-1 overflow-x-auto border-t px-4 py-2 md:hidden">
          {MOBILE_NAV_WIDTHS.map((w) => (
            <div key={w} className="shrink-0 px-3 py-1.5">
              <Skeleton className={cn("h-[14px] rounded-md", { width: w })} />
            </div>
          ))}
        </div>
      </header>

      {/* ── Main content skeleton ─────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-3 py-5 pb-24 md:px-6 md:py-6 md:pb-28">
        <div className="space-y-8">
          {/* Chains section */}
          <section className="space-y-3">
            <Skeleton className="h-3 w-14 rounded" />
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border-border/40 bg-card/40 flex min-w-44 shrink-0 items-center gap-3 rounded-xl border px-4 py-3"
                >
                  <Skeleton className="size-10 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-20 rounded" />
                    <Skeleton className="h-2.5 w-10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Vaults section */}
          <section className="space-y-3">
            <Skeleton className="h-3 w-12 rounded" />
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-2.5 w-24 rounded" />
                {[0, 1].map((i) => (
                  <div key={i} className="border-border/40 bg-card/60 rounded-2xl border p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Skeleton className="h-4 w-28 rounded" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Skeleton className="h-2.5 w-10 rounded" />
                        <Skeleton className="h-3.5 w-20 rounded" />
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-2.5 w-10 rounded" />
                        <Skeleton className="h-3.5 w-20 rounded" />
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-2.5 w-10 rounded" />
                        <Skeleton className="h-3.5 w-20 rounded" />
                      </div>
                      <div className="col-span-2 space-y-1">
                        <Skeleton className="h-2.5 w-10 rounded" />
                        <Skeleton className="h-3.5 w-40 rounded" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
