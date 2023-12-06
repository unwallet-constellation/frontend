import { notFound, redirect } from 'next/navigation'
import { ReactNode } from 'react'

import HomeFooter from '@/app/_components/home-footer'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import isEqual from 'lodash.isequal'

import { onboardingSteps } from './config'
import { OnboardingStep } from './types'

export async function generateStaticParams() {
  return onboardingSteps.map((step) => ({ stepId: [step.id] }))
}

export default function OnboardingLayout({
  children,
  params: { stepId },
}: {
  children: ReactNode
  params: { stepId: string[] }
}) {
  if (!stepId?.length) return redirect('/setup/1')
  const step: OnboardingStep | undefined = onboardingSteps.find((s) => isEqual(stepId, [s.id]))
  if (!step) return notFound()

  return (
    <>
      <main className="my-10 flex max-w-full grow flex-col items-center justify-center overflow-hidden px-2 lg:my-20">
        <Card className="flex min-h-[30rem] w-[30rem] max-w-full flex-col overflow-hidden">
          <div className="flex items-center justify-center gap-4 border-b p-4 text-center">
            {onboardingSteps.map((s) => (
              <div
                key={`step-nav-${s.id}`}
                className={cn(
                  'text-sm font-medium',
                  s.id === step.id ? 'text-foreground' : 'text-foreground/40',
                )}
              >
                {s.id}. {s.shortTitle}
              </div>
            ))}
          </div>

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
