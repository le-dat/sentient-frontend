import { Skeleton } from "@/components/ui/skeleton";

function HistoryRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/40 px-3 py-3">
      <Skeleton className="h-2 w-2 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1">
        <Skeleton className="h-3.5 w-32 rounded" />
        <Skeleton className="h-2.5 w-48 rounded" />
      </div>
      <Skeleton className="h-3 w-16 shrink-0 rounded" />
    </div>
  );
}

export function SearchDetailSkeleton() {
  return (
    <div className="space-y-5">
      {/* Address header + status */}
      <div className="rounded-2xl border border-border/40 bg-card/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-4 w-36 rounded" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-3.5 w-24 rounded" />
          </div>
          <div className="col-span-2 space-y-1">
            <Skeleton className="h-2.5 w-12 rounded" />
            <Skeleton className="h-3.5 w-40 rounded" />
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="rounded-2xl border border-border/40 bg-card/60 p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3.5 w-32 rounded" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
        <div className="space-y-2">
          <HistoryRowSkeleton />
          <HistoryRowSkeleton />
          <HistoryRowSkeleton />
          <HistoryRowSkeleton />
        </div>
      </div>
    </div>
  );
}
