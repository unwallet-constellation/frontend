import { configureChains, createConfig } from 'wagmi'
import { avalancheFuji, baseGoerli, optimismGoerli, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { env } from './environment'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalancheFuji, polygonMumbai, optimismGoerli, baseGoerli],
  [infuraProvider({ apiKey: env.NEXT_PUBLIC_INFURA_API_KEY }), publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
