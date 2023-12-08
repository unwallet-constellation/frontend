import Image from 'next/image'

import ShimmerButton from '@/components/magicui/shimmer-button'

import { DashboardButton } from './_components/dashboard-button'
import LatestDomainsMarquee from './_components/latest-domains-marquee'
import { SigninButton } from './_components/signin-button'
import phoneImg from '/public/phone.png'

export default function HomePage() {
  return (
    <>
      <main className="mt-10 flex grow flex-col items-center justify-center">
        <div className="flex grow flex-col items-center justify-center gap-10 hxl:gap-14">
          <div className="flex max-w-prose flex-col gap-2 text-center">
            <h2 className="text-4xl font-medium tracking-tight">
              <em>Next-Gen</em> Onboarding
            </h2>
            <p className="text-lg tracking-tight text-muted-foreground">
              Seedless smart wallets meet multichain domains
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex justify-center gap-3">
              {/* Start Setup */}
              <ShimmerButton
                href="/setup"
                className="h-14 shadow-2xl"
                shimmerColor="hsl(var(--brand))"
                shimmerSize="0.1em"
              >
                <span className="whitespace-pre-wrap px-1 text-center text-base font-medium leading-none tracking-tight text-brand dark:from-white dark:to-slate-900/10">
                  Get Unwalleted
                </span>
              </ShimmerButton>

              {/* Dashboar Button */}
              <DashboardButton />
            </div>

            {/* Sign-in */}
            <SigninButton className="text-sm font-medium text-muted-foreground hover:text-foreground" />
          </div>
        </div>

        {/* Phone Image with Features */}
        <div className="mt-10 grid grid-cols-2 items-center justify-center">
          <div className="-ml-12 h-[300px] overflow-hidden sm:h-[350px] md:h-[400px] hlg:!h-auto hlg:!overflow-auto">
            <Image
              src={phoneImg}
              alt="Unwallet App Screenshot"
              width={450}
              className="select-none"
              priority
            />
          </div>
          <ul className="mb-[20%] flex flex-col gap-2 whitespace-nowrap font-medium hlg:!mb-[60%]">
            <li>⛓️&nbsp;&nbsp;Multichain domains</li>
            <li>🔑&nbsp;&nbsp;No seedphrases</li>
            <li>📬&nbsp;&nbsp;No wallet address</li>
            <li>🧬&nbsp;&nbsp;Passkey signing</li>
            <li>👛&nbsp;&nbsp;Fee- and gas-less</li>
          </ul>
        </div>
      </main>
      {/* Marquee with latest domains */}
      <LatestDomainsMarquee />
    </>
  )
}
