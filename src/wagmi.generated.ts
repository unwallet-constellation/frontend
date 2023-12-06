//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ENSRegistryCCIP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A)
 */
export const ensRegistryCcipABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_router', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct Client.Any2EVMMessage',
        type: 'tuple',
        components: [
          { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
          { name: 'sender', internalType: 'bytes', type: 'bytes' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          {
            name: 'destTokenAmounts',
            internalType: 'struct Client.EVMTokenAmount[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'ccipReceive',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '_sourceChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'isCCIPWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'recordExists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'resolver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
      { name: 'ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setRecord',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'label', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'setSubnodeOwner',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'label', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
      { name: 'ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setSubnodeRecord',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setTTL',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ttl',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'label', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'resolver', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewResolver',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'ttl', internalType: 'uint64', type: 'uint64', indexed: false },
    ],
    name: 'NewTTL',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [{ name: 'router', internalType: 'address', type: 'address' }],
    name: 'InvalidRouter',
  },
] as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A)
 */
export const ensRegistryCcipAddress = {
  43113: '0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A',
} as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A)
 */
export const ensRegistryCcipConfig = {
  address: ensRegistryCcipAddress,
  abi: ensRegistryCcipABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIFSRegistrarCCIP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x7133Db45b6806f8a40075EbF4F87678dcC4Ce22d)
 */
export const fifsRegistrarCcipABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'ensAddr', internalType: 'contract ENS', type: 'address' },
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_router', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct Client.Any2EVMMessage',
        type: 'tuple',
        components: [
          { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
          { name: 'sender', internalType: 'bytes', type: 'bytes' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          {
            name: 'destTokenAmounts',
            internalType: 'struct Client.EVMTokenAmount[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'ccipReceive',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'isCCIPWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'label', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    type: 'error',
    inputs: [{ name: 'router', internalType: 'address', type: 'address' }],
    name: 'InvalidRouter',
  },
] as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x7133Db45b6806f8a40075EbF4F87678dcC4Ce22d)
 */
export const fifsRegistrarCcipAddress = {
  43113: '0x7133Db45b6806f8a40075EbF4F87678dcC4Ce22d',
} as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x7133Db45b6806f8a40075EbF4F87678dcC4Ce22d)
 */
export const fifsRegistrarCcipConfig = {
  address: fifsRegistrarCcipAddress,
  abi: fifsRegistrarCcipABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PublicResolverCCIP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9)
 */
export const publicResolverCcipABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'coinType', internalType: 'uint256', type: 'uint256' },
      { name: 'ensAddr', internalType: 'contract ENS', type: 'address' },
      { name: 'trustedController', internalType: 'address', type: 'address' },
      { name: 'trustedReverseRegistrar', internalType: 'address', type: 'address' },
      { name: 'router', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'addr',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'coinType', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addr',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'delegate', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct Client.Any2EVMMessage',
        type: 'tuple',
        components: [
          { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
          { name: 'sender', internalType: 'bytes', type: 'bytes' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          {
            name: 'destTokenAmounts',
            internalType: 'struct Client.EVMTokenAmount[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'ccipReceive',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'clearRecords',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'interfaceImplementer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'delegate', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedFor',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'isCCIPWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'nodehash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'multicallWithNodeCheck',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'recordVersions',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'coinType', internalType: 'uint256', type: 'uint256' },
      { name: 'a', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setAddr',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'a', internalType: 'address', type: 'address' },
    ],
    name: 'setAddr',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' },
      { name: 'implementer', internalType: 'address', type: 'address' },
    ],
    name: 'setInterface',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'newName', internalType: 'string', type: 'string' },
    ],
    name: 'setName',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'a', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AddrChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'coinType', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newAddress', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'AddressChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: false },
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'delegate', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: true },
    ],
    name: 'Approved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'interfaceID', internalType: 'bytes4', type: 'bytes4', indexed: true },
      { name: 'implementer', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'InterfaceChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'NameChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'newVersion', internalType: 'uint64', type: 'uint64', indexed: false },
    ],
    name: 'VersionChanged',
  },
  {
    type: 'error',
    inputs: [{ name: 'router', internalType: 'address', type: 'address' }],
    name: 'InvalidRouter',
  },
] as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9)
 */
export const publicResolverCcipAddress = {
  43113: '0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9',
} as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9)
 */
export const publicResolverCcipConfig = {
  address: publicResolverCcipAddress,
  abi: publicResolverCcipABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReverseRegistrarCCIP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x3D937DaB0bEC0e68c9E8064394423B57a1f5F047)
 */
