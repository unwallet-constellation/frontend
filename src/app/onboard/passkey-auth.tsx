'use client'

import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { env } from '@/config/environment'
import { getTurnkeyHttpClient } from '@/config/turnkey-client'
import { chains } from '@/wagmi.config'
import { getWebAuthnAttestation } from '@turnkey/http'
import { createAccount } from '@turnkey/viem'
import axios from 'axios'
import { createBundlerClient, getSenderAddress } from 'permissionless'
import { toast } from 'sonner'
import { LocalAccount, concat, encodeFunctionData, http } from 'viem'
import { usePublicClient } from 'wagmi'

import { resSchema as turnkeyResponseSchema } from '../api/turnkey/create/types'

const generateRandomBuffer = (): ArrayBuffer => {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return arr.buffer
}

const humanReadableDateTime = (): string => {
  return new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '.')
}

const base64UrlEncode = (challenge: ArrayBuffer): string => {
  return Buffer.from(challenge)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function PasskeyAuth() {
  const [passkeyAccount, setPasskeyAccount] = React.useState<LocalAccount>()
  const publicClient = usePublicClient()

  // TODO try/catch
  const createSubOrgAndPrivateKey = async () => {
    const challenge = generateRandomBuffer()
    const id = generateRandomBuffer()
    const name = `Passkey Demo - ${humanReadableDateTime()}`
    const attestation = await getWebAuthnAttestation({
      publicKey: {
        rp: {
          id: 'localhost',
          name: 'Passkey Demo',
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
    const parsedResponse = turnkeyResponseSchema.safeParse(response?.data)
    if (!parsedResponse.success) throw new Error('Invalid response internal API')

    // Create account
    const passkeyHttpClient = getTurnkeyHttpClient(window.location.hostname)
    const localAccount = await createAccount({
      client: passkeyHttpClient,
      organizationId: parsedResponse.data.subOrgId,
      signWith: parsedResponse.data.walletAddress,
    })
    setPasskeyAccount(localAccount)

    toast.success('Created Passkey Account!')
  }

  const createSmartWallet = async () => {
    if (!passkeyAccount) return

    console.log('chains', chains)

    for (const chain of chains) {
      // Setup bundler client
      const network = {
        '10200': 'chiado-testnet',
        '80001': 'mumbai',
        '420': 'optimism-goerli',
        '43113': 'avalanche-fuji',
        '84531': 'base-goerli',
        '59140': 'linea-testnet',
        '421613': 'arbitrum-goerli',
      }[chain.id]

      const bundlerClient = createBundlerClient({
        chain: chain,
        transport: http(
          `https://api.pimlico.io/v1/${network}/rpc?apikey=${env.NEXT_PUBLIC_PIMLICO_API_KEY}`,
        ),
      })
      const entryPointAddress = (await bundlerClient.supportedEntryPoints())?.[0]
      console.log(`Entry point for '${network}':`, entryPointAddress)
      if (!entryPointAddress) continue

      // Construct init message
      const SIMPLE_ACCOUNT_FACTORY_ADDRESS = '0x9406Cc6185a346906296840746125a0E44976454'
      const initCode = concat([
        SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        encodeFunctionData({
          abi: [
            {
              inputs: [
                { name: 'owner', type: 'address' },
                { name: 'salt', type: 'uint256' },
              ],
              name: 'createAccount',
              outputs: [{ name: 'ret', type: 'address' }],
              stateMutability: 'nonpayable',
              type: 'function',
            },
          ],
          args: [passkeyAccount.address, 0n],
        }),
      ])
      console.log('Generated initCode:', initCode)

      // Calculate counterfactual address
      const senderAddress = await getSenderAddress(publicClient, {
        initCode,
        entryPoint: entryPointAddress,
      })
      console.log(`Counterfactual address on '${network}': ${senderAddress}`)

      toast.success(`Counterfactual address on '${network}': ${senderAddress}`)
    }
    return
  }

  return (
    <Card className="max-w-[25rem] overflow-hidden">
      <CardHeader>
        <CardTitle>Create Wallet</CardTitle>
        <CardDescription>Passkey Authentication & ERC-4337 Wallet Initialization.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="font-mono text-sm">{passkeyAccount?.address || 'No Passkey Account'}</div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button onClick={createSubOrgAndPrivateKey}>1. Create Key</Button>
        <Button onClick={createSmartWallet} disabled={!passkeyAccount}>
          2. Create Smart Wallet
        </Button>
      </CardFooter>
    </Card>
  )
}
