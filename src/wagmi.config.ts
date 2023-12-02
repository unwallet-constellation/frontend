import { configureChains, createConfig } from 'wagmi'
import {
  arbitrumGoerli,
  avalancheFuji,
  baseGoerli,
  gnosisChiado,
  lineaTestnet,
  optimismGoerli,
  polygonMumbai,
} from 'wagmi/chains'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    avalancheFuji,
    baseGoerli,
    optimismGoerli,
    polygonMumbai,
    gnosisChiado,
    lineaTestnet,
    arbitrumGoerli,
  ],
  [infuraProvider({ apiKey: '81470a17e68f4e37b07f6a447145656c' }), publicProvider()],
)

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})
