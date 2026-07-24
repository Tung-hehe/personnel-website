"use client"

import { useEffect, useRef } from "react"
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

const COLORS = {
  inputBg: "#202940",
  border: "#333f5c",
  borderFocus: "#7aa2f7",
  text: "#e2e8f0",
  label: "#94a3b8",
  muted: "#64748b",
  primary: "#7aa2f7",
  onPrimary: "#111827",
}

function styleField(el: HTMLElement) {
  el.style.setProperty("background", COLORS.inputBg, "important")
  el.style.setProperty("border", `1px solid ${COLORS.border}`, "important")
  el.style.setProperty("border-radius", "8px", "important")
  el.style.setProperty("color", COLORS.text, "important")
  el.style.setProperty("padding", "10px 12px", "important")
  el.style.setProperty("outline", "none", "important")
  if (!el.dataset.cusdisWired) {
    el.dataset.cusdisWired = "1"
    el.addEventListener("focus", () => el.style.setProperty("border-color", COLORS.borderFocus, "important"))
    el.addEventListener("blur", () => el.style.setProperty("border-color", COLORS.border, "important"))
  }
}

function styleButton(el: HTMLElement) {
  el.style.setProperty("background", COLORS.primary, "important")
  el.style.setProperty("border", "none", "important")
  el.style.setProperty("color", COLORS.onPrimary, "important")
  el.style.setProperty("border-radius", "8px", "important")
  el.style.setProperty("padding", "8px 20px", "important")
  el.style.setProperty("font-weight", "700", "important")
  el.style.setProperty("cursor", "pointer", "important")
}

function styleLabel(el: HTMLElement) {
  el.style.setProperty("color", COLORS.label, "important")
}

function styleLink(el: HTMLElement) {
  el.style.setProperty("color", COLORS.primary, "important")
}

function applyTheme(root: ParentNode) {
  root.querySelectorAll("input, textarea").forEach((el) => styleField(el as HTMLElement))
  root.querySelectorAll("button").forEach((el) => styleButton(el as HTMLElement))
  root.querySelectorAll("label").forEach((el) => styleLabel(el as HTMLElement))
  root.querySelectorAll("a").forEach((el) => styleLink(el as HTMLElement))
}

export function Cusdis({ pageId, pageUrl, pageTitle }: CusdisProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wiredFrames = useRef(new WeakSet<HTMLIFrameElement>())

  useEffect(() => {
    if (window.renderNewComments) {
      window.renderNewComments()
    }
  }, [pageId])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wire = (iframe: HTMLIFrameElement) => {
      if (wiredFrames.current.has(iframe)) return
      wiredFrames.current.add(iframe)

      const setup = () => {
        try {
          const doc = iframe.contentDocument
          if (!doc || !doc.body) return
          applyTheme(doc)
          const bodyObserver = new MutationObserver(() => applyTheme(doc))
          bodyObserver.observe(doc.body, { childList: true, subtree: true })
        } catch {
          // cross-origin fallback: leave Cusdis default styles
        }
      }

      if (iframe.contentDocument?.readyState === "complete") setup()
      iframe.addEventListener("load", setup)
    }

    container.querySelectorAll("iframe").forEach((el) => wire(el as HTMLIFrameElement))

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement) wire(node)
          else if (node instanceof HTMLElement) {
            node.querySelectorAll?.("iframe").forEach((el) => wire(el as HTMLIFrameElement))
          }
        })
      }
    })
    observer.observe(container, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [pageId])

  if (!process.env.NEXT_PUBLIC_CUSDIS_APP_ID) return null

  return (
    <div ref={containerRef}>
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
    </div>
  )
}
