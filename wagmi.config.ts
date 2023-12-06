import { defineConfig, loadEnv } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig(() => {
  const env = loadEnv({ envDir: process.cwd() })

  return {
    out: 'src/wagmi.generated.ts',
    contracts: [],
    plugins: [
      foundry({
        project: '../cross-chain-ens',
        deployments: {
          // Hub Deployment
          ENSRegistryCCIP: {
            43113: '0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A',
          },
          FIFSRegistrarCCIP: {
            43113: '0x7133Db45b6806f8a40075EbF4F87678dcC4Ce22d',
          },
          PublicResolverCCIP: {
            43113: '0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9',
          },
          ReverseRegistrarCCIP: {
            43113: '0x3D937DaB0bEC0e68c9E8064394423B57a1f5F047',
          },
          // Spoke Deployment(s)
          xcENSRegistry: {
            80001: '0x4E1AFDd1A705aE0598d75abFc37Fa948d9CFcBc5',
            420: '0x65057a6821CC4B4bF848e40789629ebF8879bbce',
          },
          xcReverseRegistrar: {
            80001: '0xB8c9599B68D5B2115d3096Aeb04Bc63882D4Bf9A',
            420: '0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8',
          },
          xcFIFSRegistrar: {
            80001: '0x76Da719F8CBDe8c87A3BEF2b42C5936d91b9bDfa',
            420: '0x261c205DD3E6039919b99FF1CD7CC30956Da41f9',
          },
          xcPublicResolver: {
            420: '0xc07Ac5CD919D84be107790A99C104D46dD43193D',
            80001: '0x64409B2A63125BA894f8bb14cadc4cABAbB8c118',
          },
        },
        include: [
          // Hub Contracts
          'ENSRegistryCCIP.sol/*.json',
          'FIFSRegistrarCCIP.sol/*.json',
          'PublicResolverCCIP.sol/*.json',
          'ReverseRegistrarCCIP.sol/*.json',
          // Spoke Contracts
          'xcENSRegistry.sol/*.json',
          'xcReverseRegistrar.sol/*.json',
          'xcFIFSRegistrar.sol/*.json',
          'xcPublicResolver.sol/*.json',
        ],
      }),
      // etherscan({
      //   apiKey: env.ETHERSCAN_API_KEY,
      //   chainId: 1,
      //   contracts: [
      //     {
      //       name: 'ENSRegistry',
      //       address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
      //     },
      //   ],
      // }),
    ],
  }
})
