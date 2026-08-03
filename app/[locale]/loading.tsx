import { Loader2 } from 'lucide-react'

import { commonConfig } from '@/data/config'

export default function Loading() {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight: commonConfig.mainContentMinHeight }}
    >
      <Loader2 className="animate-spin text-primary" size={32} strokeWidth={2.5} />
    </div>
  )
}
