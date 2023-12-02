import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/utils/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import logoIconSvg from 'public/logo-icon.svg'
import { Toaster } from 'sonner'

import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Unwallet',
  description: 'Next-Gen Web3 Onboarding',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
      <body>
        <main className="container flex grow flex-col items-center pt-14">
          {/* Logo & Name */}
          <Link href="/" className="mb-14 flex select-none items-center gap-2">
            <Image src={logoIconSvg} alt="Unwallet Logo" height={35} width={35} priority />
            <h1 className="text-4xl font-bold leading-none tracking-tighter">Unwallet</h1>
          </Link>

          {/* Client Providers & Content */}
          <Providers>{children}</Providers>
        </main>

        {/* Background Pattern */}
        <DotPattern
          className={cn(
            '-z-10 fill-muted-foreground/50 [mask-image:radial-gradient(circle_at_top_center,white,transparent_75%)]',
          )}
        />

        {/* Toast Config */}
        <Toaster toastOptions={{ classNames: { title: 'text-base' } }} />
      </body>
    </html>
  )
}
