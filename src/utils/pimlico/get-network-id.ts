import { Chain } from 'viem'

export const getPimlicoNetworkId = (chain: Chain) => {
  const network = {
    '43113': 'avalanche-fuji',
    '80001': 'mumbai',
    '10200': 'chiado-testnet',
    '420': 'optimism-goerli',
    '84531': 'base-goerli',
    '59140': 'linea-testnet',
    '421613': 'arbitrum-goerli',
  }[chain.id]

  if (!network) {
    throw new Error(`Unsupported chain '${chain.name}' (${chain.id})`)
  }

  return network
}
