import { createAccount } from '@turnkey/viem'

import { getTurnkeyHttpClient } from '@/config/turnkey-client'

import { TurnkeyAuthContext } from '../atoms'

export default async function getAccountFromAuthContext(authContext: TurnkeyAuthContext) {
  const passkeyHttpClient = getTurnkeyHttpClient(window.location.hostname)
  const account = await createAccount({
    client: passkeyHttpClient,
    organizationId: authContext.organizationId,
    signWith: authContext.walletAddress,
  })

  return account
}
