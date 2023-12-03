import { z } from 'zod'

export const turnkeyCreateRequestSchema = z.object({
  subOrgName: z.string().min(1),
  challenge: z.string().min(1),
  attestation: z.any(),
})

export const turnkeyCreateResponseSchema = z.object({
  subOrgId: z.string(),
  walletId: z.string(),
  walletAddress: z.string(),
})
