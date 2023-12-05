import Link from 'next/link'
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties } from 'react'

import { cn } from '@/utils/cn'

type ButtonOrAnchorProps = Partial<AnchorHTMLAttributes<HTMLAnchorElement>> &
  Partial<ButtonHTMLAttributes<HTMLButtonElement>>

export interface ShimmerButtonProps extends ButtonOrAnchorProps {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
  className?: string
  children?: React.ReactNode
}

const ShimmerButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = '#ffffff',
      shimmerSize = '0.05em',
      shimmerDuration = '2.5s',
      borderRadius = '100px',
      background = 'rgba(0, 0, 0, 1)',
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Wrapper = props.href ? Link : 'button'

    return (
      <Wrapper
        style={
          {
            '--magicui-spread': '90deg',
            '--magicui-shimmer-color': shimmerColor,
            '--magicui-radius': borderRadius,
            '--magicui-speed': shimmerDuration,
            '--magicui-cut': shimmerSize,
            '--magicui-bg': background,
          } as CSSProperties
        }
        className={cn(
          'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--magicui-bg)] [border-radius:var(--magicui-radius)] dark:text-black',
          'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]',
          className,
        )}
        ref={ref as any}
        {...(props as any)}
      >
        {/* spark container */}
        <div
          className={cn(
            '-z-30 blur-[2px]',
            'absolute inset-0 overflow-visible [container-type:size]',
          )}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-magicui-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* spark before */}
            <div className="absolute inset-[-100%] w-auto rotate-0 animate-magicui-spin [background:conic-gradient(from_calc(270deg-(var(--magicui-spread)*0.5)),transparent_0,var(--magicui-shimmer-color)_var(--magicui-spread),transparent_var(--magicui-spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            'insert-0 absolute h-full w-full',

            'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',

            // transition
            'transform-gpu transition-all duration-300 ease-in-out',

            // on hover
            'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',

            // on click
            'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]',
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            'absolute -z-20 [background:var(--magicui-bg)] [border-radius:var(--magicui-radius)] [inset:var(--magicui-cut)]',
          )}
        />
      </Wrapper>
    )
  },
)

ShimmerButton.displayName = 'ShimmerButton'

export default ShimmerButton
