import { Droplets, Loader2 } from "lucide-react";

export const DripFaucet = ({
  onDrip,
  isPending,
  hasUser,
}: {
  onDrip: () => void;
  isPending: boolean;
  hasUser: boolean;
}) => {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-primary" />
          <p className="text-xs font-semibold text-foreground">CCIP-BnM Faucet</p>
        </div>
        <button
          onClick={onDrip}
          disabled={isPending || !hasUser}
          className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary/30 disabled:opacity-50"
        >
          {isPending ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Droplets className="h-3 w-3" />
          )}
          Drip 1 CCIP-BnM
        </button>
      </div>
      <p className="text-[10px] text-muted">
        CCIP supports CCIP-BnM only. Drip mints 1 token to your wallet.
      </p>
    </div>
  );
};
