import { createPimlicoBundlerClient } from 'permissionless/clients/pimlico'
import { Chain, http } from 'viem'

import { env } from '@/config/environment'

import { getPimlicoNetworkId } from './get-network-id'

export const getPimlicoBundlerClient = async (chain: Chain) => {
  const baseUrl = 'https://api.pimlico.io/v1/'
  const pimlicoNetwork = getPimlicoNetworkId(chain)
  const bundlerClient = createPimlicoBundlerClient({
    chain: chain,
    transport: http(`${baseUrl}${pimlicoNetwork}/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`),
  })
  return bundlerClient
}
