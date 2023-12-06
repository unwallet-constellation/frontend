import type { Metadata } from 'next'

import DotPattern from '@/components/magicui/dot-pattern'
import { env } from '@/config/environment'
import { siteMetdata } from '@/config/metadata'
import { cn } from '@/utils/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Provider as JotaiProvider } from 'jotai'
import { Toaster } from 'sonner'

import HomeLogo from './_components/home-logo'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: siteMetdata.title,
  description: siteMetdata.description,
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  robots: {
    follow: env.NEXT_PUBLIC_PRODUCTION_MODE,
    index: env.NEXT_PUBLIC_PRODUCTION_MODE,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#f4f5f5] pt-10">
        {/* Logo & Name */}
        <HomeLogo />

        {/* Client Providers & Content */}
        <JotaiProvider>
          <Providers>{children}</Providers>
        </JotaiProvider>

        {/* Background Pattern */}
        <DotPattern
          className={cn('[mask-image:radial-gradient(circle_at_top_center,white,transparent_75%)]')}
        />

        {/* Toast Config */}
        <Toaster
          expand
          richColors
          toastOptions={{ duration: 6000, classNames: { toast: '!text-sm' } }}
        />
      </body>
    </html>
  )
}
