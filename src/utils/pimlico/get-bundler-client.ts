import { env } from '@/config/environment'
import { createBundlerClient } from 'permissionless'
import { Chain, http } from 'viem'

import getPimlicoNetworkId from './get-network-id'

export default async function getPimlicoBundlerClient(chain: Chain) {
  const baseUrl = 'https://api.pimlico.io/v1/'
  const pimlicoNetwork = getPimlicoNetworkId(chain)
  const bundlerClient = createBundlerClient({
    chain: chain,
    transport: http(`${baseUrl}${pimlicoNetwork}/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`),
  })
  return bundlerClient
}
