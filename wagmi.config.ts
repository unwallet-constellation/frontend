import { defineConfig, loadEnv } from '@wagmi/cli'
import { etherscan, foundry } from '@wagmi/cli/plugins'

export default defineConfig(() => {
  const env = loadEnv({ envDir: process.cwd() })

  return {
    out: 'src/wagmi.generated.ts',
    contracts: [],
    plugins: [
      foundry({
        project: '../cross-chain-ens',
        deployments: {
          // TODO: Add deployments here
          // Counter: {
          //   1: '0x314159265dd8dbb310642f98f50c066173c1259b',
          //   5: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          // },
        },
        include: [
          // the following patterns are included by default
          'FIFSRegistrar.sol/*.json',
          'FIFSRegistrarCCIP.sol/*.json',
          'PublicResolver.sol/*.json',
          'PublicResolverCCIP.sol/*.json',
        ],
      }),
      // TODO Remove when own contracts are ready & deployed
      etherscan({
        apiKey: env.ETHERSCAN_API_KEY,
        chainId: 1,
        contracts: [
          {
            name: 'ENSRegistry',
            address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
          },
          // {
          //   name: 'ENSPublicResolver',
          //   address: '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41',
          // },
        ],
      }),
    ],
  }
})
