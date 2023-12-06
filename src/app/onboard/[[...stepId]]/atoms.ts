import { atom } from 'jotai'
import { Hex, LocalAccount } from 'viem'

// export const passkeyAccountAtom = atomWithStorage<LocalAccount | null>('PASSKEY_ACCOUNT', null)
export const passkeyAccountAtom = atom<LocalAccount | null>(null)

export const smartWalletAddressesAtom = atom<Record<number, Hex>>({})
export const smartWalletDomainNameAtom = atom<string | null>(null)
