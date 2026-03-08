import React from "react";

export const StatusBadge = ({ active }: { active: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 text-xs font-medium ${active ? "text-success" : "text-muted"}`}
  >
    <span className="relative flex h-1.5 w-1.5">
      {active && (
        <span className="absolute h-full w-full animate-ping rounded-full bg-success opacity-60" />
      )}
      <span className={`relative h-1.5 w-1.5 rounded-full ${active ? "bg-success" : "bg-muted"}`} />
    </span>
    {active ? "ACTIVE" : "INACTIVE"}
  </span>
);
