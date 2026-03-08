import type { ChainInfo } from "@/lib/types/dashboard";

export function ChainSelectModal({
  chains,
  onSelect,
  onClose,
}: {
  chains: ChainInfo[];
  onSelect: (chain: ChainInfo) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-80 rounded-2xl border border-border bg-card p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Select Chain</h3>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:text-foreground"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-2">
          {chains.map((chain) => (
            <li key={chain.id}>
              <button
                onClick={() => onSelect(chain)}
                className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: chain.color }}
                >
                  {chain.name[0]}
                </span>
                <div>
                  <p className="font-medium leading-tight">{chain.name}</p>
                  <p className="text-xs text-muted">{chain.symbol}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
