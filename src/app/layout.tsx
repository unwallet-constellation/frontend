import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import DotPattern from '@/components/magicui/dot-pattern'
import { env } from '@/config/environment'
import { siteMetdata } from '@/config/metadata'
import { cn } from '@/utils/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Provider as JotaiProvider } from 'jotai'
import { Toaster } from 'sonner'

import './globals.css'
import { Providers } from './providers'
import logoIconSvg from '/public/logo-icon.svg'

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
      <body>
        <main className="container flex grow flex-col items-center pt-14">
          {/* Logo & Name */}
          <Link href="/" className="mb-14 flex select-none items-center gap-2 outline-none">
            <Image src={logoIconSvg} alt="Unwallet Logo" height={35} priority />
            <h1 className="text-4xl font-bold leading-none tracking-tighter">Unwallet</h1>
          </Link>

          {/* Client Providers & Content */}
          <JotaiProvider>
            <Providers>{children}</Providers>
          </JotaiProvider>
        </main>

        {/* Background Pattern */}
        <DotPattern
          className={cn(
            '-z-10 fill-muted-foreground/50 [mask-image:radial-gradient(circle_at_top_center,white,transparent_75%)]',
          )}
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
