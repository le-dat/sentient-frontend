import { BellOff } from "lucide-react";
import type { RecentNotification } from "../types";

interface RecentNotificationsProps {
  notifications: RecentNotification[];
}

export function RecentNotifications({ notifications }: RecentNotificationsProps) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">Recent Notifications</p>
          <p className="text-xs text-muted">Last 24 hours of sent alerts</p>
        </div>
        <span className="rounded-full border border-border bg-card-2/60 px-2.5 py-1 text-xs text-muted">
          {notifications.length} sent
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card-2/60 text-muted">
            <BellOff className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium text-muted">No alerts yet</p>
          <p className="text-xs text-muted/70">
            Alerts will appear here once your vaults start firing events.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-card-2/30 px-3 py-3 transition-colors hover:bg-card-2/60"
            >
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${n.textColor}`}>{n.type}</p>
                <p className="text-xs text-muted">
                  {n.vault} · {n.chain}
                </p>
              </div>
              <span className="whitespace-nowrap text-xs text-muted">{n.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
