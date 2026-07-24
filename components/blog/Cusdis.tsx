"use client"

import { useEffect } from "react"
import Script from "next/script"

declare global {
  interface Window {
    renderNewComments?: () => void
  }
}

type CusdisProps = {
  pageId: string
  pageUrl: string
  pageTitle: string
}

export function Cusdis({ pageId, pageUrl, pageTitle }: CusdisProps) {
  useEffect(() => {
    if (window.renderNewComments) {
      window.renderNewComments()
    }
  }, [pageId])

  if (!process.env.NEXT_PUBLIC_CUSDIS_APP_ID) return null

  return (
    <>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id={process.env.NEXT_PUBLIC_CUSDIS_APP_ID}
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
        data-theme="dark"
      />
      <Script
        id="cusdis-script"
        src="https://cusdis.com/js/cusdis.es.js"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  )
}
