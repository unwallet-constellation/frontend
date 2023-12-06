import { encodeFunctionData } from 'viem'

export const generateDummyCalldata = () => {
  const to = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' // vitalik
  const value = 0n
  const data = '0x'
  const callData = encodeFunctionData({
    abi: [
      {
        inputs: [
          { name: 'dest', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'func', type: 'bytes' },
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    args: [to, value, data],
  })
  return callData
}
