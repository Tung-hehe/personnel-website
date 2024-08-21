import { commonConfig } from '@/data/config'


type PaginationType = {
  totalPages: number,
  currentPage: number,
  setCurrentPage: Function
}

export function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationType) {
  let hasPrevPage = currentPage - 1 > 0
  let hasNextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!hasPrevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!hasPrevPage}
          >
            { commonConfig.pagination.previous }
          </button>
        )}
        {hasPrevPage && (
          <button onClick={() => {setCurrentPage(currentPage - 1)}}>
            { commonConfig.pagination.previous }
          </button>
        )}
        <span>
          {currentPage} {commonConfig.pagination.of} {totalPages}
        </span>
        {!hasNextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!hasNextPage}
          >
            { commonConfig.pagination.next }
          </button>
        )}
        {hasNextPage && (
          <button onClick={() => {setCurrentPage(currentPage + 1)}}>
            { commonConfig.pagination.next }
          </button>
        )}
      </nav>
    </div>
  )
}
