import { configureChains, createConfig, mainnet } from 'wagmi'
import { avalancheFuji, baseGoerli, optimismGoerli, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { env } from './environment'

export const chains = [avalancheFuji, polygonMumbai, optimismGoerli, baseGoerli]

export const {
  chains: chainsWithMainnet,
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [mainnet, ...chains],
  [infuraProvider({ apiKey: env.NEXT_PUBLIC_INFURA_API_KEY }), publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
