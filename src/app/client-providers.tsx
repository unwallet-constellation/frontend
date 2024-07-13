'use client'

import * as React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

import { wagmiConfig } from '../config/wagmi'

interface ClientProvidersProps extends React.PropsWithChildren {
  initialState?: State | undefined
}
export function ClientProviders({ initialState, children }: ClientProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState} reconnectOnMount={true}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
