import { Skeleton } from "@/components/ui/skeleton";

function ChainCardSkeleton() {
  return (
    <div className="flex min-w-44 shrink-0 items-center gap-3 rounded-xl border border-border/40 bg-card/40 px-4 py-3">
      <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-20 rounded" />
        <Skeleton className="h-2.5 w-10 rounded" />
      </div>
    </div>
  );
}

function VaultCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/60 p-4">
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
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Chains section */}
      <section className="space-y-3">
        <Skeleton className="h-3 w-14 rounded" />
        <div className="flex flex-wrap gap-3">
          <ChainCardSkeleton />
          <ChainCardSkeleton />
          <ChainCardSkeleton />
          <ChainCardSkeleton />
        </div>
      </section>

      {/* Vaults section */}
      <section className="space-y-3">
        <Skeleton className="h-3 w-12 rounded" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-2.5 w-24 rounded" />
            <VaultCardSkeleton />
            <VaultCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  );
}
