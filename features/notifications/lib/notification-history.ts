const HISTORY_KEY = "notification_history";
const MAX_ITEMS = 50;

export type StoredNotification = {
  type: string;
  vault: string;
  chain: string;
  sentAt: string; // ISO string
  dot: string;
  textColor: string;
};

export function getHistory(): StoredNotification[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as StoredNotification[]) : [];
  } catch {
    return [];
  }
}

export function appendToHistory(entry: Omit<StoredNotification, "sentAt">): void {
  const history = getHistory();
  const next = [{ ...entry, sentAt: new Date().toISOString() }, ...history].slice(0, MAX_ITEMS);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("notification-added"));
}

export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
