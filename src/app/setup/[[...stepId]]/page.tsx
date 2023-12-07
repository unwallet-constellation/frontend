import { ONBOARDING_STEPS } from './config'

export default function OnboardingPage({ params }: { params: { stepId: [string] } }) {
  const { stepId } = params
  const step = ONBOARDING_STEPS.find((s) => s.id === stepId[0])
  if (!step) return null

  return <step.component {...{ step }} />
}
