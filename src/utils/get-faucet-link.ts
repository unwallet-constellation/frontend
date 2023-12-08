import { Chain } from 'viem'
import * as chains from 'viem/chains'

export default function getFaucetLink(chain: Chain) {
  switch (chain.id) {
    case chains.avalancheFuji.id:
      return 'https://faucet.quicknode.com/avalanche/fuji'
    case chains.polygonMumbai.id:
      return 'https://faucet.polygon.technology'
    case chains.optimismGoerli.id:
    case chains.optimismSepolia.id:
    case chains.baseSepolia.id:
    case chains.zoraSepolia.id:
      return 'https://app.optimism.io/faucet'
    case chains.baseGoerli.id:
      return 'https://faucet.quicknode.com/base/goerli'
    default:
      return null
  }
}
