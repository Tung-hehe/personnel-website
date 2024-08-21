"use client"

import clsx from "clsx"
import Link from 'next/link'
import NextImage from 'next/image';
import { usePathname } from 'next/navigation'

import { headerNavLinks } from "@/data/config"
import { siteMetadata } from "@/data/siteMetadata"
import { MobileNav } from "./MobileNav";

export function Header() {
  let pathname = usePathname()
  return (
    <header className="sticky top-0 overflow-hidden py-5 backdrop-blur bg-dark/75">
      <div className=" flex items-center justify-between">
        <Link className="rounded-lg flex items-center text-xl" href="/">
          <NextImage src={siteMetadata.siteLogo} alt="Site logo" width={40} height={40} className="mr-3"/>
          {siteMetadata.siteName}
        </Link>
        <div className="flex items-center leading-5">
          <div className="hidden sm:block md:flex">
            {headerNavLinks.map(({href, label}) => {
              let isSelected = pathname === '/'
                ? href === pathname
                : pathname.startsWith(href) && href !== '/'
              return <Link
                key={label}
                href={href}
                className={clsx(
                  'mx-1 rounded px-3 py-3 font-medium text-gray-100 sm:px-3 sm:py-2',
                  isSelected ? 'bg-primary' : 'hover:bg-primary'
                )}
              >
                {label}
              </Link>
            })}
          </div>
          <MobileNav/>
        </div>
      </div>
    </header>
  )
}
