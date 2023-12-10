import { Copy } from 'lucide-react'

import { DomainContext } from '@/app/atoms'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { domainTld } from '@/config/domain-tld'
import { chains } from '@/config/wagmi'
import { useChainlinkPriceFeeds } from '@/hooks/use-chainlink-price-feeds'
import { copyToClipboard } from '@/utils/copy-to-clipboard'

import { useDomainMultichainBalances } from '../_hooks/use-domain-multichain-balances'
import { ChainDetailsHoverCard } from './chain-details-hover-card'
import { FaucetWidgetAction } from './faucet-widget-action'
import { SendWidgetAction } from './send-widget-action'

interface DomainAndBalanceWidgetProps extends DomainContext {}
export default function DomainAndBalanceWidget(props: DomainAndBalanceWidgetProps) {
  return (
    <div className="-mx-4 flex flex-col gap-4 rounded-xl bg-gray-900 px-4 py-5">
      {/* Widget Sections */}
      <Card className="px-4 py-5">
        <DomainWidgetSection {...props} />
        <Separator className="-mx-4 my-5 w-auto" />
        <BalanceWidgetSection {...props} />
      </Card>

      {/* Widget Actions */}
      <div className="flex gap-4 [&>*]:grow">
        <FaucetWidgetAction />
        <SendWidgetAction />
      </div>
    </div>
  )
}

const DomainWidgetSection = (domainContext: DomainAndBalanceWidgetProps) => {
  const { domain, domainName } = domainContext

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Multichain Domain</p>
        <h2 className="font-mono text-xl font-semibold leading-none tracking-tight">
          {domainName}
          <span className="font-medium text-muted-foreground/75">.{domainTld}</span>
        </h2>
        <div className="group -mb-2 flex select-none gap-1 py-2">
          {chains.map((chain, i) => (
            <div
              key={`chain-icon-${chain.id}`}
              className="z-50 transition-transform delay-500 group-hover:!translate-x-0 group-hover:delay-0"
              style={{ transform: `translateX(calc(-${i * 0.75}rem)` }}
            >
              <ChainDetailsHoverCard {...{ chain, domainContext }} />
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

const BalanceWidgetSection = (domainContext: DomainAndBalanceWidgetProps) => {
  const balances = useDomainMultichainBalances(domainContext)
  const balancesWithPrices = useChainlinkPriceFeeds(balances || [])

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm text-muted-foreground">Total Balance</h3>
      <p className="font-mono text-xl font-semibold leading-none tracking-tight">
        {!balances?.length ||
        !balancesWithPrices?.data?.totalFormattedInUSD ||
        balancesWithPrices.isLoading ? (
          <span className="animate-pulse font-medium text-muted-foreground/75">0.00 $</span>
        ) : (
          <>
            {balancesWithPrices.data.totalFormattedInUSD}
            <span className="font-medium text-muted-foreground/75"> $</span>
          </>
        )}
      </p>
    </div>
  )
}
