import { Transport, fallback, http } from 'viem'
import { avalancheFuji, baseSepolia, mainnet, optimismSepolia, polygonMumbai } from 'viem/chains'
import { createConfig } from 'wagmi'

import { env } from './environment'

export const transports: Record<number, Transport> = {
  [mainnet.id]: fallback([
    http(`https://rpc.ankr.com/eth/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
    http(`https://mainnet.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
  ]),
  [avalancheFuji.id]: fallback([
    http(`https://rpc.ankr.com/avalanche_fuji/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
    http(`https://avalanche-fuji.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
  ]),
  [polygonMumbai.id]: fallback([
    http(`https://rpc.ankr.com/polygon_mumbai/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
    http(`https://polygon-mumbai.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
  ]),
  [optimismSepolia.id]: fallback([
    http(`https://rpc.ankr.com/optimism_sepolia/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
    http(`https://optimism-sepolia.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
  ]),
  [baseSepolia.id]: http(`https://rpc.ankr.com/base_sepolia/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
}

export const wagmiConfig = createConfig({
  chains: [mainnet, avalancheFuji, polygonMumbai, optimismSepolia, baseSepolia],
  transports,
})

export const chains = wagmiConfig.chains.filter((chain) => chain.id !== mainnet.id)
