import { atom } from 'jotai'
import { Hex, LocalAccount, zeroAddress } from 'viem'
import { avalancheFuji } from 'viem/chains'

// export const passkeyAccountAtom = atomWithStorage<LocalAccount | null>('PASSKEY_ACCOUNT', null)
export const passkeyAccountAtom = atom<LocalAccount | null>(null)

export const smartWalletAddressesAtom = atom<Record<number, Hex>>({
  [avalancheFuji.id]: zeroAddress,
}) // TODO
export const smartWalletDomainNameAtom = atom<string | null>('dennis') // TODO
