import { BellOff } from "lucide-react";
import type { RecentNotification } from "../types";

interface RecentNotificationsProps {
  notifications: RecentNotification[];
}

export function RecentNotifications({ notifications }: RecentNotificationsProps) {
  return (
    <div className="border-border bg-card/80 rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">Recent Notifications</p>
          <p className="text-muted text-xs">Last 24 hours of sent alerts</p>
        </div>
        <span className="border-border bg-card-2/60 text-muted rounded-full border px-2.5 py-1 text-xs">
          {notifications.length} sent
        </span>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <div className="border-border bg-card-2/60 text-muted flex h-10 w-10 items-center justify-center rounded-xl border">
            <BellOff className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <p className="text-muted text-sm font-medium">No alerts yet</p>
          <p className="text-muted/70 text-xs">
            Alerts will appear here once your vaults start firing events.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <div
              key={i}
              className="border-border/60 bg-card-2/30 hover:bg-card-2/60 flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold ${n.textColor}`}>{n.type}</p>
                <p className="text-muted text-xs">
                  {n.vault} · {n.chain}
                </p>
              </div>
              <span className="text-muted text-xs whitespace-nowrap">{n.time}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
