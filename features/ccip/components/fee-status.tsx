"use client";

import { Loader2 } from "lucide-react";

export function FeeStatus({
  feeLoading,
  feeData,
  feeError,
  canEstimateFee,
  ethNeeded,
  hasEnoughToken,
  hasEnoughEth,
  shieldAmount,
}: {
  feeLoading: boolean;
  feeData: { fee_eth: string } | null | undefined;
  feeError: boolean;
  canEstimateFee: boolean | string | null | undefined;
  ethNeeded: string | null;
  hasEnoughToken: boolean;
  hasEnoughEth: boolean;
  shieldAmount: string;
}) {
  const amountEntered = shieldAmount && parseFloat(shieldAmount) > 0;

  return (
    <>
      {feeLoading && canEstimateFee && (
        <p className="text-[11px] text-muted flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Estimating fee...
        </p>
      )}

      {feeData && (
        <p className="text-[11px] text-muted">
          Est. fee:{" "}
          <span className="font-semibold text-foreground">{feeData.fee_eth} ETH</span>
          {ethNeeded && <span className="text-danger ml-1">(need {ethNeeded} more)</span>}
        </p>
      )}

      {feeError && canEstimateFee && (
        <p className="text-[11px] text-muted">
          Fee estimate unavailable. Proceeding with 0.003 ETH minimum.
        </p>
      )}

      {(!hasEnoughToken || !hasEnoughEth) && amountEntered && (
        <p className="text-[11px] text-danger">
          Deposit CCIP-BnM and ETH to vault first. Vault pays the fee.
        </p>
      )}
    </>
  );
}
