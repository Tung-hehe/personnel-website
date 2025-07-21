import { commonConfig } from '@/data/config'


type PaginationType = {
  totalPages: number,
  currentPage: number,
  setCurrentPage: Function
}

export function Pagination({ totalPages, currentPage, setCurrentPage }: PaginationType) {
  let hasPrevPage = currentPage - 1 > 0
  let hasNextPage = currentPage + 1 <= totalPages
  let renderNumber = Array.from({length: totalPages}, (e, i)=> i + 1)

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {
          hasPrevPage
          ? <button className="hover:text-sky-300" onClick={() => {setCurrentPage(currentPage - 1)}}>
            { commonConfig.pagination.previous }
          </button>
          : <span className="text-gray-400">
            { commonConfig.pagination.previous }
          </span>
        }
        <div>
          {renderNumber.map(n => {
            return (
              n != currentPage
              ? <button key={n} className="hover:text-sky-300 ml-3" onClick={() => {setCurrentPage(n)}}>
                { n }
              </button>
              : <span key={n} className="text-sky-300 ml-3">
                { n }
              </span>
            )
          })}
        </div>
        {
          hasNextPage
          ? <button className="hover:text-sky-300" onClick={() => {setCurrentPage(currentPage + 1)}}>
            { commonConfig.pagination.next }
          </button>
          : <span className="text-gray-400">
            { commonConfig.pagination.next }
          </span>
        }
      </nav>
    </div>
  )
}
