export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-lg bg-card-2/60 border border-border/30${className ? ` ${className}` : ""}`}
    />
  );
}

