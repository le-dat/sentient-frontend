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
    <button
      onClick={onDrip}
      disabled={isPending || !hasUser}
      className="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Droplets className="h-3.5 w-3.5" />
      )}
      {isPending ? "Dripping tokens..." : "Get 1 CCIP-BnM — Free Test Tokens"}
    </button>
  );
};
