'use client'

import { redirect } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import { useAtomValue } from 'jotai'
import { toast } from 'sonner'

import LoadingPlaceholder from '@/components/loading-placeholder'

import HomeFooter from '../_components/home-footer'
import {
  DomainContext,
  TurnkeyAuthContext,
  domainContextAtom,
  turnkeyAuthContextAtom,
} from '../atoms'
import ActionsMenuWidget from './_components/actions-menu-widget'
import DomainAndBalanceWidget from './_components/domain-and-balance-widget'
import FavoriteContactsWidget from './_components/favorite-contacts-widget'

export default function DashboardPage() {
  const authContext = useAtomValue(turnkeyAuthContextAtom)
  const domainContext = useAtomValue(domainContextAtom)

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])

  return hasMounted ? (
    <DashboardPageContent {...{ authContext, domainContext }} />
  ) : (
    <LoadingPlaceholder />
  )
}

interface DashboardPageContentProps {
  authContext: TurnkeyAuthContext | null
  domainContext: DomainContext | null
}
const DashboardPageContent: FC<DashboardPageContentProps> = ({ authContext, domainContext }) => {
  useEffect(() => {
    if (!authContext || !domainContext) {
      toast.error('Not authenticated, redirecting…')
      redirect('/')
    }
  }, [])

  return (
    <>
      <main className="my-10 flex w-[29rem] max-w-full flex-col gap-4">
        <DomainAndBalanceWidget {...(domainContext as any)} />
        <FavoriteContactsWidget />
        <ActionsMenuWidget />
      </main>
      <HomeFooter />
    </>
  )
}
