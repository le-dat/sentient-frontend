import Link from "next/link";

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      {/* Top accent gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold tracking-tight text-foreground">
            <span className="text-primary">S</span>entient
          </span>
          <div className="hidden gap-6 text-sm text-muted md:flex">
            <Link href="/dashboard" className="transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/dashboard/monitor" className="transition-colors hover:text-foreground">
              Monitor
            </Link>
            <Link href="/dashboard/notifications" className="transition-colors hover:text-foreground">
              Notifications
            </Link>
            <a href="#vaults" className="transition-colors hover:text-foreground">
              Vaults
            </a>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 hover:opacity-95"
        >
          Connect Wallet
        </Link>
      </div>
    </nav>
  );
}
