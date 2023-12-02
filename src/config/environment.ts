import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside environment variables
   */
  server: {
    TURNKEY_API_PUBLIC_KEY: z.string().min(1),
    TURNKEY_API_PRIVATE_KEY: z.string().min(1),
  },

  /*
   * Clientside environment variables.
   */
  client: {
    NEXT_PUBLIC_DEVELOPMENT_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),
    NEXT_PUBLIC_PREVIEW_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),
    NEXT_PUBLIC_PRODUCTION_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),

    NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID: z.string().min(1),

    NEXT_PUBLIC_PIMLICO_API_KEY: z.string().min(1),

    NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1),
  },

  /*
   * NOTE: Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   */
  runtimeEnv: {
    NEXT_PUBLIC_DEVELOPMENT_MODE: process.env.NEXT_PUBLIC_DEVELOPMENT_MODE,
    NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,
    NEXT_PUBLIC_PRODUCTION_MODE: process.env.NEXT_PUBLIC_PRODUCTION_MODE,

    NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID,
    TURNKEY_API_PUBLIC_KEY: process.env.TURNKEY_API_PUBLIC_KEY,
    TURNKEY_API_PRIVATE_KEY: process.env.TURNKEY_API_PRIVATE_KEY,

    NEXT_PUBLIC_PIMLICO_API_KEY: process.env.NEXT_PUBLIC_PIMLICO_API_KEY,

    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  },
})
