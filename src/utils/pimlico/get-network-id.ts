import { Chain } from 'viem'

export const getPimlicoNetworkId = (chain: Chain) => {
  const network = {
    '43113': 'avalanche-fuji',
    '80001': 'mumbai',
    '10200': 'chiado-testnet',
    '11155420': 'optimism-sepolia',
    '84532': 'base-sepolia',
    '59140': 'linea-testnet',
  }[chain.id]

  if (!network) {
    throw new Error(`Unsupported chain '${chain.name}' (${chain.id})`)
  }

  return network
}
