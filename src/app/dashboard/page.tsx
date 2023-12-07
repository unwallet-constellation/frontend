'use client'

import { useAtom } from 'jotai'

import HomeFooter from '../_components/home-footer'
import { passkeyAccountAtom, smartWalletAddressesAtom, smartWalletDomainNameAtom } from '../atoms'
import ActionsMenuWidget from './_components/actions-menu-widget'
import DomainAndBalanceWidget from './_components/domain-and-balance-widget'
import FavoriteContactsWidget from './_components/favorite-contacts-widget'

export default function DashboardPage() {
  const [passkeyAccount, setPasskeyAccount] = useAtom(passkeyAccountAtom)
  const [smartWalletAddresses, setSmartWalletAddresses] = useAtom(smartWalletAddressesAtom)
  const [smartWalletDomainName, setSmartWalletDomainName] = useAtom(smartWalletDomainNameAtom)
  // TODO
  // if (!passkeyAccount || !smartWalletDomainName) redirect('/')

  return (
    <>
      <main className="my-10 flex w-[29rem] max-w-full flex-col gap-4">
        <DomainAndBalanceWidget />
        <FavoriteContactsWidget />
        <ActionsMenuWidget />
      </main>
      <HomeFooter />
    </>
  )
}
