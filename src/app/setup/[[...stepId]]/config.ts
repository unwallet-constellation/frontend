import CreateUnwalletStep from './_components/create-unwallet'
import PickDomainStep from './_components/select-domain'
import { OnboardingStep } from './types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Select Domain',
    shortTitle: 'Select Domain',
    description: 'Find your favorite multichain domain name.',
    component: PickDomainStep,
  },
  {
    id: '2',
    title: 'Create Unwallet',
    shortTitle: 'Create Unwallet',
    description: 'Deploying smart wallet only using on-device biometrics.',
    component: CreateUnwalletStep,
  },
]
