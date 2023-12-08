import Link from 'next/link'

import { ArrowDownToDot } from 'lucide-react'

import ChainIcon from '@/components/chain-icon'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { chains } from '@/config/wagmi'
import getFaucetLink from '@/utils/get-faucet-link'

export const FaucetWidgetAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="brand" className="ring-offset-gray-900">
          <ArrowDownToDot size={16} className="mr-2" />
          Faucet
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark min-w-[230px]">
        {chains
          .filter((c) => !!getFaucetLink(c))
          .map((chain) => (
            <Link key={`faucet-${chain.id}`} href={getFaucetLink(chain) as string} target="_blank">
              <DropdownMenuItem className="cursor-pointer items-center">
                <ChainIcon size={18} chain={chain} className="border" />
                <span className="ml-2">{chain.name}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {chain.nativeCurrency.symbol}
                </span>
              </DropdownMenuItem>
            </Link>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
