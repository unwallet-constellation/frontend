'use client'

import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes, useState } from 'react'

import axios from 'axios'
import { useAtom } from 'jotai'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { isHex } from 'viem'

import { PasskeyDialogOverlay } from '@/components/passkey-dialog-overlay'
import { env } from '@/config/environment'
import { getTurnkeyHttpClient } from '@/config/turnkey-client'
import { cn } from '@/utils/cn'

import {
  TurnkeyGetWalletAddressRequestSchema,
  TurnkeyGetWalletAddressResponseSchema,
} from '../api/turnkey/get-wallet-address/types'
import { domainContextAtom, turnkeyAuthContextAtom } from '../atoms'

interface SigninButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export const SigninButton: FC<SigninButtonProps> = ({ className, ...rest }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSigning, setIsSigning] = useState(false)
  const [authContext, setAuthContext] = useAtom(turnkeyAuthContextAtom)
  const [domainContext, setDomainContext] = useAtom(domainContextAtom)
  const isSignedIn = !!authContext && !!domainContext

  const handleSignin = async () => {
    setIsLoading(true)

    try {
      // Turnkey API: `/public/v1/query/whoami`
      const turnkeyClient = getTurnkeyHttpClient(window.location.hostname)
      setIsSigning(true)
      const { organizationId, organizationName, userId } = await turnkeyClient.getWhoami({
        organizationId: env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID,
      })

      setIsSigning(false)
      if (!organizationId || !organizationName || !userId)
        throw new Error('Invalid whoami response')

      // Fetch wallet id & address via api route to prevent 3x Passkey-signing
      const res = await axios.post<TurnkeyGetWalletAddressResponseSchema>(
        '/api/turnkey/get-wallet-address',
        { organizationId } satisfies TurnkeyGetWalletAddressRequestSchema,
      )
      const { walletAddress } = res.data
      if (!isHex(walletAddress)) throw new Error('Invalid wallet address')

      // Set auth & domain context
      setAuthContext({ organizationId, walletAddress })
      const domain = organizationName
      const [domainName, domainTld] = domain.split('.')
      setDomainContext({ domain, domainName, domainTld })

      // Redirect to dashboard
      router.push('/dashboard')
      toast.success(`Successfully authenticated, redirecting…`)
    } catch (error) {
      console.error('Error while signing-in:', error)
      toast.error(`Couldn't sign-in, try a different Passkey`)
    } finally {
      setIsSigning(false)
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleSignin}
        disabled={isLoading}
        className={cn(className)}
        {...rest}
      >
        {isLoading ? (
          <Loader size={18} className="my-px animate-spin ease-in-out" />
        ) : isSignedIn ? (
          'Use another Unwallet →'
        ) : (
          'Use an existing Unwallet →'
        )}
      </button>
      <PasskeyDialogOverlay open={isSigning} />
    </>
  )
}
