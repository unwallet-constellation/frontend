import { simpleAccountFactoryAbi } from '@/wagmi.generated'
import { Hex, concat, encodeFunctionData } from 'viem'

export const generateInitCode = (factoryAddress: Hex, senderAddress: Hex) => {
  if (!factoryAddress || !senderAddress) throw new Error('Missing factory or sender address')
  return concat([
    factoryAddress,
    encodeFunctionData({
      abi: simpleAccountFactoryAbi,
      functionName: 'createAccount',
      args: [senderAddress, 0n],
    }),
  ])
}
