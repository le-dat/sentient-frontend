import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      <main className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-2xl border border-border bg-card/80 p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Sentient Finance</p>
          <h1 className="mt-2 text-4xl font-bold">Frontend Structure Ready</h1>
          <p className="mt-3 max-w-2xl text-muted">
            MVP structure for dashboard, vault actions, notifications and monitor pages.
            Built for fast team execution.
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/app" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white">
              Launch App
            </Link>
            <Link href="/app/notifications" className="rounded-lg border border-border px-4 py-2">
              Notifications
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
