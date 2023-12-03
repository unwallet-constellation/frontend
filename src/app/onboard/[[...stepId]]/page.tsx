import { onboardingSteps } from './config'

export default function OnboardingPage({
  params,
  searchParams,
}: {
  params: { stepId: [string] }
  searchParams: URLSearchParams
}) {
  const { stepId } = params
  const step = onboardingSteps.find((s) => s.id === stepId[0])
  if (!step) return null

  return <step.component {...{ step }} />
}