export const reverseRegistrarCcipABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'ensAddr', internalType: 'contract ENS', type: 'address' },
      { name: '_router', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'message',
        internalType: 'struct Client.Any2EVMMessage',
        type: 'tuple',
        components: [
          { name: 'messageId', internalType: 'bytes32', type: 'bytes32' },
          { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
          { name: 'sender', internalType: 'bytes', type: 'bytes' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          {
            name: 'destTokenAmounts',
            internalType: 'struct Client.EVMTokenAmount[]',
            type: 'tuple[]',
            components: [
              { name: 'token', internalType: 'address', type: 'address' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
        ],
      },
    ],
    name: 'ccipReceive',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'claim',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimWithResolver',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'controllers',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'defaultResolver',
    outputs: [{ name: '', internalType: 'contract NameResolver', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'ens',
    outputs: [{ name: '', internalType: 'contract ENS', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getRouter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'sourceChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: 'sender', internalType: 'address', type: 'address' },
    ],
    name: 'isCCIPWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'node',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'controller', internalType: 'address', type: 'address' },
      { name: 'enabled', internalType: 'bool', type: 'bool' },
    ],
    name: 'setController',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'resolver', internalType: 'address', type: 'address' }],
    name: 'setDefaultResolver',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'setName',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
    ],
    name: 'setNameForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'controller', internalType: 'address', type: 'address', indexed: true },
      { name: 'enabled', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ControllerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'resolver', internalType: 'contract NameResolver', type: 'address', indexed: true },
    ],
    name: 'DefaultResolverChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address', indexed: true },
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'ReverseClaimed',
  },
  {
    type: 'error',
    inputs: [{ name: 'router', internalType: 'address', type: 'address' }],
    name: 'InvalidRouter',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x3D937DaB0bEC0e68c9E8064394423B57a1f5F047)
 */
export const reverseRegistrarCcipAddress = {
  43113: '0x3D937DaB0bEC0e68c9E8064394423B57a1f5F047',
} as const

/**
 * [__View Contract on Avalanche Fuji Snow Trace__](https://testnet.snowtrace.io/address/0x3D937DaB0bEC0e68c9E8064394423B57a1f5F047)
 */
export const reverseRegistrarCcipConfig = {
  address: reverseRegistrarCcipAddress,
  abi: reverseRegistrarCcipABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// xcENSRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x65057a6821CC4B4bF848e40789629ebF8879bbce)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4E1AFDd1A705aE0598d75abFc37Fa948d9CFcBc5)
 */
export const xcEnsRegistryABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_destinationChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: '_receiverAddress', internalType: 'address', type: 'address' },
      { name: '_feeToken', internalType: 'address', type: 'address' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'receiverAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'recordExists',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'resolver',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouterClient', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_operator', internalType: 'address', type: 'address' },
      { name: '_approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_resolver', internalType: 'address', type: 'address' },
      { name: '_ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setRecord',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_resolver', internalType: 'address', type: 'address' },
    ],
    name: 'setResolver',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_label', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'setSubnodeOwner',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_label', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_resolver', internalType: 'address', type: 'address' },
      { name: '_ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setSubnodeRecord',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_node', internalType: 'bytes32', type: 'bytes32' },
      { name: '_ttl', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'setTTL',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ttl',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'messageId', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'destinationChainSelector', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'message',
        internalType: 'struct CCIPSenderBase.CCIPPayload',
        type: 'tuple',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'func', internalType: 'bytes4', type: 'bytes4' },
          { name: 'params', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      { name: 'fees', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MessageSent',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'label', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'resolver', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'NewResolver',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'ttl', internalType: 'uint64', type: 'uint64', indexed: false },
    ],
    name: 'NewTTL',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'Transfer',
  },
] as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x65057a6821CC4B4bF848e40789629ebF8879bbce)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4E1AFDd1A705aE0598d75abFc37Fa948d9CFcBc5)
 */
export const xcEnsRegistryAddress = {
  420: '0x65057a6821CC4B4bF848e40789629ebF8879bbce',
  80001: '0x4E1AFDd1A705aE0598d75abFc37Fa948d9CFcBc5',
} as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x65057a6821CC4B4bF848e40789629ebF8879bbce)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x4E1AFDd1A705aE0598d75abFc37Fa948d9CFcBc5)
 */
export const xcEnsRegistryConfig = { address: xcEnsRegistryAddress, abi: xcEnsRegistryABI } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// xcFIFSRegistrar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x261c205DD3E6039919b99FF1CD7CC30956Da41f9)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x76Da719F8CBDe8c87A3BEF2b42C5936d91b9bDfa)
 */
export const xcFifsRegistrarABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_destinationChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: '_receiverAddress', internalType: 'address', type: 'address' },
      { name: '_feeToken', internalType: 'address', type: 'address' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'receiverAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_label', internalType: 'bytes32', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
    ],
    name: 'register',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouterClient', type: 'address' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'messageId', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'destinationChainSelector', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'message',
        internalType: 'struct CCIPSenderBase.CCIPPayload',
        type: 'tuple',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'func', internalType: 'bytes4', type: 'bytes4' },
          { name: 'params', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      { name: 'fees', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MessageSent',
  },
] as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x261c205DD3E6039919b99FF1CD7CC30956Da41f9)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x76Da719F8CBDe8c87A3BEF2b42C5936d91b9bDfa)
 */
