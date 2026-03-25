"use client";

export function GuardCard({ message }: { message: string }) {
  return (
    <div className="border-border/50 bg-card-2/40 rounded-xl border p-4">
      <p className="text-muted text-xs">{message}</p>
    </div>
  );
}
