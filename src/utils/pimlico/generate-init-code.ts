import { simpleAccountFactoryABI } from '@/wagmi.generated'
import { Hex, concat, encodeFunctionData } from 'viem'

export const generateInitCode = (factoryAddress: Hex, senderAddress: Hex) => {
  return concat([
    factoryAddress,
    encodeFunctionData({
      abi: simpleAccountFactoryABI,
      functionName: 'createAccount',
      args: [senderAddress, 0n],
    }),
  ])
}
