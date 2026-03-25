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
        <p className="text-muted flex items-center gap-1 text-[11px]">
          <Loader2 className="h-3 w-3 animate-spin" />
          Estimating fee...
        </p>
      )}

      {feeData && (
        <p className="text-muted text-[11px]">
          Est. fee: <span className="text-foreground font-semibold">{feeData.fee_eth} ETH</span>
          {ethNeeded && <span className="text-danger ml-1">(need {ethNeeded} more)</span>}
        </p>
      )}

      {feeError && canEstimateFee && (
        <p className="text-muted text-[11px]">
          Fee estimate unavailable. Proceeding with 0.003 ETH minimum.
        </p>
      )}

      {(!hasEnoughToken || !hasEnoughEth) && amountEntered && (
        <p className="text-danger text-[11px]">
          Deposit CCIP-BnM and ETH to vault first. Vault pays the fee.
        </p>
      )}
    </>
  );
}
