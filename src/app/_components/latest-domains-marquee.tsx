'use client'

import { FC } from 'react'

import { publicResolverCcipABI, publicResolverCcipAddress } from '@/wagmi.generated'
import { ByteArray, Hex, labelhash, namehash, stringToBytes } from 'viem'
import { avalancheFuji } from 'viem/chains'
import { useContractRead } from 'wagmi'

import { IndexedDomain, useLatestDomains } from '../_hooks/use-latest-domains'

export default function LatestDomainsMarquee() {
  const { data } = useLatestDomains()
  if (!data) return null

  return (
    <div className="flex flex-col gap-5">
      {data.newOwners.map((domain) => (
        <LatestDomain key={`latest-domain-${domain.label}`} {...domain} />
      ))}
    </div>
  )
}

// TODO
interface LatestDomainProps extends IndexedDomain {}
const LatestDomain: FC<LatestDomainProps> = ({ timestamp, label, node, owner }) => {
  const contractRead = useContractRead({
    chainId: avalancheFuji.id,
    address: publicResolverCcipAddress[avalancheFuji.id],
    abi: publicResolverCcipABI,
    functionName: 'name',
    // args: [toHex(packetToBytes(`${owner.toLowerCase().substring(2)}.addr.reverse`))],
    // args: [namehash(owner + '.addr.reverse')],
    // args: [namehash(owner.toLowerCase().substring(2))],
    args: [namehash(owner.substring(2))],
  })

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">timestamp: {timestamp}</span>
      <span className="text-xs font-medium text-muted-foreground">label: {label}</span>
      <span className="text-xs font-medium text-muted-foreground">node: {node}</span>
      <span className="text-xs font-medium text-muted-foreground">owner: {owner}</span>
      <span className="text-xs font-medium text-muted-foreground">domain: {contractRead.data}</span>
    </div>
  )
}

export function packetToBytes(packet: string): ByteArray {
  // strip leading and trailing `.`
  const value = packet.replace(/^\.|\.$/gm, '')
  if (value.length === 0) return new Uint8Array(1)

  const bytes = new Uint8Array(stringToBytes(value).byteLength + 2)

  let offset = 0
  const list = value.split('.')
  for (let i = 0; i < list.length; i++) {
    let encoded = stringToBytes(list[i])
    // if the length is > 255, make the encoded label value a labelhash
    // this is compatible with the universal resolver
    if (encoded.byteLength > 255) encoded = stringToBytes(encodeLabelhash(labelhash(list[i])))
    bytes[offset] = encoded.length
    bytes.set(encoded, offset + 1)
    offset += encoded.length + 1
  }

  if (bytes.byteLength !== offset + 1) return bytes.slice(0, offset + 1)

  return bytes
}

export function encodeLabelhash(hash: Hex): `[${string}]` {
  return `[${hash.slice(2)}]`
}
