export function AddChainCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border-border/50 bg-card/30 text-muted hover:border-primary/40 hover:bg-primary/5 hover:text-primary flex h-[66px] min-w-44 shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-3 transition-all"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M12 4v16M4 12h16" />
      </svg>
      <span className="text-sm font-medium">Add Chain</span>
    </button>
  );
}
