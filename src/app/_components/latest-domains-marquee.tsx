'use client'

import { FC, HTMLAttributes } from 'react'

import { publicResolverCcipAbi, publicResolverCcipAddress } from '@/wagmi.generated'
import Marquee from 'react-fast-marquee'
import { namehash } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useReadContract } from 'wagmi'

import { cn } from '@/utils/cn'

import { IndexedNewOwner, useLatestOwners } from '../_hooks/use-latest-owners'

interface LatestDomainsMarqueeProps extends HTMLAttributes<HTMLDivElement> {}
export default function LatestDomainsMarquee({ className, ...rest }: LatestDomainsMarqueeProps) {
  const { data } = useLatestOwners()
  if (!data) return null

  return (
    <Marquee
      pauseOnHover={true}
      speed={80}
      className={cn(
        'absolute top-auto -mt-10 !w-[calc(100%_+_2rem)] bg-brand py-2.5 font-mono text-sm',
        className,
      )}
      {...rest}
    >
      <span className="opacity-70">Last registered domains</span>
      {data.latestOwners.map((owner, i) => (
        <LatestDomain
          key={`latest-domain-${owner.hashedDomain}`}
          isLast={i === data.latestOwners.length - 1}
          {...owner}
        />
      ))}
      <span className="mr-3 opacity-70">Powered by The Graph</span>
    </Marquee>
  )
}

interface LatestDomainProps extends IndexedNewOwner {
  isLast?: boolean
}
const LatestDomain: FC<LatestDomainProps> = ({ timestamp, owner, isLast }) => {
  const query = useReadContract({
    chainId: avalancheFuji.id,
    address: publicResolverCcipAddress[avalancheFuji.id],
    abi: publicResolverCcipAbi,
    functionName: 'name',
    args: [namehash(owner.toLowerCase().substring(2) + '.addr.reverse')],
  })

  if (!query.data) return null

  return (
    <div className="whitespace-nowrap font-semibold text-foreground">
      <span className="mx-3">⊕</span>
      <span>{query.data}</span>
      {isLast && <span className="mx-3">⊕</span>}
    </div>
  )
}
