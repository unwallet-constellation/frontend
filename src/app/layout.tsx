import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Provider as JotaiProvider } from 'jotai'
import { Toaster } from 'sonner'

import DotPattern from '@/components/magicui/dot-pattern'
import { TooltipProvider } from '@/components/ui/tooltip'
import { env } from '@/config/environment'
import { SITE_METADATA } from '@/config/metadata'
import { cn } from '@/utils/cn'

import HomeLogo from './_components/home-logo'
import { ClientProviders } from './client-providers'
import './globals.css'

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  robots: {
    follow: env.NEXT_PUBLIC_PRODUCTION_MODE,
    index: env.NEXT_PUBLIC_PRODUCTION_MODE,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="relative flex min-h-screen flex-col items-center justify-center px-2 pt-10">
        {/* Logo & Name */}
        <HomeLogo />

        {/* Providers & Content */}
        <JotaiProvider>
          <TooltipProvider delayDuration={0}>
            <ClientProviders>{children}</ClientProviders>
          </TooltipProvider>
        </JotaiProvider>

        {/* Background Pattern */}
        <DotPattern
          className={cn('[mask-image:radial-gradient(circle_at_top_center,white,transparent_75%)]')}
        />

        {/* Toast Config */}
        <Toaster
          richColors
          theme="dark"
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  )
}
