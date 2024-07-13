import { UserOperation, getAccountNonce } from 'permissionless'
import { getUserOperationGasPrice } from 'permissionless/actions/pimlico'
import { PimlicoBundlerClient } from 'permissionless/clients/pimlico'
import { ENTRYPOINT_ADDRESS_V06_TYPE, EntryPoint } from 'permissionless/types'
import { Hex, PublicClient } from 'viem'

type PartialUserOperation = Omit<
  UserOperation<'v0.6'>,
  'callGasLimit' | 'preVerificationGas' | 'verificationGasLimit'
>

type BuildUserOperationParams = {
  sender: Hex
  entryPoint: EntryPoint
  initCode: Hex
  callData: Hex
  bundlerClient: PimlicoBundlerClient<ENTRYPOINT_ADDRESS_V06_TYPE>
  publicClient: PublicClient
} & Partial<PartialUserOperation>

export const buildUserOperation = async ({
  sender,
  entryPoint,
  initCode,
  callData,
  bundlerClient,
  publicClient,
  ...rest
}: BuildUserOperationParams) => {
  const gasPriceResult = await getUserOperationGasPrice(bundlerClient)
  const nonce = await getAccountNonce(publicClient, { entryPoint, sender })
  const userOperation: PartialUserOperation = {
    sender,
    nonce,
    initCode,
    callData,
    paymasterAndData: '0x',
    maxFeePerGas: gasPriceResult.fast.maxFeePerGas,
    maxPriorityFeePerGas: gasPriceResult.fast.maxPriorityFeePerGas,
    signature:
      '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
    ...rest,
  }
  return userOperation
}
