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
          PublicResolverCCIP: {
            43113: '0x7270EAEf588D9ba07738730560C0D5F3805d8443',
          },
          ReverseRegistrarCCIP: {
            43113: '0xeC3916F2dF9Dd9C7b6902181B3cE839A4902bbe2',
          },
          xcENSRegistry: {
            80001: '0xb352fDe2339b6ec999601EDaBcdCD54dD8BBC13c',
            84531: '0x4777D7187FCe971c4dd246e980c18838000a5862',
            420: '0x763DD80818778a44cB33EA256cc06D0b1ABe0532',
          },
          xcReverseRegistrar: {
            80001: '0xdBc45077c55b224AaB1a7364EE54ce66e9E287c4',
            84531: '0xFd6dA42841Abd5b1755ea42808D615163CE4F465',
            420: '0x06B6eA7A2ed9177e0AF3b18011984Fc90173B8eB',
          },
          xcFIFSRegistrar: {
            84531: '0x67e7a169B0888BFCCaD9025065e049C6d6108509',
            80001: '0x9b7fcAb5479C437a2fCC02AFEe1213bf81182cD1',
            420: '0x3E00CEd29Cb6e7Eb675d955c7072Df9702E09391',
          },
          xcPublicResolver: {
            420: '0xAcee74eC2FBB2C01Ee8226a2b1C297E6f66d091d',
            84531: '0x7186eC2858072330C288702F9ebbE0C9f6871B82',
            80001: '0x9558D6b01333e207209fD8cbDBb704eD067e3355',
          },
          FIFSRegistrarCCIP: {
            43113: '0x49A76Fc34f68e7EA6AdC6689CB1088dF4bbD484D',
          },
          ENSRegistryCCIP: {
            43113: '0x122e08b42A4302B5665B56b89Ee34D6F2Ca5321e',
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
