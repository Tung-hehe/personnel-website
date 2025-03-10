import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Link from 'next/link'
import { Menu as MenuIcon } from "lucide-react";
import { headerNavLinks, LocaleType } from "@/data/config";


export function MobileNav({locale}: {locale: LocaleType}) {

  return (
    <Menu>
      <MenuButton className="inline-flex items-center rounded p-1.5 hover:bg-gray-700 sm:hidden">
        <MenuIcon strokeWidth={2} size={25}/>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-32 z-10 origin-top-right rounded-xl border border-white/5 bg-primary-dark p-1 sm:hidden"
      >
        {headerNavLinks.map(({href, label}) => (
          <MenuItem key={label}>
            <Link
              href={`/${locale}${href}`}
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
            >
              {label}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
