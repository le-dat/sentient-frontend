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
      <div className="bg-primary/20 absolute inset-0 rounded-full blur-xl" />
      <div className="border-primary/20 absolute inset-0 rounded-full border" />
      <div
        className="border-t-primary absolute inset-0 animate-spin rounded-full border-2 border-transparent"
        style={{ animationDuration: "1.1s" }}
      />
      <div
        className="border-b-primary/40 absolute inset-2 animate-spin rounded-full border-2 border-transparent"
        style={{ animationDuration: "1.9s", animationDirection: "reverse" }}
      />
      <div className="bg-primary/30 relative h-6 w-6 animate-pulse rounded-full" />
      <div className="animate-ring border-primary/25 absolute inset-0 rounded-full border" />
    </div>
  );
}

function ErrorIcon() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
      <div className="bg-primary/15 absolute inset-0 rounded-full blur-xl" />
      <div className="border-border bg-card/60 relative flex h-20 w-20 items-center justify-center rounded-full border">
        <AlertCircle className="text-muted h-9 w-9" strokeWidth={1.75} />
      </div>
    </div>
  );
}

function NotFoundIcon() {
  return (
    <div className="relative mx-auto flex flex-col items-center gap-3">
      <div className="bg-primary/5 absolute inset-0 rounded-full blur-3xl" />
      <span className="text-foreground/8 relative font-mono text-8xl leading-none font-black tracking-tighter select-none">
        404
      </span>
      <div className="relative flex items-center gap-2">
        <span className="bg-primary/50 h-2 w-2 rounded-full" />
        <span className="bg-border h-px w-6" />
        <span className="border-border/60 h-2 w-2 rounded-full border bg-transparent" />
        <span className="border-border/40 h-px w-4 border-t border-dashed" />
        <span className="bg-muted/30 h-1.5 w-1.5 rounded-full" />
      </div>
    </div>
  );
}

export function PageState({ title, description, action, variant = "default" }: PageStateProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center px-4 py-20">
      {/* Ambient glow */}
      <div className="bg-primary/6 pointer-events-none absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

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
          <p className="text-muted mt-3 text-sm leading-relaxed md:text-base">{description}</p>
        ) : null}
        {action ? <div className="mt-6">{action}</div> : null}

        {variant === "loading" && (
          <div className="mt-8 flex w-full flex-col items-center gap-2 px-6">
            <div className="animate-shimmer bg-primary/15 h-1.5 w-3/4 rounded-full" />
            <div
              className="animate-shimmer bg-primary/10 h-1 w-1/2 rounded-full"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
