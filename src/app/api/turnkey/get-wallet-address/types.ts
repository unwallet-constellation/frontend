import { z } from 'zod'

export type TurnkeyGetWalletAddressRequestSchema = z.infer<
  typeof turnkeyGetWalletAddressRequestSchema
>
export const turnkeyGetWalletAddressRequestSchema = z.object({
  organizationId: z.string().min(1),
})

export type TurnkeyGetWalletAddressResponseSchema = z.infer<
  typeof turnkeyGetWalletAddressResponseSchema
>
export const turnkeyGetWalletAddressResponseSchema = z.object({
  walletId: z.string(),
  walletName: z.string(),
  walletAddress: z.string(),
})
