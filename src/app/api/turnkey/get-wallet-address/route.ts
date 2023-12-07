import { NextResponse } from 'next/server'

import { ApiKeyStamper } from '@turnkey/api-key-stamper'
import { TurnkeyClient } from '@turnkey/http'

import { env } from '@/config/environment'
import { getAndValidateRequestData } from '@/utils/get-and-validate-request-data'

import {
  turnkeyGetWalletAddressRequestSchema,
  turnkeyGetWalletAddressResponseSchema,
} from './types'

export async function POST(req: Request) {
  const { data, error } = await getAndValidateRequestData(req, turnkeyGetWalletAddressRequestSchema)
  if (error) return NextResponse.json({}, { status: 400 })

  try {
    // Initialize Turnkey client
    const stamper = new ApiKeyStamper({
      apiPublicKey: env.TURNKEY_API_PUBLIC_KEY,
      apiPrivateKey: env.TURNKEY_API_PRIVATE_KEY,
    })
    const client = new TurnkeyClient({ baseUrl: 'https://api.turnkey.com' }, stamper)

    // Turnkey API: `/public/v1/query/list_wallets`
    const { wallets } = await client.getWallets({ organizationId: data.organizationId })
    if (!wallets?.length)
      throw new Error(`No wallets for organization '${data.organizationId}' found`)
    const { walletId, walletName } = wallets[0]

    // Turnkey API: `/public/v1/query/list_wallet_accounts`
    const { accounts } = await client.getWalletAccounts({
      organizationId: data.organizationId,
      walletId,
    })
    if (!accounts?.length)
      throw new Error(`No accounts for wallet '${walletId}' (${walletName}) found`)
    const { address: walletAddress } = accounts[0]

    // Verify result
    const parseResult = turnkeyGetWalletAddressResponseSchema.safeParse({
      walletId,
      walletName,
      walletAddress,
    })
    if (!parseResult.success) throw new Error(parseResult.error.message)

    return NextResponse.json(parseResult.data, { status: 200 })
  } catch (e) {
    console.error('Error while getting wallet address:', e)
    return NextResponse.json({}, { status: 500 })
  }
}
