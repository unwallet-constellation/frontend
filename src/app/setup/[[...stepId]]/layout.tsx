import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { ReactNode } from 'react'

import isEqual from 'lodash.isequal'

import HomeFooter from '@/app/_components/home-footer'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SITE_METADATA } from '@/config/metadata'

import { OnboardingLayoutTopbarNav } from './_components/topbar-nav'
import { ONBOARDING_STEPS } from './config'
import { OnboardingStep } from './types'

export async function generateStaticParams() {
  return ONBOARDING_STEPS.map((step) => ({ stepId: [step.id] }))
}

export const metadata: Metadata = {
  title: `Setup | ${SITE_METADATA.title}`,
}

export default function OnboardingLayout({
  children,
  params: { stepId },
}: {
  children: ReactNode
  params: { stepId: string[] }
}) {
  if (!stepId?.length) return redirect('/setup/1')
  const step: OnboardingStep | undefined = ONBOARDING_STEPS.find((s) => isEqual(stepId, [s.id]))
  if (!step) return notFound()

  return (
    <>
      <main className="my-10 flex max-w-full grow flex-col items-center justify-center overflow-hidden">
        <Card className="flex min-h-[30rem] w-[29rem] max-w-full grow flex-col overflow-hidden md:grow-0">
          <OnboardingLayoutTopbarNav {...step} />

          <CardHeader>
            <CardTitle>{step.title}</CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>

          {/* Children */}
          {children}
        </Card>
      </main>

      <HomeFooter />
    </>
  )
}
