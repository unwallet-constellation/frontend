import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <>
      <div className="mb-8 flex grow items-center justify-center">
        <Loader size={32} className="animate-spin text-muted-foreground/50 ease-in-out" />
      </div>
    </>
  )
}
