import { z } from 'zod'

export const reqSchema = z.object({
  subOrgName: z.string().min(1),
  challenge: z.string().min(1),
  attestation: z.any(),
})

export const resSchema = z.object({
  subOrgId: z.string(),
  walletId: z.string(),
  walletAddress: z.string(),
})
