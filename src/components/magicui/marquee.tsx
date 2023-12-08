import { Children, cloneElement } from 'react'

import { cn } from '@/utils/cn'

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children?: React.ReactNode
  vertical?: boolean
  [key: string]: any
}

export default function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex h-full w-full overflow-hidden [--magicui-duration:40s] [--magicui-gap:1rem]',
        className,
      )}
    >
      <div
        className={cn('flex h-max w-max transform-gpu items-stretch gap-[--magicui-gap] p-4', {
          '[animation-direction:reverse]': reverse,
          'hover:[animation-play-state:paused]': pauseOnHover,
          'animate-magicui-marquee-vertical flex-col': vertical,
          'animate-magicui-marquee flex-row': !vertical,
        })}
      >
        {Children.map(children, (child) => cloneElement(child as any))}
        {Children.map(children, (child) => cloneElement(child as any))}
        {Children.map(children, (child) => cloneElement(child as any))}
      </div>
    </div>
  )
}
