import { Chain } from 'viem'
import {
  avalancheFuji,
  baseGoerli,
  baseSepolia,
  optimismGoerli,
  optimismSepolia,
  polygonMumbai,
  zoraSepolia,
} from 'viem/chains'

export default function getFaucetLink(chain: Chain) {
  switch (chain.id) {
    case avalancheFuji.id:
      return 'https://faucet.quicknode.com/avalanche/fuji'
    case polygonMumbai.id:
      return 'https://faucet.polygon.technology'
    case optimismGoerli.id:
    case optimismSepolia.id:
    case baseSepolia.id:
    case zoraSepolia.id:
      return 'https://app.optimism.io/faucet'
    case baseGoerli.id:
      return 'https://faucet.quicknode.com/base/goerli'
    default:
      return null
  }
}
