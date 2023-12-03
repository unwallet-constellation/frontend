import { onboardingSteps } from './config'

export default function OnboardingPage({ params: { stepId } }: { params: { stepId: [string] } }) {
  const step = onboardingSteps.find((s) => s.id === stepId[0])
  if (!step) return null

  return <step.component />
}
