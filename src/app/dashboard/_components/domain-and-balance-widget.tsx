import { useAtomValue } from 'jotai'
import { Copy } from 'lucide-react'
import { baseSepolia } from 'viem/chains'

import { smartWalletDomainNameAtom } from '@/app/atoms'
import ChainIcon from '@/components/chain-icon'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { domainTld } from '@/config/domain-tld'
import { chains } from '@/config/wagmi'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

import { FaucetWidgetAction } from './faucet-widget-action'
import { SendWidgetAction } from './send-widget-action'

export default function DomainAndBalanceWidget() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-gray-900 px-4 py-5">
      {/* Widget Sections */}
      <div className="min-h-[5rem] rounded-lg bg-background px-4 py-5">
        <DomainWidgetSection />
        <Separator className="-mx-4 my-5 w-auto" />
        <BalanceWidgetSection />
      </div>

      {/* Widget Actions */}
      <div className="flex gap-4 [&>*]:grow">
        <FaucetWidgetAction />
        <SendWidgetAction />
      </div>
    </div>
  )
}

const DomainWidgetSection = () => {
  const smartWalletDomainName = useAtomValue(smartWalletDomainNameAtom)
  const domain = `${smartWalletDomainName}.${domainTld}`
  baseSepolia
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Multichain Domain</p>
        <h2 className="font-mono text-xl font-semibold leading-none tracking-tight">
          {smartWalletDomainName}
          <span className="font-medium text-muted-foreground/75">.{domainTld}</span>
        </h2>
        <div className="group -mb-2 flex select-none gap-1 py-2">
          {chains.map((chain, i) => (
            <div
              key={`chain-icon-${chain.id}`}
              className="transition-transform group-hover:!translate-x-0"
              style={{ transform: `translateX(calc(-${i * 0.75}rem)` }}
            >
              <ChainIcon width={24} height={24} chain={chain} />
            </div>
          ))}
        </div>
      </div>

      {/* Copy domain to clipboard */}
      <Button
        type="button"
        onClick={() => copyToClipboard(domain, `Domain '${domain}'`)}
        variant="ghost"
        className="shrink-0"
        title="Copy domain to clipboard"
      >
        <Copy size={18} />
      </Button>
    </div>
  )
}

const BalanceWidgetSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm text-muted-foreground">Total Balance</h3>
      <p className="font-mono text-xl font-semibold leading-none tracking-tight">
        3,000
        <span className="font-medium text-muted-foreground/75">.00 $</span>
      </p>
    </div>
  )
}
