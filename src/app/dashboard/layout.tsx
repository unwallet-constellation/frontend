import { Metadata } from 'next'
import { ReactNode } from 'react'

import { SITE_METADATA } from '@/config/metadata'

export const metadata: Metadata = {
  title: `Dashboard | ${SITE_METADATA.title}`,
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return children
}
