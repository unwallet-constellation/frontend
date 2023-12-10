import { eacAggregatorProxyABI } from '@/wagmi.generated'
import { formatEther } from 'viem'
import { mainnet, useContractReads } from 'wagmi'

import getChainlinkPriceFeed from '@/utils/get-chainlink-price-feed'

type Balance = {
  decimals: number
  symbol: string
  value: bigint
}
export const useChainlinkPriceFeeds = (balances: Balance[]) => {
  return useContractReads({
    watch: true,
    contracts: (balances || []).map((balance) => ({
      chainId: mainnet.id,
      address: getChainlinkPriceFeed(balance.symbol)?.address,
      abi: eacAggregatorProxyABI,
      functionName: 'latestRoundData',
    })),
    select: (results) => {
      const prices = results.map(({ error, result }) => {
        if (error || !(result as any)?.length) return 0n
        return ((result as any)[1] as bigint) / 10n ** 8n
      })
      const balancesInUSD = balances.map((balance, index) => {
        return balance.value * prices[index]
      })
      const totalBalanceInUSD = balancesInUSD.reduce((a, b) => a + b, 0n)
      const totalFormattedInUSD = parseFloat(formatEther(totalBalanceInUSD)).toFixed(2)

      return {
        prices,
        balancesInUSD,
        totalBalanceInUSD,
        totalFormattedInUSD,
      }
    },
  })
}
