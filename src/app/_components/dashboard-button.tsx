'use client'

import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

import { useAtomValue } from 'jotai'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utils/cn'

import { domainContextAtom, turnkeyAuthContextAtom } from '../atoms'

interface DashboardButtonProps extends HTMLAttributes<HTMLButtonElement> {}
export const DashboardButton: FC<DashboardButtonProps> = ({ className, ...rest }) => {
  const authContext = useAtomValue(turnkeyAuthContextAtom)
  const domainContext = useAtomValue(domainContextAtom)
  if (!authContext || !domainContext) return null

  return (
    <>
      <Link
        href="/dashboard"
        className={cn(buttonVariants({ variant: 'outline' }), 'h-auto rounded-full px-7')}
      >
        <div className="flex flex-col items-center justify-center leading-none">
          <span className="text-base tracking-tight">Go to Dashboard</span>
          <span className="text-xs font-normal text-muted-foreground/80">
            {domainContext.domain}
          </span>
        </div>
      </Link>
    </>
  )
}
