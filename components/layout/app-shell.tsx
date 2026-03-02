import Link from "next/link";

const nav = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/vault/new", label: "Create Vault" },
  { href: "/app/notifications", label: "Notifications" },
  { href: "/app/monitor", label: "Monitor" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen px-4 py-5 md:px-8">
      <header className="mx-auto mb-6 flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/80 px-4 py-3">
        <Link href="/" className="text-sm tracking-[0.2em] text-muted uppercase">
          Sentient
        </Link>
        <nav className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-border bg-card-2/70 px-3 py-1.5 text-sm hover:border-primary/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl">{children}</main>
    </div>
  );
}
