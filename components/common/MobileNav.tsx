import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import Link from 'next/link'
import { Menu as MenuIcon } from "lucide-react";
import { headerNavLinks } from "@/data/config";


export function MobileNav() {

  return (
    <Menu>
      <MenuButton className="inline-flex items-center rounded p-1.5 hover:bg-gray-700 sm:hidden">
        <MenuIcon strokeWidth={1.5} size={20}/>
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="w-32 origin-top-right rounded-xl border border-white/5 bg-[#262c3b] p-1 sm:hidden"
      >
        {headerNavLinks.map(({href, label}) => (
          <MenuItem>
            <Link href={href} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
              {label}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
