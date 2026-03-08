export function AddChainCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-card/40 p-4 text-muted transition-colors hover:border-primary/50 hover:text-primary"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-xs font-medium">Add Chain</span>
    </button>
  );
}
