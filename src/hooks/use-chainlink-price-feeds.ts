import { useEffect } from 'react'

import { eacAggregatorProxyAbi } from '@/wagmi.generated'
import { useQueryClient } from '@tanstack/react-query'
import { formatEther } from 'viem'
import { mainnet } from 'viem/chains'
import { useBlockNumber, useReadContracts } from 'wagmi'

import getChainlinkPriceFeed from '@/utils/get-chainlink-price-feed'

type Balance = {
  decimals: number
  symbol: string
  value: bigint
}
export const useChainlinkPriceFeeds = (balances: Balance[]) => {
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const queryClient = useQueryClient()
  const query = useReadContracts({
    contracts: (balances || []).map((balance) => ({
      chainId: mainnet.id,
      address: getChainlinkPriceFeed(balance.symbol)?.address,
      abi: eacAggregatorProxyAbi,
      functionName: 'latestRoundData',
    })),
    query: {
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
    },
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: query.queryKey })
  }, [blockNumber, queryClient])

  return query
}
