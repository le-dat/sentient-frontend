import type { AlertPreference } from "../types";

interface AlertPreferencesProps {
  prefs: AlertPreference[];
  onToggle: (key: string) => void;
}

export function AlertPreferences({ prefs, onToggle }: AlertPreferencesProps) {
  return (
    <div className="border-border bg-card/80 rounded-2xl border p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">Alert Preferences</p>
          <p className="text-muted text-xs">Choose which events trigger a notification</p>
        </div>
        <span className="border-border bg-card-2/60 text-muted rounded-full border px-2.5 py-1 text-xs">
          {prefs.filter((p) => p.enabled).length} / {prefs.length} active
        </span>
      </div>

      <div className="space-y-2">
        {prefs.map((pref) => (
          <div
            key={pref.key}
            onClick={() => onToggle(pref.key)}
            className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors ${
              pref.enabled
                ? "border-border bg-card-2/50 hover:bg-card-2/70"
                : "border-border/50 bg-card-2/20 hover:bg-card-2/40"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${pref.dot} ${!pref.enabled && "opacity-40"}`}
              />
              <div>
                <p
                  className={`text-sm font-medium ${pref.enabled ? "text-foreground" : "text-muted"}`}
                >
                  {pref.label}
                </p>
                <p className="text-muted mt-0.5 text-xs">{pref.desc}</p>
              </div>
            </div>
            <div
              className={`relative ml-4 h-6 w-11 shrink-0 rounded-full border transition-all ${
                pref.enabled ? "border-primary/50 bg-primary" : "border-border bg-card-2"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  pref.enabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
