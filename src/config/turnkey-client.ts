import { TurnkeyClient } from '@turnkey/http'
import { WebauthnStamper } from '@turnkey/webauthn-stamper'

let passkeyHttpClient: TurnkeyClient

export const getTurnkeyHttpClient = (rpId: string) => {
  if (!passkeyHttpClient) {
    const stamper = new WebauthnStamper({ rpId })
    passkeyHttpClient = new TurnkeyClient({ baseUrl: 'https://api.turnkey.com' }, stamper)
  }

  return passkeyHttpClient
}
