/**
 * Source: https://docs.ens.domains/ensip/11#specification (ENSIP-11 Specification)
 */
import { goerli, mainnet, sepolia } from 'viem/chains'

export const convertEVMChainIdToCoinType = (chainId: number) => {
  if (chainId === mainnet.id) return 60
  if (chainId === sepolia.id) return 60
  if (chainId === goerli.id) return 60

  return (0x80000000 | chainId) >>> 0
}

export const convertCoinTypeToEVMChainId = (coinType: number) => {
  if (coinType === 60) return mainnet.id

  return (0x7fffffff & coinType) >> 0
}
