"use client";

import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseUnits, parseEther, formatUnits, zeroAddress } from "viem";
import { VAULT_CCIP_ABI, CCIP_BNM_ABI } from "@/lib/contracts";
import { CCIP_ROUTERS, CCIP_CHAIN_SELECTORS, CCIP_BNM_BASE_SEPOLIA } from "@/lib/constants/ccip";
import { CCIP_MIN_ETH_FALLBACK } from "@/lib/constants/urls";
import { FACTORY_CHAIN } from "@/lib/constants/chains";
import { useCCIPEstimateFee } from "@/lib/api/hooks";

export const DESTINATION_OPTIONS = [
  { label: "Ethereum Sepolia", selector: CCIP_CHAIN_SELECTORS.ethereum_sepolia },
  { label: "Arbitrum Sepolia", selector: CCIP_CHAIN_SELECTORS.arbitrum_sepolia },
  { label: "OP Sepolia", selector: CCIP_CHAIN_SELECTORS.op_sepolia },
  { label: "BNB Chain Testnet", selector: CCIP_CHAIN_SELECTORS.bnb_chain_testnet },
];

interface UseCCIPPanelOptions {
  vaultAddress: `0x${string}`;
  chainId: number;
  vaultOwner: string | null;
}

export function useCCIPPanel({ vaultAddress, chainId, vaultOwner }: UseCCIPPanelOptions) {
  const { address: userAddress, isConnected } = useAccount();

  // Form state
  const [ccipRouterAddress, setCcipRouterAddress] = useState<string>("");
  const [shieldToken, setShieldToken] = useState<string>(CCIP_BNM_BASE_SEPOLIA);
  const [shieldAmount, setShieldAmount] = useState("");
  const [shieldReceiver, setShieldReceiver] = useState("");
  const [destSelector, setDestSelector] = useState<bigint>(CCIP_CHAIN_SELECTORS.ethereum_sepolia);
  const [depositEthAmount, setDepositEthAmount] = useState(CCIP_MIN_ETH_FALLBACK);

  // Derived config
  const defaultRouter = (CCIP_ROUTERS[chainId] ?? CCIP_ROUTERS[FACTORY_CHAIN.id]) as string;

  // On-chain reads
  const { data: currentCcipRouter } = useReadContract({
    address: vaultAddress,
    abi: VAULT_CCIP_ABI,
    functionName: "ccipRouter",
  });

  const { data: vaultTokenBalance } = useReadContract({
    address: vaultAddress,
    abi: VAULT_CCIP_ABI,
    functionName: "getBalance",
    args: [shieldToken as `0x${string}`],
  });

  const { data: vaultEthBalance } = useReadContract({
    address: vaultAddress,
    abi: VAULT_CCIP_ABI,
    functionName: "getBalance",
    args: [zeroAddress],
  });

  // On-chain write
  const {
    data: writeHash,
    isPending: isWritePending,
    writeContract,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Derived booleans
  const isOwner =
    isConnected &&
    userAddress &&
    vaultOwner &&
    userAddress.toLowerCase() === vaultOwner.toLowerCase();

  const ccipNotSet =
    !currentCcipRouter || currentCcipRouter === "0x0000000000000000000000000000000000000000";

  // Fee estimation inputs
  const amountNum = parseFloat(shieldAmount);
  const canEstimateFee =
    shieldToken &&
    shieldAmount &&
    (shieldReceiver || userAddress) &&
    !Number.isNaN(amountNum) &&
    amountNum > 0 &&
    destSelector > 0n;

  const receiverAddr = shieldReceiver || userAddress || "";
  let amountRaw = "0";
  try {
    amountRaw = parseUnits(shieldAmount || "0", 18).toString();
  } catch {}

  const { data: feeData, isLoading: feeLoading, isError: feeError } = useCCIPEstimateFee(
    canEstimateFee && receiverAddr && amountRaw !== "0"
      ? {
          vault_address: vaultAddress,
          chain_id: chainId,
          destination_chain_selector: Number(destSelector),
          token_address: shieldToken,
          amount: amountRaw,
          receiver: receiverAddr,
        }
      : null,
    { enabled: Boolean(canEstimateFee && receiverAddr && amountRaw !== "0") },
  );

  // Derived balance/fee checks
  const amountRawBigInt = amountRaw !== "0" ? BigInt(amountRaw) : 0n;
  const feeWei = feeData ? BigInt(feeData.fee_wei) : 0n;
  const hasEnoughToken = vaultTokenBalance != null && vaultTokenBalance >= amountRawBigInt;
  const feeWithBuffer = feeWei > 0n ? (feeWei * BigInt(97)) / BigInt(100) : 0n;
  const minEthFallback = parseEther(CCIP_MIN_ETH_FALLBACK);
  const hasEnoughEth =
    vaultEthBalance != null &&
    (feeWei > 0n
      ? vaultEthBalance >= feeWithBuffer
      : vaultEthBalance >= minEthFallback && !feeLoading);

  const depositEthNum = parseFloat(depositEthAmount);
  const canDepositEth = !Number.isNaN(depositEthNum) && depositEthNum > 0;

  // Formatted display values
  const vaultTokenBalanceFormatted =
    vaultTokenBalance != null ? formatUnits(vaultTokenBalance, 18) : null;
  const vaultEthBalanceFormatted =
    vaultEthBalance != null ? formatUnits(vaultEthBalance, 18) : null;
  const ethNeeded =
    vaultEthBalance != null && feeWei > 0n && !hasEnoughEth
      ? formatUnits(vaultEthBalance >= feeWei ? 0n : feeWei - vaultEthBalance, 18)
      : null;

  // Action handlers
  function handleSetCCIPConfig() {
    const router = ccipRouterAddress.trim() || defaultRouter;
    if (!router.startsWith("0x") || router.length !== 42) return;
    writeContract({
      address: vaultAddress,
      abi: VAULT_CCIP_ABI,
      functionName: "setCCIPConfig",
      args: [router as `0x${string}`],
    });
  }

  function handleDepositEth() {
    if (!canDepositEth) return;
    try {
      const value = parseEther(depositEthAmount);
      if (value <= 0n) return;
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "deposit",
        args: [],
        value,
      });
    } catch {}
  }

  function handleDrip() {
    if (!userAddress) return;
    writeContract({
      address: CCIP_BNM_BASE_SEPOLIA,
      abi: CCIP_BNM_ABI,
      functionName: "drip",
      args: [userAddress],
    });
  }

  function handleEmergencyShield() {
    const recv = shieldReceiver || userAddress;
    if (!shieldToken || !shieldAmount || !recv) return;
    try {
      const amountParsed = parseUnits(shieldAmount, 18);
      writeContract({
        address: vaultAddress,
        abi: VAULT_CCIP_ABI,
        functionName: "emergencyShield",
        args: [destSelector, recv as `0x${string}`, shieldToken as `0x${string}`, amountParsed],
      });
    } catch {}
  }

  const canExecuteShield =
    !isWritePending &&
    !!shieldToken &&
    !!shieldAmount &&
    !!(shieldReceiver || userAddress) &&
    parseFloat(shieldAmount) > 0 &&
    hasEnoughToken &&
    hasEnoughEth;

  return {
    // Auth state
    isConnected,
    isOwner,
    userAddress,
    // CCIP config state
    ccipNotSet,
    currentCcipRouter,
    ccipRouterAddress,
    setCcipRouterAddress,
    defaultRouter,
    // Shield form state
    shieldToken,
    setShieldToken,
    shieldAmount,
    setShieldAmount,
    shieldReceiver,
    setShieldReceiver,
    destSelector,
    setDestSelector,
    // ETH deposit form state
    depositEthAmount,
    setDepositEthAmount,
    canDepositEth,
    // Fee estimation
    feeData,
    feeLoading,
    feeError,
    canEstimateFee,
    // Balance checks
    hasEnoughToken,
    hasEnoughEth,
    feeWei,
    vaultTokenBalanceFormatted,
    vaultEthBalanceFormatted,
    ethNeeded,
    // Write state
    isWritePending,
    writeHash,
    writeError,
    resetWrite,
    // Handlers
    handleSetCCIPConfig,
    handleDepositEth,
    handleDrip,
    handleEmergencyShield,
    canExecuteShield,
    // Constants
    DESTINATION_OPTIONS,
  };
}
