import Image from 'next/image'
import { ComponentProps } from 'react'

import { Chain } from 'viem'
import * as chains from 'viem/chains'

interface ChainIconProps extends Omit<ComponentProps<typeof Image>, 'alt' | 'src'> {
  chain: Chain
}
export default function ChainIcon({ chain, ...rest }: ChainIconProps) {
  let iconSrc: string

  switch (chain.id) {
    case chains.avalanche.id:
    case chains.avalancheFuji.id:
      iconSrc = '/chain-icons/avax.jpg'
      break
    case chains.arbitrum.id:
    case chains.arbitrumGoerli.id:
    case chains.arbitrumNova.id:
    case chains.arbitrumSepolia.id:
      iconSrc = '/chain-icons/arbitrum.jpg'
      break
    case chains.polygonMumbai.id:
    case chains.polygon.id:
    case chains.polygonZkEvm.id:
    case chains.polygonZkEvmTestnet.id:
      iconSrc = '/chain-icons/polygon.png'
      break
    case chains.optimism.id:
    case chains.optimismGoerli.id:
    case chains.optimismSepolia.id:
      iconSrc = '/chain-icons/optimism.jpg'
      break
    case chains.base.id:
    case chains.baseGoerli.id:
    case chains.baseSepolia.id:
      iconSrc = '/chain-icons/base.jpg'
      break
    default:
      return null
  }

  return (
    <Image
      src={iconSrc}
      alt={chain.name}
      title={chain.name}
      width={24}
      height={24}
      className="rounded-full bg-muted"
      {...rest}
    />
  )
}
