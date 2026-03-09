export const BASE_SEPOLIA_CHAIN_ID = 84532;

/**
 * Token symbol -> Chainlink price feed address (USD).
 * @see https://docs.chain.link/data-feeds/price-feeds/addresses?network=base&networkType=testnet
 */
export const CHAINLINK_PRICE_FEEDS: Record<number, Record<string, `0x${string}`>> = {
  [BASE_SEPOLIA_CHAIN_ID]: {
    WETH: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1" as `0x${string}`, // ETH/USD
    // LINK: add from https://docs.chain.link/data-feeds/price-feeds/addresses when available
    // CCIP-BnM: no native feed
  },
};

export function getPriceFeedForToken(chainId: number, tokenSymbol: string): `0x${string}` | undefined {
  return CHAINLINK_PRICE_FEEDS[chainId]?.[tokenSymbol];
}
