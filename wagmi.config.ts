import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, foundry } from '@wagmi/cli/plugins'
import { mainnet, sepolia } from 'wagmi'

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
            43113: '0x26c3B74EF154805F678376cC7e082622D313f4CF',
          },
          FIFSRegistrarCCIP: {
            43113: '0x745f416b9c8883fdD8869e652b3Ea29dbD3ec7bc',
          },
          PublicResolverCCIP: {
            43113: '0xf425867c6E64cf5bD2f9CaA9918A21E8073E7995',
          },
          ReverseRegistrarCCIP: {
            43113: '0xdf0586C41617Db9886b54E36c649B0D2980F330c',
          },
          xcENSRegistry: {
            80001: '0x8bb2985caaEf7a336086eeFe3FbD699dfF81d18A',
            84531: '0x65057a6821CC4B4bF848e40789629ebF8879bbce',
            420: '0xa3712828a74A413E9538d5eBd6B1eB50446f8287',
          },
          xcReverseRegistrar: {
            80001: '0xA556A8Fa8d8311F9B39ad9C68EDB63aD906406C4',
            84531: '0x7a36B02ec9Ba1A5399b9e35921D463eE15c67BC8',
            420: '0xAd0d86B82C9A4f0616f77C45638838b5615E6dB3',
          },
          xcFIFSRegistrar: {
            84531: '0x261c205DD3E6039919b99FF1CD7CC30956Da41f9',
            80001: '0x72a99edfFa6c3502A4EfCf4Bac109A38421295F5',
            420: '0x33C1ce1718227A19a630bca81bf3C04570eCaDd3',
          },
          xcPublicResolver: {
            420: '0x9821c860F75b8f166cE68A70cbfc6C01d133CB8C',
            84531: '0xc07Ac5CD919D84be107790A99C104D46dD43193D',
            80001: '0xbeD73164a7dA3b2E58d0A38a485984E648Ae2da9',
          },
        },
      }),
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: sepolia.id,
        contracts: [
          // ERC-4337
          {
            name: 'SimpleAccountFactory',
            address: '0x9406Cc6185a346906296840746125a0E44976454',
          },
          {
            name: 'SimpleAccount',
            address: '0x8ABB13360b87Be5EEb1B98647A016adD927a136c',
          },
          {
            name: 'EntryPoint',
            address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
          },
        ],
      }),
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: mainnet.id,
        contracts: [
          // Chainlink Price Feed
          {
            name: 'EACAggregatorProxy',
            address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
          },
        ],
      }),
    ],
  }
})
