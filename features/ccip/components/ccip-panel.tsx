"use client";

import { ErrorDescription } from "@/components/ui/error-description";
import { useCCIPPanel, DESTINATION_OPTIONS } from "@/features/ccip/hooks/use-ccip-panel";
import { CCIP_EXPLORER_BASE } from "@/lib/constants/urls";
import { getExplorerBase } from "@/lib/utils";
import { ExternalLink, Loader2, ShieldAlert } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { DripFaucet } from "./drip-faucet";
import { FeeStatus } from "./fee-status";
import { GuardCard } from "./guard-card";
import { SetupView } from "./setup-view";
import { TokenChip } from "./token-chip";
import { VaultGasSection } from "./vault-gas-section";

// ─── types ────────────────────────────────────────────────────────────────────

interface CCIPPanelProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  vaultOwner: string | null;
}

// ─── main panel ───────────────────────────────────────────────────────────────

export function CCIPPanel({ vaultAddress, chainId, vaultOwner }: CCIPPanelProps) {
  const state = useCCIPPanel({ vaultAddress, chainId, vaultOwner });

  const TOAST_ID = "ccip";

  // ── write state → toast ──────────────────────────────────────────────────

  useEffect(() => {
    if (!state.isWritePending) return;
    const labels: Record<string, { title: string; description: string }> = {
      config:  { title: "Setting CCIP router…",       description: "Waiting for transaction." },
      deposit: { title: "Depositing ETH…",             description: "Waiting for transaction." },
      drip:    { title: "Dripping CCIP-BnM…",          description: "Waiting for transaction." },
      shield:  { title: "Executing Emergency Shield…", description: "Sending cross-chain message." },
    };
    const { title, description } = labels[state.pendingAction ?? ""] ?? {
      title: "Processing…",
      description: "Waiting for transaction.",
    };
    toast.loading(title, { id: TOAST_ID, description });
  }, [state.isWritePending, state.pendingAction]);

  useEffect(() => {
    if (!state.writeHash) return;
    const explorerUrl = `${getExplorerBase(chainId)}/tx/${state.writeHash}`;
    toast.success("Transaction submitted", {
      id: TOAST_ID,
      description: (
        <a href={explorerUrl} target="_blank" rel="noopener noreferrer" className="underline">
          View on explorer
        </a>
      ),
    });
    state.resetWrite();
  }, [state.writeHash, chainId, state.resetWrite]);

  useEffect(() => {
    if (!state.writeError) return;
    toast.error("Transaction failed", {
      id: TOAST_ID,
      description: <ErrorDescription message={state.writeError} />,
      duration: Infinity,
    });
    state.resetWrite();
  }, [state.writeError, state.resetWrite]);

  // ── auth guards ──────────────────────────────────────────────────────────

  if (!state.isConnected) {
    return <GuardCard message="Connect wallet to configure CCIP or execute Emergency Shield." />;
  }

  if (!state.isOwner) {
    return <GuardCard message="Only vault owner can configure CCIP or execute Emergency Shield." />;
  }

  // ── main panel ───────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-4 space-y-4">

        {/* ── state: ccip not configured ── */}
        {state.ccipNotSet ? (
          <SetupView
            ccipRouterAddress={state.ccipRouterAddress}
            setCcipRouterAddress={state.setCcipRouterAddress}
            defaultRouter={state.defaultRouter}
            isWritePending={state.isWritePending}
            onSubmit={state.handleSetCCIPConfig}
          />
        ) : (

          /* ── state: ccip configured ── */
          <div className="grid grid-cols-[1fr_1fr] gap-4">

            {/* left col: shield form */}
            <div className="space-y-3">

              {/* token balance */}
              <TokenChip
                shieldToken={state.shieldToken}
                vaultTokenBalanceFormatted={state.vaultTokenBalanceFormatted}
                hasEnoughToken={state.hasEnoughToken}
              />

              {/* amount */}
              <div>
                <label htmlFor="shield-amount" className="text-[10px] text-muted block mb-1">
                  Amount
                </label>
                <input
                  id="shield-amount"
                  type="text"
                  value={state.shieldAmount}
                  onChange={(e) => state.setShieldAmount(e.target.value)}
                  placeholder="1"
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
                />
              </div>

              {/* receiver */}
              <div>
                <label htmlFor="shield-receiver" className="text-[10px] text-muted block mb-1">
                  Receiver
                </label>
                <input
                  id="shield-receiver"
                  type="text"
                  value={state.shieldReceiver || state.userAddress || ""}
                  onChange={(e) => state.setShieldReceiver(e.target.value)}
                  placeholder={state.userAddress ?? "0x..."}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
                />
              </div>

              {/* destination chain */}
              <div>
                <label htmlFor="dest-chain" className="text-[10px] text-muted block mb-1">
                  Destination Chain
                </label>
                <select
                  id="dest-chain"
                  value={state.destSelector.toString()}
                  onChange={(e) => state.setDestSelector(BigInt(e.target.value))}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
                >
                  {DESTINATION_OPTIONS.map((opt) => (
                    <option key={opt.selector.toString()} value={opt.selector.toString()}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* eth balance + conditional deposit row */}
              <VaultGasSection
                vaultEthBalanceFormatted={state.vaultEthBalanceFormatted}
                hasEnoughEth={state.hasEnoughEth}
                feeWei={state.feeWei}
                depositEthAmount={state.depositEthAmount}
                setDepositEthAmount={state.setDepositEthAmount}
                canDepositEth={state.canDepositEth}
                isWritePending={state.isWritePending}
                onDeposit={state.handleDepositEth}
              />

              {/* fee / warning messages */}
              <FeeStatus
                feeLoading={state.feeLoading}
                feeData={state.feeData}
                feeError={state.feeError}
                canEstimateFee={state.canEstimateFee}
                ethNeeded={state.ethNeeded}
                hasEnoughToken={state.hasEnoughToken}
                hasEnoughEth={state.hasEnoughEth}
                shieldAmount={state.shieldAmount}
              />

              {/* shield action */}
              <button
                onClick={state.handleEmergencyShield}
                disabled={!state.canExecuteShield}
                className="flex items-center gap-2 w-full justify-center rounded-xl bg-warning/20 py-2.5 text-xs font-semibold text-warning transition-all hover:bg-warning/30 disabled:opacity-50"
              >
                {state.isWritePending ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Execute Emergency Shield
                  </>
                )}
              </button>
            </div>

            {/* right col: drip faucet + explorer */}
            <div className="space-y-2">
              <DripFaucet
                onDrip={state.handleDrip}
                isPending={state.isWritePending}
                hasUser={!!state.userAddress}
              />
              <a
                href={`${CCIP_EXPLORER_BASE}/address/${vaultAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-primary/40 bg-primary/10 py-2 px-3 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open CCIP Explorer
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
