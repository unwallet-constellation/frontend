import { Hex } from 'viem'

type ChainlinkPriceFeed = {
  currencySymbol: string
  denominationCurrencySymbol: 'USD'
  address: Hex
  chainId: 1
}

export default function getChainlinkPriceFeed(
  currencySymbol: string,
  denominationCurrencySymbol: 'USD' = 'USD',
): ChainlinkPriceFeed | null {
  if (!currencySymbol) return null

  const result = { currencySymbol, denominationCurrencySymbol, chainId: 1 as 1 }

  const currencyPair = `${currencySymbol.toUpperCase()}/${denominationCurrencySymbol.toUpperCase()}`
  switch (currencyPair) {
    case 'ETH/USD':
      return { ...result, address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419' }
    case 'MATIC/USD':
      return { ...result, address: '0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676' }
    case 'AVAX/USD':
      return { ...result, address: '0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7' }
    default:
      return null
  }
}
