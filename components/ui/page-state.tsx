import { AlertCircle } from "lucide-react";

type Variant = "default" | "loading" | "error" | "not-found";

type PageStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: Variant;
};

function LoadingIcon() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
      <div className="absolute inset-0 rounded-full border border-primary/20" />
      <div
        className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary"
        style={{ animationDuration: "1.1s" }}
      />
      <div
        className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-primary/40"
        style={{ animationDuration: "1.9s", animationDirection: "reverse" }}
      />
      <div className="relative h-6 w-6 animate-pulse rounded-full bg-primary/30" />
      <div className="animate-ring absolute inset-0 rounded-full border border-primary/25" />
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card/60">
        <AlertCircle className="h-9 w-9 text-muted" strokeWidth={1.75} />
      </div>
    </div>
  );
}

function NotFoundIcon() {
  return (
    <div className="relative mx-auto flex flex-col items-center gap-3">
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
      <span className="relative font-mono text-8xl font-black leading-none tracking-tighter text-foreground/8 select-none">
        404
      </span>
      <div className="relative flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary/50" />
        <span className="h-px w-6 bg-border" />
        <span className="h-2 w-2 rounded-full border border-border/60 bg-transparent" />
        <span className="h-px w-4 border-t border-dashed border-border/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-muted/30" />
      </div>
    </div>
  );
}

export function PageState({ title, description, action, variant = "default" }: PageStateProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-20">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/6 blur-3xl" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        {variant !== "default" && (
          <div className="mb-8">
            {variant === "loading" && <LoadingIcon />}
            {variant === "error" && <ErrorIcon />}
            {variant === "not-found" && <NotFoundIcon />}
          </div>
        )}

        <h1 className="text-xl font-bold tracking-tight md:text-2xl">{title}</h1>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{description}</p>
        ) : null}
        {action ? <div className="mt-6">{action}</div> : null}

        {variant === "loading" && (
          <div className="mt-8 flex w-full flex-col items-center gap-2 px-6">
            <div className="animate-shimmer h-1.5 w-3/4 rounded-full bg-primary/15" />
            <div
              className="animate-shimmer h-1 w-1/2 rounded-full bg-primary/10"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
