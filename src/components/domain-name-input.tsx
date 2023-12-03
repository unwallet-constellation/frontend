import * as React from 'react'

import { cn } from '@/utils/cn'
import { cva } from 'class-variance-authority'
import { CheckCircle2, Loader, XCircle } from 'lucide-react'

const inputWrapperVariants = cva(
  'flex h-10 w-full rounded-md items-center gap-2 border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
)

export interface DomainNameInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: string
  state?: 'valid' | 'invalid' | 'loading'
}

const DomainNameInput = React.forwardRef<HTMLInputElement, DomainNameInputProps>(
  ({ className, type, suffix, state, ...props }, ref) => {
    return (
      <div className={cn(inputWrapperVariants({ className }))}>
        <input
          className="h-full grow border-none bg-transparent px-3 py-2 font-mono outline-none"
          type={type}
          ref={ref}
          spellCheck="false"
          translate="no"
          data-1p-ignore
          {...props}
        />

        {/* States */}
        {state === 'loading' && <Loader className="animate-spin opacity-50" size={20} />}
        {state === 'valid' && <CheckCircle2 className="text-green-500" size={20} />}
        {state === 'invalid' && <XCircle className="text-orange-500" size={20} />}

        {/* Suffix */}
        {!!suffix && (
          <div className="whitespace-nowrap border-l px-3 py-2 font-mono text-sm">{suffix}</div>
        )}
      </div>
    )
  },
)
DomainNameInput.displayName = 'DomainNameInput'

export { DomainNameInput, inputWrapperVariants }
