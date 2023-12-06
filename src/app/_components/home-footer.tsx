import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

export default function HomeFooter({ className }: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      className={cn(
        'mb-5 flex flex-col justify-center text-center text-xs text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      <a href="https://github.com/Unwallet-constellation" target="_blank">
        Hackathon Project for Chainlink Constellation 2023
      </a>
    </footer>
  )
}
