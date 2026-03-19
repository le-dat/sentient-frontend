"use client";

export function GuardCard({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card-2/40 p-4">
      <p className="text-xs text-muted">{message}</p>
    </div>
  );
}
