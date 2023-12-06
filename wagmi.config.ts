import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, foundry } from '@wagmi/cli/plugins'
import { sepolia } from 'wagmi'

export default defineConfig(() => {
  const env = loadEnv({ envDir: process.cwd() })

  return {
    out: 'src/wagmi.generated.ts',
    contracts: [],
    plugins: [
      foundry({
        project: '../cross-chain-ens',
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
        deployments: {
          ENSRegistryCCIP: {
            43113: '0x9356415294517E52cc72c1C6447A80D6d441F958',
          },
          FIFSRegistrarCCIP: {
            43113: '0xaF8d25851d511C50109A1d12fB8279d470540d90',
          },
          PublicResolverCCIP: {
            43113: '0x4882e217b7609D43b3b5F47adAD715a11212B81A',
          },
          ReverseRegistrarCCIP: {
            43113: '0x497188dC028a1622117Ba536C15B920791045fBf',
          },
          xcENSRegistry: {
            80001: '0xaf029Af571136800afC6fbc0fC0bEa08f9763e8e',
            420: '0xFd3db71f5f67334c208448Fb690D10dDB5F84Ddd',
          },
          xcReverseRegistrar: {
            80001: '0x42BEf2E3e9F0D1e2B578D5c427E08C13C3b4181e',
            420: '0xEc89e1e25F2dBdbF4793c32584571aEeD2491753',
          },
          xcFIFSRegistrar: {
            80001: '0x31C57B41f42D343713A47aAa7164E58eb9B6F8C9',
            420: '0x1AfdfDE694c33d7CFF8806879116905a128a80DD',
          },
          xcPublicResolver: {
            420: '0xE3233929a0613FD998877978b8A0e0DbbD97C014',
            80001: '0xFFd70bc3899DE376cE483CDd28Fa782f639c1b38',
          },
        },
      }),
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: sepolia.id,
        contracts: [
          {
            name: 'SimpleAccountFactory',
            address: '0x9406Cc6185a346906296840746125a0E44976454',
          },
          {
            name: 'SimpleAccount',
            address: '0x8ABB13360b87Be5EEb1B98647A016adD927a136c',
          },
          // {
          //   name: 'EntryPoint',
          //   address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
          // },
        ],
      }),
    ],
  }
})
