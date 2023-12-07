import Image from 'next/image'
import Link from 'next/link'
import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/cn'

import logoIconSvg from '/public/logo-icon.svg'

export default function HomeLogo({ className }: HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <nav className={cn('flex justify-center', className)}>
      <Link href="/" className="flex select-none items-center gap-2 outline-none">
        <Image src={logoIconSvg} alt="Unwallet Logo" height={35} priority />
        <h1 className="text-4xl font-bold leading-none tracking-tighter text-gray-900">Unwallet</h1>
      </Link>
    </nav>
  )
}
