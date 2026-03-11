import { Skeleton } from "@/components/ui/skeleton";

export function CCIPPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-6 w-40 rounded" />
        </div>
        <Skeleton className="h-3.5 w-72 rounded" />
      </div>

      {/* Panel card */}
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-4 space-y-4">
        <Skeleton className="h-2.5 w-28 rounded" />

        {/* Input row */}
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-32 rounded" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>

        {/* Second input row */}
        <div className="space-y-1.5">
          <Skeleton className="h-2.5 w-24 rounded" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>

        {/* Button */}
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}
