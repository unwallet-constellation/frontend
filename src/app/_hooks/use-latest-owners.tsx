import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'
import { Hex } from 'viem'

import { env } from '@/config/environment'

const latestOwnersQuery = gql`
  query Query {
    latestOwners: reverseClaimeds(
      first: 5
      where: { blockTimestamp_gt: 1702041640 }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      owner: addr
      hashedDomain: node
      timestamp: blockTimestamp
    }
  }
`

export type IndexedNewOwner = {
  owner: Hex
  hashedDomain: string
  timestamp: number
}
type IndexedNewOwners = {
  latestOwners: IndexedNewOwner[]
}

export const useLatestOwners = (options?: Partial<UseQueryOptions<IndexedNewOwners>>) => {
  return useQuery<IndexedNewOwners>({
    queryKey: ['latest-owners'],
    queryFn: async () => request(env.NEXT_PUBLIC_THEGRAPH_GRAPHQL_API, latestOwnersQuery),
    gcTime: 1000 * 60 * 60,
    ...options,
  })
}
