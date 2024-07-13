import { Transport, http } from 'viem'
import { avalancheFuji, baseSepolia, mainnet, optimismSepolia } from 'viem/chains'
import { cookieStorage, createConfig, createStorage } from 'wagmi'

import { env } from './environment'

export const transports: Record<number, Transport> = {
  [mainnet.id]: http(`https://rpc.ankr.com/eth/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
  [avalancheFuji.id]: http(`https://rpc.ankr.com/avalanche_fuji/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
  // [polygonMumbai.id]:
  //   http(`https://rpc.ankr.com/polygon_mumbai/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
  [optimismSepolia.id]: http(
    `https://rpc.ankr.com/optimism_sepolia/${env.NEXT_PUBLIC_ANKR_API_KEY}`,
  ),
  [baseSepolia.id]: http(`https://rpc.ankr.com/base_sepolia/${env.NEXT_PUBLIC_ANKR_API_KEY}`),
}

export const wagmiConfig = createConfig({
  chains: [
    mainnet,
    avalancheFuji,
    // polygonMumbai,
    optimismSepolia,
    baseSepolia,
  ],
  transports,

  // SSR
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})

export const chains = wagmiConfig.chains.filter((chain) => chain.id !== mainnet.id)
