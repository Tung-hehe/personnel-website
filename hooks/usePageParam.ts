'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Keeps the current page number in sync with the `?page=` URL query param,
 * so pagination is bookmarkable/shareable and works with browser back/forward.
 */
export function usePageParam(totalPages: number): [number, (page: number) => void] {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const requestedPage = Number(searchParams.get('page')) || 1
  const currentPage = Math.min(Math.max(1, requestedPage), Math.max(1, totalPages))

  function setCurrentPage(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return [currentPage, setCurrentPage]
}
