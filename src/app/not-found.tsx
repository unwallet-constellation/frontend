import { Metadata } from 'next'

import { SITE_METADATA } from '@/config/metadata'

export const metadata: Metadata = {
  title: `Page not found | ${SITE_METADATA.title}`,
  robots: {
    follow: false,
    index: false,
  },
}

export default function NotFoundPage() {
  return (
    <div className="flex grow flex-col items-center justify-center pb-20">
      <div className="flex items-center gap-4">
        <p className="text-2xl font-medium">404</p>
        <div className="h-12 w-[1px] bg-foreground/20" />
        <h1 className="text-sm">This page could not be found.</h1>
      </div>
    </div>
  )
}
