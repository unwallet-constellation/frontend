import { defineConfig } from '@wagmi/cli'
import { foundry } from '@wagmi/cli/plugins'

export default defineConfig({
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
  ],
})
