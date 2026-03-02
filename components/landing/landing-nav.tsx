import Link from "next/link";

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
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
          className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Connect Wallet
        </Link>
      </div>
    </nav>
  );
}
