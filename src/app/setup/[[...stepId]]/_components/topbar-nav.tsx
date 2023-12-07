import Link from 'next/link'

import { cva } from 'class-variance-authority'

import { cn } from '@/utils/cn'

import { ONBOARDING_STEPS } from '../config'
import { OnboardingStep } from '../types'

const navItemVariants = cva('text-sm font-medium text-foreground/50 transition-all', {
  variants: {
    variant: {
      link: 'hover:text-foreground',
      current: 'text-foreground',
    },
  },
})
export const OnboardingLayoutTopbarNav = (currentStep: OnboardingStep) => {
  return (
    <nav className="flex items-center justify-center gap-4 border-b p-4 text-center">
      {ONBOARDING_STEPS.map((step) =>
        step.id < currentStep.id ? (
          <Link
            key={`step-nav-${step.id}`}
            href={`/setup/${step.id}`}
            className={cn(navItemVariants({ variant: 'link' }))}
          >
            {step.id}. {step.shortTitle}
          </Link>
        ) : (
          <div
            key={`step-nav-${step.id}`}
            className={cn(
              navItemVariants({
                variant: step.id === currentStep.id ? 'current' : undefined,
              }),
            )}
          >
            {step.id}. {step.shortTitle}
          </div>
        ),
      )}
    </nav>
  )
}
