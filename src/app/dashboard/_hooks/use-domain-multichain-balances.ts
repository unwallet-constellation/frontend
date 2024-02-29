import { useEffect, useState } from 'react'

import { publicResolverCcipAbi, publicResolverCcipAddress } from '@/wagmi.generated'
import { convertEVMChainIdToCoinType } from '@ensdomains/address-encoder'
import { Chain, Hex, createPublicClient, formatUnits, isHex, namehash } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useBlockNumber, useReadContracts } from 'wagmi'

import { DomainContext } from '@/app/atoms'
import { chains as configChains, transports } from '@/config/wagmi'

type Balance = {
  chainId: number
  decimals: number
  symbol: string
  value: bigint
  formatted: string
}
export const useDomainMultichainBalances = (
  { domain }: DomainContext,
  chains: Chain[] = configChains,
  watch: boolean = true,
) => {
  const { data: blockNumber } = useBlockNumber({ watch: true, query: { enabled: !!watch } })
  const [balances, setBalances] = useState<Balance[]>()

  // 1. Resolve all addresses via ENSIP-11
  const addresses = useReadContracts({
    contracts: chains.map((chain) => ({
      chainId: avalancheFuji.id,
      address: publicResolverCcipAddress[avalancheFuji.id],
      abi: publicResolverCcipAbi,
      functionName: 'addr',
      args: [namehash(domain), BigInt(convertEVMChainIdToCoinType(chain.id))],
    })),
    query: {
      select: (results) => {
        return results.map(({ error, result }) => {
          if (!result || error) return null
          return result as Hex
        })
      },
    },
  })

  // 2. Fetch native balances
  const updateAggregatedBalance = async () => {
    const newBalances: Balance[] = []
    for (let i = 0; i < chains.length; i++) {
      const chain = chains[i]
      const address = addresses.data?.[i]
      if (!address || !isHex(address)) {
        newBalances.push({
          chainId: chain.id,
          decimals: chain.nativeCurrency.decimals,
          symbol: chain.nativeCurrency.symbol,
          value: 0n,
          formatted: '0',
        })
      } else {
        const client = createPublicClient({ chain, transport: transports[chain.id] })
        const balance = await client.getBalance({ address })
        newBalances.push({
          chainId: chain.id,
          decimals: chain.nativeCurrency.decimals,
          symbol: chain.nativeCurrency.symbol,
          value: balance,
          formatted: formatUnits(balance, chain.nativeCurrency.decimals),
        })
      }
    }
    setBalances(() => newBalances)
  }
  useEffect(() => {
    updateAggregatedBalance()
  }, [addresses.isFetched, blockNumber])

  return balances
}
