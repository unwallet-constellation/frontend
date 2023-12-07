import { atomWithStorage } from 'jotai/utils'
import { Hex } from 'viem'

export type TurnkeyAuthContext = {
  organizationId: string
  walletAddress: Hex
}
export const turnkeyAuthContextAtom = atomWithStorage<TurnkeyAuthContext | null>(
  'AUTH_CONTEXT',
  null,
)

export type DomainContext = {
  domain: string
  domainName: string
  domainTld: string
}
export const domainContextAtom = atomWithStorage<DomainContext | null>('DOMAIN_CONTEXT', null)
