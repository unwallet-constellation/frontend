import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, foundry } from '@wagmi/cli/plugins'
import { mainnet, sepolia } from 'viem/chains'

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
            43113: '0xECeA700E2AD150B7857385Fe4Fde413bE595FE64',
          },
          FIFSRegistrarCCIP: {
            43113: '0xfF4Bb1b2EDc3a4D5Db1E04e744a84c7071E86F8F',
          },
          PublicResolverCCIP: {
            43113: '0x8690Ed8d16697F38B64aEFeEC120BC4547010ca2',
          },
          ReverseRegistrarCCIP: {
            43113: '0xd529Ca7D9506090546A5E67F8CdfACd7dF5d1df3',
          },
          xcENSRegistry: {
            80001: '0xa116EFd55BaF84803471Db9E267F26f707FF8eF8',
            11155420: '0x745f416b9c8883fdD8869e652b3Ea29dbD3ec7bc',
            84532: '0x2B332c1aF30a50E6901460Cd74149e2358105e5e',
          },
          xcReverseRegistrar: {
            80001: '0xB2B23667d15449043155344FFCDDB247e49D5F0c',
            84532: '0x4f1807F6a0321790E5d4a262f9127ce17797405A',
            11155420: '0x75Fc08b42bCBB59eE9b81d282C1Ab59a5471264f',
          },
          xcFIFSRegistrar: {
            84532: '0xe2F91CE5c578BC92a1c56633a27D260a8688F512',
            11155420: '0xdf0586C41617Db9886b54E36c649B0D2980F330c',
            80001: '0x2cDE4d09AFAd2299ae93Fee5777C8222eC90ba0b',
          },
          xcPublicResolver: {
            11155420: '0x0FD959Da5d59a3a651485647adaF2Bf893904716',
            84532: '0xABb8dc1c09dE4d47Ef50fe53d4c9D74A809f8212',
            80001: '0x942Dfc5F5f34875C9f8607152F7a3Ac3A08289b4',
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
