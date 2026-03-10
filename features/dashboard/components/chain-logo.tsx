import { NetworkIcon } from "@web3icons/react/dynamic";
import NetworkBaseSepolia from "@web3icons/react/icons/networks/NetworkBaseSepolia";
import NetworkBase from "@web3icons/react/icons/networks/NetworkBase";
import { FACTORY_CHAIN, BASE_CHAIN_ID } from "@/lib/constants/chains";

export function ChainLogo({ chainId, className }: { chainId: number; className?: string }) {
  if (chainId === FACTORY_CHAIN.id) return <NetworkBaseSepolia className={className} />;
  if (chainId === BASE_CHAIN_ID) return <NetworkBase className={className} />;
  return <NetworkIcon chainId={chainId} className={className} />;
}
