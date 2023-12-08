import Link from 'next/link'
import { ComponentProps } from 'react'

import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { ArrowUpRight, Fingerprint } from 'lucide-react'

import { cn } from '@/utils/cn'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button, buttonVariants } from './ui/button'

interface PasskeyDialogOverlayProps
  extends Pick<ComponentProps<typeof AlertDialog>, 'open' | 'onOpenChange'> {
  variant?: 'create' | 'sign'
  domain?: string
  allowCancel?: boolean
}
export function PasskeyDialogOverlay({
  variant = 'sign',
  domain,
  allowCancel = false,
  ...rest
}: PasskeyDialogOverlayProps) {
  return (
    <AlertDialog {...rest}>
      <AlertDialogContent className="w-[25rem] max-w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-baseline gap-2">
              <span>
                {variant === 'create' ? 'Create a new Passkey' : 'Sign with your Passkey'}
              </span>
              <div className="flex animate-pulse items-center justify-center rounded-full bg-foreground/10 p-1.5">
                <Fingerprint size={14} className="text-foreground" />
              </div>
            </div>
          </AlertDialogTitle>

          <AlertDialogDescription>
            {variant === 'create' ? (
              'Your browser or password manager should prompt you to create a new Passkey.'
            ) : !!domain ? (
              <>
                Make sure you use the same Passkey you used to register your domain:{' '}
                <span className="font-medium text-foreground">{domain}</span>.
              </>
            ) : (
              'You should be prompted to sign with your Passkey.'
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Link
            href="https://support.apple.com/en-my/guide/iphone/iphf538ea8d0/ios"
            target="_blank"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            Learn more <ArrowUpRight size={16} className="ml-2" />
          </Link>

          {allowCancel && (
            <AlertDialogCancel asChild>
              <Button type="button">Cancel</Button>
            </AlertDialogCancel>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
