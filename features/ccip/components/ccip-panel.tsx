"use client";

import { useCCIPPanel } from "@/features/ccip/hooks/use-ccip-panel";
import { CCIP_EXPLORER_BASE } from "@/lib/constants/urls";
import { getExplorerBase } from "@/lib/utils";
import { AlertCircle, Check, ExternalLink, Loader2, Settings2, ShieldAlert } from "lucide-react";
import { DripFaucet } from "./drip-faucet";

interface CCIPPanelProps {
  vaultAddress: `0x${string}`;
  chainId: number;
  vaultOwner: string | null;
}

export function CCIPPanel({ vaultAddress, chainId, vaultOwner }: CCIPPanelProps) {
  const {
    isConnected,
    isOwner,
    userAddress,
    ccipNotSet,
    currentCcipRouter,
    ccipRouterAddress,
    setCcipRouterAddress,
    defaultRouter,
    shieldToken,
    setShieldToken,
    shieldAmount,
    setShieldAmount,
    shieldReceiver,
    setShieldReceiver,
    destSelector,
    setDestSelector,
    depositEthAmount,
    setDepositEthAmount,
    canDepositEth,
    feeData,
    feeLoading,
    feeError,
    canEstimateFee,
    hasEnoughToken,
    hasEnoughEth,
    feeWei,
    vaultTokenBalanceFormatted,
    vaultEthBalanceFormatted,
    ethNeeded,
    isWritePending,
    writeHash,
    writeError,
    resetWrite,
    handleSetCCIPConfig,
    handleDepositEth,
    handleDrip,
    handleEmergencyShield,
    canExecuteShield,
    DESTINATION_OPTIONS,
  } = useCCIPPanel({ vaultAddress, chainId, vaultOwner });

  if (!isConnected) {
    return (
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
          CCIP Cross-Chain
        </p>
        <p className="text-xs text-muted">
          Connect wallet to configure CCIP or execute Emergency Shield.
        </p>
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="rounded-xl border border-border/50 bg-card-2/40 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
          CCIP Cross-Chain
        </p>
        <p className="text-xs text-muted">
          Only vault owner can configure CCIP or execute Emergency Shield.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-2">
        CCIP Cross-Chain
      </p>

      <div className="rounded-xl border border-border/50 bg-card-2/40 p-4 space-y-4">
        {ccipNotSet ? (
          <div className="space-y-3">
            <DripFaucet onDrip={handleDrip} isPending={isWritePending} hasUser={!!userAddress} />
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-primary" />
              <p className="text-xs font-semibold text-foreground">Configure CCIP Router</p>
            </div>
            <p className="text-[11px] text-muted">
              Set the Chainlink CCIP router to enable cross-chain Emergency Shield.
            </p>
            <div>
              <label className="text-[10px] text-muted block mb-1">CCIP Router Address</label>
              <input
                type="text"
                value={ccipRouterAddress || defaultRouter}
                onChange={(e) => setCcipRouterAddress(e.target.value)}
                placeholder={defaultRouter}
                className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
              />
            </div>
            <button
              onClick={handleSetCCIPConfig}
              disabled={isWritePending}
              className="flex items-center gap-2 w-full justify-center rounded-xl bg-primary/20 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/30 disabled:opacity-50"
            >
              {isWritePending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Setting...
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Set CCIP Config
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-success">
              <Check className="h-4 w-4" />
              <p className="text-xs font-medium">
                CCIP configured: {String(currentCcipRouter).slice(0, 10)}...
              </p>
            </div>

            <DripFaucet onDrip={handleDrip} isPending={isWritePending} hasUser={!!userAddress} />

            <div className="space-y-3 pt-2 border-t border-border/40">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-warning" />
                <p className="text-xs font-semibold text-foreground">Emergency Shield</p>
              </div>
              <p className="text-[11px] text-muted">
                Only CCIP-BnM supports cross-chain. Fee paid in ETH from vault. Deposit CCIP-BnM and
                ETH to vault first.
              </p>

              <div>
                <label className="text-[10px] text-muted block mb-1">Token (CCIP-BnM)</label>
                <input
                  type="text"
                  value={shieldToken}
                  onChange={(e) => setShieldToken(e.target.value)}
                  placeholder="0x..."
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted block mb-1">
                  Amount (18 decimals, e.g. 1)
                </label>
                <input
                  type="text"
                  value={shieldAmount}
                  onChange={(e) => setShieldAmount(e.target.value)}
                  placeholder="1"
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted block mb-1">
                  Receiver (destination chain)
                </label>
                <input
                  type="text"
                  value={shieldReceiver || userAddress || ""}
                  onChange={(e) => setShieldReceiver(e.target.value)}
                  placeholder={userAddress ?? "0x..."}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-mono text-foreground outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-[10px] text-muted block mb-1">Destination Chain</label>
                <select
                  value={destSelector.toString()}
                  onChange={(e) => setDestSelector(BigInt(e.target.value))}
                  className="w-full rounded-lg border border-border/60 bg-card px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary/50"
                >
                  {DESTINATION_OPTIONS.map((opt) => (
                    <option key={opt.selector.toString()} value={opt.selector.toString()}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {vaultTokenBalanceFormatted != null && (
                <p className="text-[11px] text-muted">
                  Vault CCIP-BnM:{" "}
                  <span
                    className={
                      !hasEnoughToken
                        ? "text-danger font-semibold"
                        : "font-semibold text-foreground"
                    }
                  >
                    {vaultTokenBalanceFormatted}
                  </span>
                </p>
              )}

              {vaultEthBalanceFormatted != null && (
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[11px] text-muted">
                    Vault ETH:{" "}
                    <span
                      className={
                        !hasEnoughEth && feeWei > 0n
                          ? "text-danger font-semibold"
                          : "font-semibold text-foreground"
                      }
                    >
                      {vaultEthBalanceFormatted}
                    </span>
                  </p>
                  {!hasEnoughEth && (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={depositEthAmount}
                        onChange={(e) => setDepositEthAmount(e.target.value)}
                        placeholder="0.003"
                        className="w-16 rounded border border-border/60 bg-card px-2 py-0.5 text-[11px] font-mono"
                      />
                      <button
                        onClick={handleDepositEth}
                        disabled={isWritePending || !canDepositEth}
                        className="rounded bg-primary/20 px-2 py-0.5 text-[11px] font-semibold text-primary hover:bg-primary/30 disabled:opacity-50"
                      >
                        Deposit ETH
                      </button>
                    </div>
                  )}
                </div>
              )}

              {feeData && (
                <p className="text-[11px] text-muted">
                  Est. fee:{" "}
                  <span className="font-semibold text-foreground">{feeData.fee_eth} ETH</span>
                  {ethNeeded && <span className="text-danger ml-1">(need {ethNeeded} more)</span>}
                </p>
              )}

              {(!hasEnoughToken || !hasEnoughEth) &&
                shieldAmount &&
                parseFloat(shieldAmount) > 0 && (
                  <p className="text-[11px] text-danger">
                    Deposit CCIP-BnM and ETH to vault first. Vault pays the fee.
                  </p>
                )}

              {feeLoading && canEstimateFee && (
                <p className="text-[11px] text-muted flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Estimating fee...
                </p>
              )}

              {feeError && canEstimateFee && (
                <p className="text-[11px] text-muted">
                  Fee estimate unavailable (API). Proceeding with 0.003 ETH minimum.
                </p>
              )}

              <button
                onClick={handleEmergencyShield}
                disabled={!canExecuteShield}
                className="flex items-center gap-2 w-full justify-center rounded-xl bg-warning/20 py-2.5 text-xs font-semibold text-warning transition-all hover:bg-warning/30 disabled:opacity-50"
              >
                {isWritePending ? (
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
          </>
        )}

        {writeError && (
          <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3">
            <AlertCircle className="h-4 w-4 text-danger shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-danger">{writeError.message}</p>
              <button
                onClick={resetWrite}
                className="text-[10px] text-muted hover:text-foreground mt-1"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {writeHash && (
          <div className="flex items-center gap-2 text-success">
            <Check className="h-4 w-4" />
            <a
              href={`${getExplorerBase(chainId)}/tx/${writeHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium hover:underline"
            >
              Tx: {writeHash.slice(0, 10)}...{writeHash.slice(-8)}
            </a>
          </div>
        )}

        {!ccipNotSet && (
          <div className="rounded-lg border border-border/50 bg-card/50 p-3 space-y-2 mt-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              CCIP History
            </p>
            <p className="text-[11px] text-muted">
              View cross-chain transaction history for this vault on Chainlink Explorer.
            </p>
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
        )}
      </div>
    </div>
  );
}
