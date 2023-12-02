import Image from 'next/image'
import Link from 'next/link'

import ShimmerButton from '@/components/magicui/shimmer-button'

import phoneImg from '/public/phone.png'

export default function Home() {
  return (
    <div className="mt-10 flex grow flex-col items-center justify-between gap-10 hlg:mt-20 hlg:gap-20">
      <div className="flex max-w-prose flex-col gap-2 text-center">
        <h2 className="text-4xl tracking-tight">
          <em>Next-Gen</em> Web3 Onboarding
        </h2>
        <p>Seedless smart wallets meet multichain domains.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <ShimmerButton
          href="/onboard"
          className="shadow-2xl"
          shimmerColor="hsl(var(--brand))"
          shimmerSize="0.1em"
        >
          <span className="whitespace-pre-wrap text-center text-lg font-medium leading-none tracking-tight text-brand dark:from-white dark:to-slate-900/10">
            Create your Unwallet
          </span>
        </ShimmerButton>
        <Link href="/onboard" className="text-xs text-foreground/60 hover:text-foreground">
          Use an existing one →
        </Link>
      </div>

      <div className="grid grid-cols-2 items-center justify-center">
        <div className="-ml-12 h-[300px] overflow-hidden sm:h-[350px] md:h-[400px] hlg:!h-auto hlg:!overflow-auto">
          <Image
            src={phoneImg}
            alt="Unwallet App Screenshot"
            width={450}
            className="select-none"
            priority
          />
        </div>
        <ul className="mb-[40%] flex flex-col gap-2 whitespace-nowrap font-medium md:mb-0 hlg:!mb-[40%]">
          <li>⛓️&nbsp;&nbsp;Multichain domains</li>
          <li>🔑&nbsp;&nbsp;No seedphrases</li>
          <li>🧬&nbsp;&nbsp;Passkey signing</li>
          <li>👛&nbsp;&nbsp;Fee- and gas-less</li>
        </ul>
      </div>
    </div>
  )
}
