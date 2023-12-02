import { PasskeyAuth } from './passkey-auth'

export default function Home() {
  return (
    <div className="flex grow flex-col items-center justify-center pb-20">
      <PasskeyAuth />
    </div>
  )
}
