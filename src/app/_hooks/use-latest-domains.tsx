import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import request, { gql } from 'graphql-request'
import { Hex } from 'viem'

import { env } from '@/config/environment'

const latestDomainsQuery = gql`
  query Query {
    newOwners(first: 10, orderBy: blockTimestamp, orderDirection: desc) {
      node
      label
      owner
      timestamp: blockTimestamp
    }
  }
`

export type IndexedDomain = {
  node: string
  label: string
  owner: Hex
  timestamp: number
}
type LatestIndexedDomains = {
  newOwners: IndexedDomain[]
}

export const useLatestDomains = (options?: Partial<UseQueryOptions<LatestIndexedDomains>>) => {
  return useQuery<LatestIndexedDomains>({
    queryKey: ['latest-domains'],
    queryFn: async () => request(env.NEXT_PUBLIC_THEGRAPH_GRAPHQL_API, latestDomainsQuery),
    gcTime: 1000 * 60 * 60,
    ...options,
  })
}
