'use client'

import { useRouter } from 'next/navigation'
import { FC, HTMLAttributes } from 'react'

import { useAtom } from 'jotai'

import { cn } from '@/utils/cn'

import { domainContextAtom, turnkeyAuthContextAtom } from '../atoms'

interface SignoutButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export const SignoutButton: FC<SignoutButtonProps> = ({ className, ...rest }) => {
  const router = useRouter()
  const [authContext, setAuthContext] = useAtom(turnkeyAuthContextAtom)
  const [domainContext, setDomainContext] = useAtom(domainContextAtom)

  const handleSignout = async () => {
    setAuthContext(null)
    setDomainContext(null)
    router.push('/')
  }

  if (!authContext || !domainContext) return null

  return (
    <>
      •
      <button type="button" onClick={handleSignout} className={cn(className)} {...rest}>
        Clear Session
      </button>
    </>
  )
}
