import { Skeleton } from "@/components/ui/skeleton";

function ConnectionCardSkeleton({ accent }: { accent?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/60">
      {accent && <div className="h-0.5 w-full bg-border/30" />}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-14 rounded-xl" />
        </div>
        <Skeleton className="mt-3 h-8 w-full rounded-xl" />
      </div>
    </div>
  );
}

function ToggleRowSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/40 px-4 py-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-1.5 w-1.5 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-3.5 w-28 rounded" />
          <Skeleton className="h-3 w-44 rounded" />
        </div>
      </div>
      <Skeleton className="ml-4 h-6 w-11 shrink-0 rounded-full" />
    </div>
  );
}

function NotificationRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/40 px-3 py-3">
      <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1">
        <Skeleton className="h-3.5 w-24 rounded" />
        <Skeleton className="h-2.5 w-36 rounded" />
      </div>
      <Skeleton className="h-3 w-14 shrink-0 rounded" />
    </div>
  );
}

export function NotificationsSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.6fr]">
        {/* LEFT — Connections */}
        <div className="space-y-3">
          <Skeleton className="h-2.5 w-24 rounded" />
          <ConnectionCardSkeleton accent />
          <ConnectionCardSkeleton />
        </div>

        {/* RIGHT — Alert preferences + Recent notifications */}
        <div className="space-y-5">
          {/* Alert preferences */}
          <div className="rounded-2xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3 w-52 rounded" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <div className="space-y-2">
              <ToggleRowSkeleton />
              <ToggleRowSkeleton />
              <ToggleRowSkeleton />
              <ToggleRowSkeleton />
            </div>
          </div>

          {/* Recent notifications */}
          <div className="rounded-2xl border border-border/40 bg-card/60 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-3 w-36 rounded" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <NotificationRowSkeleton />
              <NotificationRowSkeleton />
              <NotificationRowSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
