import { getPriceFeedForToken } from "@/lib/constants/chainlink-feeds";
import { useReadContract } from "wagmi";

const AGGREGATOR_ABI = [
  {
    name: "latestRoundData",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "roundId", type: "uint80" },
      { name: "answer", type: "int256" },
      { name: "startedAt", type: "uint256" },
      { name: "updatedAt", type: "uint256" },
      { name: "answeredInRound", type: "uint80" },
    ],
  },
] as const;

/**
 * Returns the current USD price for a token from its Chainlink feed,
 * or undefined if no feed is configured for this chain/symbol.
 */
export function useFeedPrice(chainId: number, sym: string): string | undefined {
  const feedAddress = getPriceFeedForToken(chainId, sym);

  const { data } = useReadContract({
    address: feedAddress,
    abi: AGGREGATOR_ABI,
    functionName: "latestRoundData",
    query: { enabled: !!feedAddress, staleTime: 30_000 },
  });

  if (!data) return undefined;
  // Chainlink USD feeds use 8 decimals
  const price = Number(data[1]) / 1e8;
  return price > 0 ? price.toFixed(2) : undefined;
}
