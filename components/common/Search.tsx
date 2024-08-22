import { Search as SearchIcon } from 'lucide-react'
import { commonConfig } from '@/data/config'
import { toLatin } from '@/utils/string';

export function Search({ onChange }: { onChange: (value: string) => void }) {
  return (
    <div className="relative max-w-lg">
      <input
        aria-label="search"
        type="text"
        onChange={(e) => onChange(toLatin(e.target.value).toLowerCase())}
        placeholder={commonConfig.search}
        className="
          block w-full rounded-md border border-gray-900
          bg-gray-800 px-4 py-2 text-gray-100 focus:border-sky-500
          focus:ring-sky-500 focus:outline-none
          placeholder-gray-500
        "
      />
      <button>
        <SearchIcon
          strokeWidth={2}
          size={20}
          className="absolute right-3 top-3 h-5 w-5 text-gray-300"
        />
      </button>
    </div>
  )
}
