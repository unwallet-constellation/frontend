import { UserOperation, getUserOperationHash } from 'permissionless'
import { EntryPoint } from 'permissionless/types'
import { Chain, LocalAccount } from 'viem'

export const signUserOperationWithPasskey = async ({
  passkeyAccount,
  userOperation,
  entryPoint,
  chain,
}: {
  passkeyAccount: LocalAccount
  userOperation: UserOperation<'v0.6'>
  entryPoint: EntryPoint
  chain: Chain
}) => {
  const userOperationHash = getUserOperationHash({
    userOperation,
    chainId: chain.id,
    entryPoint,
  })
  const signature = await passkeyAccount.signMessage({
    message: {
      raw: userOperationHash,
    },
  })
  return signature
}
