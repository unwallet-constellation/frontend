import CreateWalletStep from './components/create-wallet'
import PickDomainStep from './components/pick-domain'
import { OnboardingStep } from './types'

export const onboardingSteps: OnboardingStep[] = [
  {
    id: '1',
    title: 'Pick Domain',
    shortTitle: 'Pick Domain',
    description: 'Get your favorite multichain domain name. Works fully gas- and fee-less.',
    component: PickDomainStep,
  },
  {
    id: '2',
    title: 'Create Wallet',
    shortTitle: 'Create Wallet',
    description: 'Smart Wallets are deployed on multiple L2s only using on-device biometrics.',
    component: CreateWalletStep,
  },
]
