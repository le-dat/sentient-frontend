export function AddChainCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex min-w-44 h-[66px] shrink-0 items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/50 bg-card/30 px-4 py-3 text-muted transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
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
