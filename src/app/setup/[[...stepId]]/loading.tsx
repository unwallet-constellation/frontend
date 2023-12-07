import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <>
      <div className="mb-4 flex grow items-center justify-center">
        <Loader size={32} className="text-muted" />
      </div>
    </>
  )
}
