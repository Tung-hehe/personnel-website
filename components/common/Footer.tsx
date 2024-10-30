import Link from 'next/link'
import { repositoryName } from "@/data/config"
import { siteMetadata } from "@/data/siteMetadata"

export function Footer() {
  return (
    <footer>
      <div className="mb-8 mt-16 items-center justify-end space-y-4 md:mb-10 md:flex md:space-y-0">
        <div className="my-2 flex space-x-2 text-sm text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>{siteMetadata.siteName}</span>
          <span>{` • `}</span>
          <Link href={`https://github.com/${repositoryName}`} className='underline hover:text-sky-400'>Github Repository</Link>
        </div>
      </div>
    </footer>
  )
}
