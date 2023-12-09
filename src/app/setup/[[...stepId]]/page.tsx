import isEqual from 'lodash.isequal'

import { ONBOARDING_STEPS } from './config'
import { OnboardingStep } from './types'

export default function OnboardingPage({ params }: { params: { stepId: [string] } }) {
  const { stepId } = params
  const step: OnboardingStep | undefined = ONBOARDING_STEPS.find((s) => isEqual(stepId, [s.id]))
  if (!step) return null

  return <step.component {...{ step }} />
}