export const xcFifsRegistrarAddress = {
  420: '0x261c205DD3E6039919b99FF1CD7CC30956Da41f9',
  80001: '0x76Da719F8CBDe8c87A3BEF2b42C5936d91b9bDfa',
} as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x261c205DD3E6039919b99FF1CD7CC30956Da41f9)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x76Da719F8CBDe8c87A3BEF2b42C5936d91b9bDfa)
 */
export const xcFifsRegistrarConfig = {
  address: xcFifsRegistrarAddress,
  abi: xcFifsRegistrarABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// xcPublicResolver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xc07Ac5CD919D84be107790A99C104D46dD43193D)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x64409B2A63125BA894f8bb14cadc4cABAbB8c118)
 */
export const xcPublicResolverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'coinType', internalType: 'uint256', type: 'uint256' },
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_destinationChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: '_receiverAddress', internalType: 'address', type: 'address' },
      { name: '_feeToken', internalType: 'address', type: 'address' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'delegate', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'node', internalType: 'bytes32', type: 'bytes32' }],
    name: 'clearRecords',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'receiverAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouterClient', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'coinType', internalType: 'uint256', type: 'uint256' },
      { name: 'a', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'setAddr',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'a', internalType: 'address', type: 'address' },
    ],
    name: 'setAddr',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' },
      { name: 'implementer', internalType: 'address', type: 'address' },
    ],
    name: 'setInterface',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'node', internalType: 'bytes32', type: 'bytes32' },
      { name: 'newName', internalType: 'string', type: 'string' },
    ],
    name: 'setName',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'messageId', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'destinationChainSelector', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'message',
        internalType: 'struct CCIPSenderBase.CCIPPayload',
        type: 'tuple',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'func', internalType: 'bytes4', type: 'bytes4' },
          { name: 'params', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      { name: 'fees', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MessageSent',
  },
] as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xc07Ac5CD919D84be107790A99C104D46dD43193D)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x64409B2A63125BA894f8bb14cadc4cABAbB8c118)
 */
export const xcPublicResolverAddress = {
  420: '0xc07Ac5CD919D84be107790A99C104D46dD43193D',
  80001: '0x64409B2A63125BA894f8bb14cadc4cABAbB8c118',
} as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0xc07Ac5CD919D84be107790A99C104D46dD43193D)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0x64409B2A63125BA894f8bb14cadc4cABAbB8c118)
 */
export const xcPublicResolverConfig = {
  address: xcPublicResolverAddress,
  abi: xcPublicResolverABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// xcReverseRegistrar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB8c9599B68D5B2115d3096Aeb04Bc63882D4Bf9A)
 */
export const xcReverseRegistrarABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_router', internalType: 'address', type: 'address' },
      { name: '_destinationChainSelector', internalType: 'uint64', type: 'uint64' },
      { name: '_receiverAddress', internalType: 'address', type: 'address' },
      { name: '_feeToken', internalType: 'address', type: 'address' },
    ],
  },
  { stateMutability: 'payable', type: 'receive' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'claim',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
    ],
    name: 'claimWithResolver',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'feeToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'node',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'receiverAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'router',
    outputs: [{ name: '', internalType: 'contract IRouterClient', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'resolver', internalType: 'address', type: 'address' }],
    name: 'setDefaultResolver',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    name: 'setName',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'resolver', internalType: 'address', type: 'address' },
      { name: 'name', internalType: 'string', type: 'string' },
    ],
    name: 'setNameForAddr',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'messageId', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'destinationChainSelector', internalType: 'uint64', type: 'uint64', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'message',
        internalType: 'struct CCIPSenderBase.CCIPPayload',
        type: 'tuple',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'func', internalType: 'bytes4', type: 'bytes4' },
          { name: 'params', internalType: 'bytes', type: 'bytes' },
        ],
        indexed: false,
      },
      { name: 'fees', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'MessageSent',
  },
] as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB8c9599B68D5B2115d3096Aeb04Bc63882D4Bf9A)
 */
export const xcReverseRegistrarAddress = {
  420: '0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8',
  80001: '0xB8c9599B68D5B2115d3096Aeb04Bc63882D4Bf9A',
} as const

/**
 * - [__View Contract on Optimism Goerli Etherscan__](https://goerli-optimism.etherscan.io/address/0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8)
 * - [__View Contract on Polygon Mumbai Polygon Scan__](https://mumbai.polygonscan.com/address/0xB8c9599B68D5B2115d3096Aeb04Bc63882D4Bf9A)
 */
export const xcReverseRegistrarConfig = {
  address: xcReverseRegistrarAddress,
  abi: xcReverseRegistrarABI,
} as const
