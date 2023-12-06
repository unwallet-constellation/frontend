import { UserOperation, getUserOperationHash } from 'permissionless'
import { Chain, Hex, LocalAccount } from 'viem'

export const signUserOperationWithPasskey = async ({
  passkeyAccount,
  userOperation,
  entryPoint,
  chain,
}: {
  passkeyAccount: LocalAccount
  userOperation: UserOperation
  entryPoint: Hex
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
