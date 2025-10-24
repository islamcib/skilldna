'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum, optimism],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'SkillDNA',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '5067d129d06a090ef0c73084da024f49',
  chains
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
