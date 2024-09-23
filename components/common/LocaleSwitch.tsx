import clsx from "clsx"
import { usePathname } from 'next/navigation'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Link from 'next/link'
import { Languages } from "lucide-react";
import { locales, localeNames, LocaleType } from "@/data/config";


export function LocaleSwitch({ locale } : { locale: LocaleType }) {
  const pathname = usePathname()
  const handleLocaleChange = (newLocale: LocaleType): string => {
    const segments = pathname!.split('/')
    const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleType))
    if (localeIndex !== -1) {
      segments[localeIndex] = newLocale
    } else {
      segments.splice(1, 0, newLocale)
    }
    const newPath = segments.join('/').replace(/\/$/, '')
    return newPath
  }

  return (
    <Menu>
      <MenuButton className="inline-flex items-center rounded p-1.5 hover:bg-gray-700">
        <Languages strokeWidth={2} size={25}/>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-28 z-10 origin-top-right rounded-lg border border-white/5 bg-primary-dark p-1"
      >
        {localeNames.map(({short, full}) => (
          <MenuItem key={short}>
            <Link
              href={handleLocaleChange(short)}
              className={clsx(
                'group flex w-full items-center gap-2 rounded-lg py-1.5 px-2 data-[focus]:bg-white/10',
                short === locale ? 'text-sky-400' : ''
              )}
            >
              {full}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
