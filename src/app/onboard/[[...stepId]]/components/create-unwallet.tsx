'use client'

import { redirect, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import StepIndicatorList from '@/components/step-indicator-list'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { domainTld } from '@/config/domain-tld'
import getPimlicoBundlerClient from '@/utils/pimlico/get-bundler-client'
import { useAtom } from 'jotai'
import { Lock } from 'lucide-react'
import { getSenderAddress } from 'permissionless'
import { toast } from 'sonner'
import { concat, encodeFunctionData } from 'viem'
import { avalancheFuji, polygonMumbai } from 'viem/chains'
import { usePublicClient } from 'wagmi'

import { passkeyAccountAtom } from '../atoms'
import { OnboardingStepComponentProps } from '../types'
import createPasskeyAccount from '../utils/create-passkey-account'

export default function CreateUnwalletStep(_: OnboardingStepComponentProps) {
  const searchParams = useSearchParams()
  const domainName = searchParams?.get('domainName')
  if (!domainName) redirect('/onboard/1')
  const domain = `${domainName}.${domainTld}`

  const [isLoading, setIsLoading] = useState(false)
  const [passkeyAccount, setPasskeyAccount] = useAtom(passkeyAccountAtom)
  const publicClient = usePublicClient()

  const handleCreatePasskeyAccount = async () => {
    setIsLoading(true)
    try {
      const account = await createPasskeyAccount(domain)
      setPasskeyAccount(account)
      toast.success('Created Passkey account')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create Passkey account')
    }
    setIsLoading(false)
  }

  const createSmartWallets = async () => {
    if (!passkeyAccount) return
    setIsLoading(true)

    try {
      // Create factory address
      const factoryAddress = '0x9406Cc6185a346906296840746125a0E44976454'
      const initCode = concat([
        factoryAddress,
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

      const chains = [avalancheFuji, polygonMumbai]
      for (const chain of chains) {
        const bundlerClient = await getPimlicoBundlerClient(chain)

        // Get entry point address
        const entryPoint = (await bundlerClient.supportedEntryPoints())?.[0]
        console.log(`Entry point for '${chain.name}' (${chain.id}):`, entryPoint)
        if (!entryPoint) throw new Error(`No entry point found for '${chain.name}' (${chain.id})`)

        // Calculate counterfactual address
        const senderAddress = await getSenderAddress(publicClient, { initCode, entryPoint })
        console.log(`Counterfactual address on '${chain.name}' (${chain.id}): ${senderAddress}`)

        toast.success(`Created wallet on ${chain.name}`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to create wallets')
    }
    setIsLoading(false)
  }

  return (
    <>
      <CardContent>
        <StepIndicatorList
          steps={[
            {
              title: 'Create Passkey Account',
              state: passkeyAccount ? 'completed' : isLoading ? 'loading' : 'current',
            },
            {
              title: 'Deploy Smart Wallets',
              state: passkeyAccount ? 'current' : 'pending',
            },
            {
              title: 'Register Multichain Domain',
              state: 'pending',
            },
          ]}
        />
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-2">
        {passkeyAccount ? (
          <Button size="lg" onClick={createSmartWallets} isLoading={isLoading}>
            <Lock size={16} className="mr-2 text-brand" />
            Deploy Wallets & Register
          </Button>
        ) : (
          <Button size="lg" onClick={handleCreatePasskeyAccount} isLoading={isLoading}>
            <Lock size={16} className="mr-2 text-brand" />
            Authenticate Passkey
          </Button>
        )}
      </CardFooter>
    </>
  )
}
