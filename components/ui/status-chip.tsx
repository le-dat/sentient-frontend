export function StatusChip({
  status,
}: {
  status: "active" | "paused" | "queued" | "failed" | "success";
}) {
  const cls: Record<typeof status, string> = {
    active: "bg-success/20 text-success",
    paused: "bg-warning/20 text-warning",
    queued: "bg-primary/20 text-primary",
    failed: "bg-danger/20 text-danger",
    success: "bg-success/20 text-success",
  };

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${cls[status]}`}>{status}</span>
  );
}
