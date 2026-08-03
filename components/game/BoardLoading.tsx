import { Loader2 } from 'lucide-react'

export function BoardLoading() {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={28} strokeWidth={2.5} />
    </div>
  )
}
