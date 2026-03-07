import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, base, arbitrum, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Sentient Finance',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet, base, arbitrum, sepolia],
  ssr: true,
})
