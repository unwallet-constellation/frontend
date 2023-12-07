import { z } from 'zod'

export type TurnkeyCreateRequestSchema = z.infer<typeof turnkeyCreateRequestSchema>
export const turnkeyCreateRequestSchema = z.object({
  subOrgName: z.string().min(1),
  challenge: z.string().min(1),
  attestation: z.any(),
})

export type TurnkeyCreateResponseSchema = z.infer<typeof turnkeyCreateResponseSchema>
export const turnkeyCreateResponseSchema = z.object({
  organizationId: z.string(),
  walletAddress: z.string(),
})
