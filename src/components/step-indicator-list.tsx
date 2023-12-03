import { HTMLAttributes } from 'react'

import { cn } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { AlertCircleIcon, CheckCircle2, CircleDot, Loader } from 'lucide-react'

const stepVariants = cva(
  'rounded-xs flex items-center gap-2 justify-between border bg-white px-2.5 py-2 text-sm font-medium [&_>_svg]:shrink-0',
  {
    variants: {
      state: {
        pending: 'opacity-60',
        current: '',
        loading: '',
        completed: '',
        error: '',
      },
    },
  },
)

interface StepIndicatorListProps extends HTMLAttributes<HTMLDivElement> {
  enumerate?: boolean
  steps: {
    title: string
    state: 'pending' | 'current' | 'loading' | 'completed' | 'error'
  }[]
}

export default function StepIndicatorList({
  enumerate,
  steps,
  className,
  ...rest
}: StepIndicatorListProps) {
  const icons = {
    current: <CircleDot size={16} className="text-muted-foreground/50" />,
    pending: null,
    loading: <Loader size={16} className="animate-spin text-muted-foreground/50" />,
    completed: <CheckCircle2 size={16} className="text-success" />,
    error: <AlertCircleIcon size={16} className="text-error" />,
  }

  return (
    <div className={cn('flex flex-col gap-2 rounded border bg-muted p-2', className)} {...rest}>
      {steps.map(({ title, state }, i) => (
        <div key={`step-indicator-${i}`} className={cn(stepVariants({ state }))}>
          <div>
            {enumerate && <>{i + 1}.&nbsp;</>}
            {title}
          </div>
          {icons[state]}
        </div>
      ))}
    </div>
  )
}
