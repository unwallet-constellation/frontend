'use client'

import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

import StepIndicatorList from '@/components/step-indicator-list'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { domainTld } from '@/config/domain-tld'
import {
  buildUserOperation,
  factoryAddress,
  generateInitCode,
  getPimlicoBundlerClient,
  getPimlicoPaymasterClient,
} from '@/utils/pimlico'
import { signUserOperationWithPasskey } from '@/utils/pimlico/sign-user-operation-with-passkey'
import { fifsRegistrarCcipABI, fifsRegistrarCcipAddress, simpleAccountABI } from '@/wagmi.generated'
import { useAtom } from 'jotai'
import { Lock } from 'lucide-react'
import { BundlerClient, UserOperation, getSenderAddress } from 'permissionless'
import { PimlicoPaymasterClient } from 'permissionless/clients/pimlico'
import { toast } from 'sonner'
import { Hex, LocalAccount, encodeFunctionData, labelhash } from 'viem'
import { avalancheFuji, optimismGoerli } from 'viem/chains'
import { usePublicClient } from 'wagmi'

import { passkeyAccountAtom, smartWalletAddressesAtom, smartWalletDomainNameAtom } from '../atoms'
import { OnboardingStepComponentProps } from '../types'
import createPasskeyAccount from '../utils/create-passkey-account'

export default function CreateUnwalletStep(_: OnboardingStepComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainName = searchParams?.get('domainName')
  if (!domainName) redirect('/setup/1')
  const domain = `${domainName}.${domainTld}`

  const hubChain = avalancheFuji
  const publicClient = usePublicClient()

  const initCodeRef = useRef<Hex>()
  const hubBundlerClientRef = useRef<BundlerClient>()
  const hubPaymasterClientRef = useRef<PimlicoPaymasterClient>()
  const hubEntryPointRef = useRef<Hex>()
  const hubSenderRef = useRef<Hex>()

  const [isLoading, setIsLoading] = useState(false)
  const [passkeyAccount, setPasskeyAccount] = useAtom(passkeyAccountAtom)
  const [smartWalletAddresses, setSmartWalletAddresses] = useAtom(smartWalletAddressesAtom)
  const [hasDeterminedAddresses, setHasDeterminedAddresses] = useState(false)
  const [smartWalletDomainName, setSmartWalletDomainName] = useAtom(smartWalletDomainNameAtom)

  const handleCreatePasskeyAccount = async () => {
    setIsLoading(true)
    try {
      const account = await createPasskeyAccount(domain)
      setPasskeyAccount(account)
      toast.success('Created Passkey Account')
      await determineCounterfactualAddresses(account)
      toast.success('Configured Smart Wallet')
      setHasDeterminedAddresses(true)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create Passkey account')
      setPasskeyAccount(null)
      setHasDeterminedAddresses(false)
    }
    setIsLoading(false)
  }

  const determineCounterfactualAddresses = async (passkeyAccount: LocalAccount) => {
    const chains = [avalancheFuji, optimismGoerli]
    const initCode = generateInitCode(factoryAddress, passkeyAccount.address)
    for (const chain of chains) {
      const bundlerClient = await getPimlicoBundlerClient(chain)

      // Get entry point address
      const entryPoint = (await bundlerClient.supportedEntryPoints())?.[0]
      console.log(`Entry point for '${chain.name}' (${chain.id}):`, entryPoint)
      if (!entryPoint) throw new Error(`No entry point found for '${chain.name}' (${chain.id})`)

      // Calculate counterfactual address
      const sender = await getSenderAddress(publicClient, { initCode, entryPoint })
      console.log(`Counterfactual address on '${chain.name}' (${chain.id}): ${sender}`)
      setSmartWalletAddresses({ ...smartWalletAddresses, [chain.id]: sender })

      // Store state for performance reasons
      if (chain.id === hubChain.id) {
        initCodeRef.current = initCode
        hubBundlerClientRef.current = bundlerClient
        hubPaymasterClientRef.current = await getPimlicoPaymasterClient(hubChain)
        hubEntryPointRef.current = entryPoint
        hubSenderRef.current = sender
      }
    }
  }

  const createSmartWallets = async () => {
    if (
      !passkeyAccount ||
      !initCodeRef.current ||
      !hubBundlerClientRef.current ||
      !hubPaymasterClientRef.current ||
      !hubEntryPointRef.current ||
      !hubSenderRef.current
    )
      return
    setIsLoading(true)

    try {
      // Register domain calldata
      const callData = encodeFunctionData({
        abi: simpleAccountABI,
        functionName: 'execute',
        args: [
          fifsRegistrarCcipAddress[hubChain.id],
          0n,
          encodeFunctionData({
            abi: fifsRegistrarCcipABI,
            functionName: 'register',
            args: [labelhash(domainName), hubSenderRef.current],
          }),
        ],
      })
      console.log('Generated domain registration callData:', callData)

      // Build useroperation
      let userOperation = (await buildUserOperation({
        sender: hubSenderRef.current,
        entryPoint: hubEntryPointRef.current,
        callData,
        bundlerClient: hubBundlerClientRef.current,
        publicClient,
        initCode: initCodeRef.current,
      })) as UserOperation
      console.log('Built userOperation:', userOperation)

      // Sponsor the useroperation
      const sponsorParams = await hubPaymasterClientRef.current.sponsorUserOperation({
        userOperation,
        entryPoint: hubEntryPointRef.current,
      })
      userOperation = { ...userOperation, ...sponsorParams }
      console.log('Sponsored userOperation:', userOperation)

      // Sign the useroperation
      const signature = await signUserOperationWithPasskey({
        passkeyAccount,
        userOperation,
        chain: hubChain,
        entryPoint: hubEntryPointRef.current,
      })
      userOperation = { ...userOperation, signature }
      console.log('Signed userOperation:', userOperation)

      // Send the useroperation
      const hash = await hubBundlerClientRef.current.sendUserOperation({
        userOperation,
        entryPoint: hubEntryPointRef.current,
      })
      console.log('Sent userOperation:', hash)

      console.log('Querying for receipts...')
      const receipt = await hubBundlerClientRef.current.waitForUserOperationReceipt({ hash })
      const txHash = receipt.receipt.transactionHash
      console.log(`Transaction hash: ${txHash}`)

      // Redirect to dashboard on success
      setSmartWalletDomainName(domainName)
      toast.success(`Registered '${domain}'`)
      router.push(`/`) // TODO
    } catch (error) {
      console.error(error)
      toast.error('Failed to create wallet')
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
              title: 'Configure Smart Wallet',
              state: hasDeterminedAddresses
                ? 'completed'
                : passkeyAccount
                  ? isLoading
                    ? 'loading'
                    : 'current'
                  : 'pending',
            },
            {
              title: 'Register Multichain Domain',
              state: smartWalletDomainName
                ? 'completed'
                : hasDeterminedAddresses
                  ? isLoading
                    ? 'loading'
                    : 'current'
                  : 'pending',
            },
          ]}
        />
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-2">
        {passkeyAccount ? (
          <Button size="lg" onClick={createSmartWallets} isLoading={isLoading}>
            <Lock size={16} className="mr-2 text-brand" />
            Deploy Wallet & Register
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
