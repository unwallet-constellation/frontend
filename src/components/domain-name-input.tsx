import * as React from 'react'

import { cva } from 'class-variance-authority'
import { AlertCircle, CheckCircle2, Loader } from 'lucide-react'

import { cn } from '@/utils/cn'

const inputWrapperVariants = cva(
  'flex h-10 w-full items-center gap-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
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
          className="h-full w-0 flex-1 border-none bg-transparent px-3 py-2 font-mono outline-none"
          type={type}
          ref={ref}
          spellCheck="false"
          translate="no"
          data-1p-ignore
          {...props}
        />

        {/* States */}
        {state === 'loading' && <Loader className="animate-spin text-muted-foreground" size={16} />}
        {state === 'valid' && <CheckCircle2 className="text-foreground" size={16} />}
        {state === 'invalid' && <AlertCircle className="text-orange-500" size={16} />}

        {/* Suffix */}
        {!!suffix && (
          <div className="shrink-0 whitespace-nowrap border-l px-3 py-2 font-mono text-sm">
            {suffix}
          </div>
        )}
      </div>
    )
  },
)
DomainNameInput.displayName = 'DomainNameInput'

export { DomainNameInput, inputWrapperVariants }
