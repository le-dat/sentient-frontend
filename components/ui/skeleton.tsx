export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer bg-card-2/60 rounded-lg border border-border/30${className ? ` ${className}` : ""}`}
    />
  );
}
