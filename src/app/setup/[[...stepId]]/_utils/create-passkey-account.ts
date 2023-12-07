import { getWebAuthnAttestation } from '@turnkey/http'
import { createAccount } from '@turnkey/viem'
import axios from 'axios'
import dayjs from 'dayjs'

import { turnkeyCreateResponseSchema } from '@/app/api/turnkey/create/types'
import { SITE_METADATA } from '@/config/metadata'
import { getTurnkeyHttpClient } from '@/config/turnkey-client'

const generateRandomBuffer = (): ArrayBuffer => {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return arr.buffer
}

const base64UrlEncode = (challenge: ArrayBuffer): string => {
  return Buffer.from(challenge)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export default async function createPasskeyAccount(_name?: string) {
  const challenge = generateRandomBuffer()
  const id = generateRandomBuffer()
  const name = _name || `${SITE_METADATA.title} - ${dayjs().format('DD.MM.YYYY')}`
  const attestation = await getWebAuthnAttestation({
    publicKey: {
      rp: {
        id: window.location.hostname,
        name: SITE_METADATA.title,
      },
      challenge,
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
      user: { id, name, displayName: name },
    },
  })

  const response = await axios.post('/api/turnkey/create', {
    subOrgName: name,
    attestation,
    challenge: base64UrlEncode(challenge),
  })
  const parsedResponse = turnkeyCreateResponseSchema.safeParse(response?.data)
  if (!parsedResponse.success) throw new Error('Invalid response from server')

  const passkeyHttpClient = getTurnkeyHttpClient(window.location.hostname)

  const account = await createAccount({
    client: passkeyHttpClient,
    organizationId: parsedResponse.data.subOrgId,
    signWith: parsedResponse.data.walletAddress,
  })

  return account
}
