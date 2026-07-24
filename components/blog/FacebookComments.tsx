"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (node?: HTMLElement) => void }
    }
  }
}

export function FacebookComments({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.FB && ref.current) {
      window.FB.XFBML.parse(ref.current)
    }
  }, [url])

  if (!process.env.NEXT_PUBLIC_FB_APP_ID) return null

  return (
    <div ref={ref}>
      <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5" />
    </div>
  )
}
