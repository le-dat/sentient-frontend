import { Skeleton } from "@/components/ui/skeleton";

function VaultInfoColSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-2.5 w-16 rounded" />
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        {/* Address */}
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-12 rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
        </div>
        {/* Owner */}
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-10 rounded" />
          <Skeleton className="h-3.5 w-4/5 rounded" />
        </div>
        {/* Chain + Events grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-10 rounded" />
            <Skeleton className="h-3.5 w-16 rounded" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-2.5 w-10 rounded" />
            <Skeleton className="h-3.5 w-8 rounded" />
          </div>
        </div>
        {/* Created */}
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-12 rounded" />
          <Skeleton className="h-3.5 w-28 rounded" />
        </div>
        {/* Last Event */}
        <div className="space-y-1">
          <Skeleton className="h-2.5 w-16 rounded" />
          <Skeleton className="h-3.5 w-36 rounded" />
        </div>
      </div>
    </div>
  );
}

function ContractInfoColSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-2.5 w-14 rounded" />
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-3 space-y-3">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-4/5 rounded" />
        <Skeleton className="h-3.5 w-28 rounded" />
        <Skeleton className="h-2.5 w-24 rounded" />
      </div>
    </div>
  );
}

function HistoryColSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-2.5 w-20 rounded" />
      <div className="rounded-xl border border-border/50 bg-card-2/40 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-3 py-3 border-b border-border/30 last:border-0"
          >
            <Skeleton className="mt-0.5 h-5 w-5 shrink-0 rounded-full" />
            <div className="flex-1 min-w-0 space-y-1.5">
              <Skeleton className="h-3.5 w-24 rounded" />
              <Skeleton className="h-2.5 w-40 rounded" />
              <Skeleton className="h-2.5 w-20 rounded" />
            </div>
            <Skeleton className="h-2.5 w-14 shrink-0 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SearchDetailSkeleton() {
  return (
    <div className="mt-6 space-y-4 md:mt-10">
      {/* Back button */}
      <Skeleton className="h-3.5 w-28 rounded" />

      {/* 3-col grid: Vault Info | Contract | Event History */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <VaultInfoColSkeleton />
        <ContractInfoColSkeleton />
        <HistoryColSkeleton />
      </div>
    </div>
  );
}
