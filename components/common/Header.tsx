"use client"

import clsx from "clsx"
import Link from 'next/link'
import NextImage from 'next/image';
import { usePathname } from 'next/navigation'

import { headerNavLinks } from "@/data/config"
import { siteMetadata } from "@/data/siteMetadata"
import { MobileNav } from "./MobileNav"
import { LocaleSwitch } from "./LocaleSwitch";
import { LocaleType } from "@/data/config"


export function Header({ locale } : { locale: LocaleType }) {
  let pathname = usePathname()
  return (
    <header className="sticky top-0 z-10 overflow-hidden py-5 backdrop-blur bg-background/75">
      <div className="flex items-center justify-between">
        <Link className="rounded-lg flex items-center text-xl" href={`/${locale}/`}>
          <NextImage src={siteMetadata.siteLogo} alt="Site logo" width={40} height={40} className="mr-3"/>
          {siteMetadata.siteName}
        </Link>
        <div className="flex items-center leading-5">
          <div className="hidden sm:block md:flex">
            {headerNavLinks.map(({href, label}) => {
              let rawPathname = pathname.split('/').filter(x => x !== locale).join('/');
              if (rawPathname === '') rawPathname = '/'
              let isSelected = rawPathname === '/'
                ? href === rawPathname
                : rawPathname.startsWith(href) && href !== '/'
              return <Link
                key={label}
                href={`/${locale}${href}`}
                className={clsx(
                  'mx-1 rounded px-3 py-3 font-medium text-gray-100 sm:px-3 sm:py-2',
                  isSelected ? 'bg-primary' : 'hover:bg-primary'
                )}
              >
                {label}
              </Link>
            })}
          </div>
          <LocaleSwitch locale={locale}/>
          <MobileNav locale={locale}/>
        </div>
      </div>
    </header>
  )
}
