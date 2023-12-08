import { HTMLAttributes, useMemo } from 'react'

import { Chain } from 'viem'

import { cn } from '@/utils/cn'
import getChainIconUrl from '@/utils/get-chain-icon-url'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface ChainIconProps extends HTMLAttributes<HTMLDivElement> {
  chain: Chain
  size?: number
}
export default function ChainIcon({ chain, size = 24, className, ...rest }: ChainIconProps) {
  const iconUrl = useMemo(() => getChainIconUrl(chain), [chain])

  return (
    <Avatar
      className={cn('select-none rounded-full', className)}
      style={{ width: size, height: size }}
      {...rest}
    >
      <AvatarImage src={iconUrl || ''} alt={chain.name} />
      <AvatarFallback className="bg-gradient-to-t from-muted-foreground/[0.20] to-muted-foreground/[0.05] font-mono text-sm" />
    </Avatar>
  )
}
