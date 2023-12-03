import { atomWithStorage } from 'jotai/utils'
import { LocalAccount } from 'viem'

export const passkeyAccountAtom = atomWithStorage<LocalAccount | null>('PASSKEY_ACCOUNT', null)
