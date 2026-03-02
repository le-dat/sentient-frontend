type PageStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function PageState({ title, description, action }: PageStateProps) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-2xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-2xl border border-border bg-card/80 p-6 text-center md:p-8">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {description ? <p className="mt-3 text-sm text-muted md:text-base">{description}</p> : null}
        {action ? <div className="mt-5">{action}</div> : null}
      </div>
    </div>
  );
}
