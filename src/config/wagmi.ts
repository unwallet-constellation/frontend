import { configureChains, createConfig, mainnet } from 'wagmi'
import { avalancheFuji, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { env } from './environment'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, avalancheFuji, polygonMumbai],
  [infuraProvider({ apiKey: env.NEXT_PUBLIC_INFURA_API_KEY }), publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
