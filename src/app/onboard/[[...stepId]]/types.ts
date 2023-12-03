export interface OnboardingStepComponentProps {
  step: OnboardingStep
}

export type OnboardingStep = {
  id: string
  title: string
  shortTitle: string
  description: string
  component: React.FC<OnboardingStepComponentProps>
}
