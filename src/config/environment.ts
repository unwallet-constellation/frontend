import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { getUrl } from './get-url'

export const env = createEnv({
  /*
   * Serverside environment variables
   */
  server: {
    TURNKEY_API_PUBLIC_KEY: z.string().min(1),
    TURNKEY_API_PRIVATE_KEY: z.string().min(1),

    OPENAI_API_KEY: z.string().min(1),
  },

  /*
   * Clientside environment variables.
   */
  client: {
    NEXT_PUBLIC_URL: z.preprocess((_) => getUrl(), z.string()),

    NEXT_PUBLIC_DEVELOPMENT_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),
    NEXT_PUBLIC_PREVIEW_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),
    NEXT_PUBLIC_PRODUCTION_MODE: z.preprocess((v) => v === 'true' || v === '1', z.boolean()),

    NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID: z.string().min(1),

    NEXT_PUBLIC_PIMLICO_API_KEY: z.string().min(1),

    NEXT_PUBLIC_INFURA_API_KEY: z.string().min(1),
    NEXT_PUBLIC_ANKR_API_KEY: z.string().min(1),

    NEXT_PUBLIC_THEGRAPH_GRAPHQL_API: z.string().url().min(1),
  },

  /*
   * NOTE: Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   */
  runtimeEnv: {
    TURNKEY_API_PUBLIC_KEY: process.env.TURNKEY_API_PUBLIC_KEY,
    TURNKEY_API_PRIVATE_KEY: process.env.TURNKEY_API_PRIVATE_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DEVELOPMENT_MODE: process.env.NEXT_PUBLIC_DEVELOPMENT_MODE,
    NEXT_PUBLIC_PREVIEW_MODE: process.env.NEXT_PUBLIC_PREVIEW_MODE,
    NEXT_PUBLIC_PRODUCTION_MODE: process.env.NEXT_PUBLIC_PRODUCTION_MODE,
    NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID,
    NEXT_PUBLIC_PIMLICO_API_KEY: process.env.NEXT_PUBLIC_PIMLICO_API_KEY,
    NEXT_PUBLIC_INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    NEXT_PUBLIC_ANKR_API_KEY: process.env.NEXT_PUBLIC_ANKR_API_KEY,
    NEXT_PUBLIC_THEGRAPH_GRAPHQL_API: process.env.NEXT_PUBLIC_THEGRAPH_GRAPHQL_API,
  },
})
