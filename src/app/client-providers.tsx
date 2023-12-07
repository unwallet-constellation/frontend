'use client'

import * as React from 'react'

import { WagmiConfig } from 'wagmi'

import { wagmiConfig } from '../config/wagmi'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  // TODO
  // const [mounted, setMounted] = React.useState(false)
  // React.useEffect(() => setMounted(true), [])
  // return <WagmiConfig config={wagmiConfig}>{mounted && children}</WagmiConfig>

  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
