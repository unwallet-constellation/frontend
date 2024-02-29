'use client'

import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

import {
  fifsRegistrarCcipAbi,
  fifsRegistrarCcipAddress,
  publicResolverCcipAbi,
  publicResolverCcipAddress,
  reverseRegistrarCcipAbi,
  reverseRegistrarCcipAddress,
  simpleAccountAbi,
} from '@/wagmi.generated'
import { convertEVMChainIdToCoinType } from '@ensdomains/address-encoder'
import { useAtom } from 'jotai'
import { Lock } from 'lucide-react'
import { BundlerClient, UserOperation, getSenderAddress } from 'permissionless'
import { PimlicoPaymasterClient } from 'permissionless/clients/pimlico'
import { toast } from 'sonner'
import { Hex, LocalAccount, encodeFunctionData, labelhash, namehash } from 'viem'
import { avalancheFuji, baseSepolia, optimismSepolia, polygonMumbai } from 'viem/chains'
import { usePublicClient } from 'wagmi'

import { domainContextAtom, turnkeyAuthContextAtom } from '@/app/atoms'
import { PasskeyDialogOverlay } from '@/components/passkey-dialog-overlay'
import StepIndicatorList from '@/components/step-indicator-list'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { domainTld } from '@/config/domain-tld'
import {
  buildUserOperation,
  generateInitCode,
  getFactoryAddress,
  getPimlicoBundlerClient,
  getPimlicoPaymasterClient,
} from '@/utils/pimlico'
import { signUserOperationWithPasskey } from '@/utils/pimlico/sign-user-operation-with-passkey'

import createPasskeyAccount from '../_utils/create-passkey-account'
import { OnboardingStepComponentProps } from '../types'

export default function CreateUnwalletStep(_: OnboardingStepComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const domainName = searchParams?.get('domainName')
  if (!domainName) redirect('/setup/1')
  const domain = `${domainName}.${domainTld}`

  const hubChain = avalancheFuji
  const publicClient = usePublicClient()

  const [isLoading, setIsLoading] = useState(false)
  const [isSigning, setIsSigning] = useState(false)

  const [counterfactualAddresses, setCounterfactualAddresses] = useState<Record<string, Hex>>({})
  const [hasDeterminedAddresses, setHasDeterminedAddresses] = useState(false)
  const [, setAuthContext] = useAtom(turnkeyAuthContextAtom)
  const [passkeyAccount, setPasskeyAccount] = useState<LocalAccount>()
  const [domainContext, setDomainContext] = useAtom(domainContextAtom)

  const initCodeRef = useRef<Hex>()
  const hubBundlerClientRef = useRef<BundlerClient>()
  const hubPaymasterClientRef = useRef<PimlicoPaymasterClient>()
  const hubEntryPointRef = useRef<Hex>()
  const hubSenderRef = useRef<Hex>()

  const handleCreatePasskeyAccount = async () => {
    setIsLoading(true)
    try {
      const { account, authContext } = await createPasskeyAccount(domain)
      setPasskeyAccount(account)
      setAuthContext(authContext)
      toast.success('Created local passkey account')

      await determineCounterfactualAddresses(account)
      setHasDeterminedAddresses(true)
      toast.success('Configured multichain smart wallets')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create Passkey account')
      setPasskeyAccount(undefined)
      setAuthContext(null)
      setHasDeterminedAddresses(false)
    } finally {
      setIsSigning(false)
    }
    setIsLoading(false)
  }

  const determineCounterfactualAddresses = async (passkeyAccount: LocalAccount) => {
    const chains = [avalancheFuji, polygonMumbai, optimismSepolia, baseSepolia]
    for (const chain of chains) {
      const initCode = generateInitCode(getFactoryAddress(chain)!, passkeyAccount.address)
      const bundlerClient = await getPimlicoBundlerClient(chain)

      // Get entry point address
      const entryPoint = (await bundlerClient.supportedEntryPoints())?.[0]
      console.log(`Entry point for '${chain.name}' (${chain.id}):`, entryPoint)
      if (!entryPoint) throw new Error(`No entry point found for '${chain.name}' (${chain.id})`)

      // Calculate counterfactual address
      const sender = await getSenderAddress(publicClient, { initCode, entryPoint })
      console.log(`Counterfactual address on '${chain.name}' (${chain.id}): ${sender}`)
      setCounterfactualAddresses((prev) => ({ ...prev, [chain.id]: sender }))

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
      // Build callData for domain registration & set-addresses
      const callData = encodeFunctionData({
        abi: simpleAccountAbi,
        functionName: 'executeBatch',
        args: [
          [
            fifsRegistrarCcipAddress[hubChain.id],
            publicResolverCcipAddress[hubChain.id],
            reverseRegistrarCcipAddress[hubChain.id],
            ...Object.keys(counterfactualAddresses).map(
              (_) => publicResolverCcipAddress[hubChain.id],
            ),
          ],
          [
            encodeFunctionData({
              abi: fifsRegistrarCcipAbi,
              functionName: 'register',
              args: [labelhash(domainName), hubSenderRef.current],
            }),
            encodeFunctionData({
              abi: publicResolverCcipAbi,
              functionName: 'setAddr',
              args: [namehash(domain), hubSenderRef.current],
            }),
            encodeFunctionData({
              abi: reverseRegistrarCcipAbi,
              functionName: 'setName',
              args: [domain],
            }),
            ...Object.entries(counterfactualAddresses).map(([chainId, address]) =>
              encodeFunctionData({
                abi: publicResolverCcipAbi,
                functionName: 'setAddr',
                args: [
                  namehash(domain),
                  BigInt(convertEVMChainIdToCoinType(parseInt(chainId))),
                  address,
                ],
              }),
            ),
          ],
        ],
      })
      console.log('Generated domain registration & set-address batch callData:', callData)

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
      setIsSigning(true)
      const signature = await signUserOperationWithPasskey({
        passkeyAccount,
        userOperation,
        chain: hubChain,
        entryPoint: hubEntryPointRef.current,
      })
      setIsSigning(false)
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

      // Set domain context & edirect to dashboard on success
      setDomainContext({ domain, domainName, domainTld })
      toast.success(`Successfully registered domain, redirecting…`)
      router.push(`/dashboard`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create wallet or register domain')
    } finally {
      setIsSigning(false)
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
              state:
                domainContext?.domain === domain
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

      <PasskeyDialogOverlay open={isSigning} domain={domain} />
    </>
  )
}
