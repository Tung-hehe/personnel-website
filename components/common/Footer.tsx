import { siteMetadata } from "@/data/siteMetadata"
import Link from "next/link"

export function Footer() {
  return (
    <footer>
      <div className="mb-8 mt-16 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
        <div className="my-2 flex space-x-2 text-sm text-gray-400">
          <div>{`Copyright © ${new Date().getFullYear()}`}</div>
          <span>{` • `}</span>
          <span>{siteMetadata.siteName}</span>
        </div>
        <Link href={'/privacy-policy'} className="my-2 flex space-x-2 text-sm text-primary">
          <span>Privacy policy</span>
        </Link>
      </div>
    </footer>
  )
}
