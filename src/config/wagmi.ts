import { configureChains, createConfig, mainnet } from 'wagmi'
import { avalancheFuji, baseGoerli, optimismGoerli, polygonMumbai } from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

import { env } from './environment'

export const chains = [avalancheFuji, polygonMumbai, optimismGoerli, baseGoerli]

export const {
  chains: chainsWithMainnet,
  publicClient,
  webSocketPublicClient,
} = configureChains(
  [mainnet, ...chains],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain.id) {
          case mainnet.id:
            return { http: `https://rpc.ankr.com/eth/${env.NEXT_PUBLIC_ANKR_API_KEY}` }
          case avalancheFuji.id:
            return { http: `https://rpc.ankr.com/avalanche_fuji/${env.NEXT_PUBLIC_ANKR_API_KEY}` }
          case polygonMumbai.id:
            return { http: `https://rpc.ankr.com/polygon_mumbai/${env.NEXT_PUBLIC_ANKR_API_KEY}` }
          case optimismGoerli.id:
            return { http: `https://rpc.ankr.com/optimism_testnet/${env.NEXT_PUBLIC_ANKR_API_KEY}` }
          case baseGoerli.id:
            return { http: `https://rpc.ankr.com/base_goerli/${env.NEXT_PUBLIC_ANKR_API_KEY}` }
          default:
            return null
        }
      },
    }),
    infuraProvider({ apiKey: env.NEXT_PUBLIC_INFURA_API_KEY }),
    publicProvider(),
  ],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
