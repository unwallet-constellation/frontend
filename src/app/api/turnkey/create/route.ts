import { NextResponse } from 'next/server'

import { env } from '@/config/environment'
import { getAndValidateRequestData } from '@/utils/get-and-validate-request-data'
import { ApiKeyStamper } from '@turnkey/api-key-stamper'
import { TurnkeyClient, createActivityPoller } from '@turnkey/http'

import { reqSchema, resSchema } from './types'

export async function POST(req: Request) {
  const { data, error } = await getAndValidateRequestData(req, reqSchema)
  if (error) return NextResponse.json({}, { status: 400 })

  try {
    // Initialize Turnkey client
    const stamper = new ApiKeyStamper({
      apiPublicKey: env.TURNKEY_API_PUBLIC_KEY,
      apiPrivateKey: env.TURNKEY_API_PRIVATE_KEY,
    })
    const client = new TurnkeyClient({ baseUrl: 'https://api.turnkey.com' }, stamper)

    // Create sub-org
    const activityPoller = createActivityPoller({
      client,
      requestFn: client.createSubOrganization,
    })
    const completedActivity = await activityPoller({
      type: 'ACTIVITY_TYPE_CREATE_SUB_ORGANIZATION_V4',
      timestampMs: String(Date.now()),
      organizationId: env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID,
      parameters: {
        subOrganizationName: data.subOrgName,
        rootQuorumThreshold: 1,
        rootUsers: [
          {
            userName: 'New User',
            apiKeys: [],
            authenticators: [
              {
                authenticatorName: 'Passkey',
                challenge: data.challenge,
                attestation: data.attestation,
              },
            ],
          },
        ],
        wallet: {
          walletName: `Default Wallet`,
          accounts: [
            {
              curve: 'CURVE_SECP256K1',
              pathFormat: 'PATH_FORMAT_BIP32',
              path: "m/44'/60'/0'/0/0",
              addressFormat: 'ADDRESS_FORMAT_ETHEREUM',
            },
          ],
        },
      },
    })

    // Parse result
    const parseResult = resSchema.safeParse({
      subOrgId: completedActivity.result.createSubOrganizationResultV4?.subOrganizationId,
      walletId: completedActivity.result.createSubOrganizationResultV4?.wallet?.walletId,
      walletAddress: completedActivity.result.createSubOrganizationResultV4?.wallet?.addresses?.[0],
    })
    if (!parseResult.success) throw new Error(parseResult.error.message)

    return NextResponse.json(parseResult.data, { status: 200 })
  } catch (e) {
    console.error('Error while creating sub-org:', e)
    return NextResponse.json({}, { status: 500 })
  }
}
