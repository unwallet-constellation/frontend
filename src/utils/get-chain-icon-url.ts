import { Chain } from 'viem'
import * as chains from 'viem/chains'

export default function getChainIconUrl(chain: Chain) {
  switch (chain.id) {
    case chains.avalanche.id:
    case chains.avalancheFuji.id:
      return '/chain-icons/avax.jpg'
    case chains.arbitrum.id:
    case chains.arbitrumNova.id:
    case chains.arbitrumSepolia.id:
      return '/chain-icons/arbitrum.jpg'
    case chains.polygonMumbai.id:
    case chains.polygon.id:
    case chains.polygonZkEvm.id:
    case chains.polygonZkEvmTestnet.id:
      return '/chain-icons/polygon.png'
    case chains.optimism.id:
    case chains.optimismSepolia.id:
      return '/chain-icons/optimism.jpg'
    case chains.base.id:
    case chains.baseSepolia.id:
      return '/chain-icons/base.jpg'
    default:
      return null
  }
}
