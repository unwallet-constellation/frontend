import { pimlicoPaymasterActions } from 'permissionless/actions/pimlico'
import { Chain, createClient, http } from 'viem'

import { env } from '@/config/environment'

import { getPimlicoNetworkId } from './get-network-id'

export const getPimlicoPaymasterClient = async (chain: Chain) => {
  // ⚠️ using v2 of the API ⚠️
  const baseUrl = 'https://api.pimlico.io/v2/'
  const pimlicoNetwork = getPimlicoNetworkId(chain)
  const bundlerClient = createClient({
    chain: chain,
    transport: http(`${baseUrl}${pimlicoNetwork}/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`),
  }).extend(pimlicoPaymasterActions)
  return bundlerClient
}
