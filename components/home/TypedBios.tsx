'use client'

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { GraduationCap, Laptop, Lightbulb, BookOpen, Gamepad2 } from 'lucide-react';
import { homeConfig, LocaleType } from '@/data/config';
import { IconBadge, type IconMap } from '@/components/common/IconBadge';

const bioIcons: IconMap = {
  'education': { Icon: GraduationCap, color: 'text-primary' },
  'programming': { Icon: Laptop, color: 'text-emerald-400' },
  'curious': { Icon: Lightbulb, color: 'text-violet-400' },
  'reading': { Icon: BookOpen, color: 'text-pink-400' },
  'gaming': { Icon: Gamepad2, color: 'text-orange-400' },
}

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
    cursorChar: '▎',
  })
}

export function TypedBios({ locale }: { locale: LocaleType }) {
  let el = useRef<any>(null)
  let typed = useRef<any>(null)
  useEffect(() => {
    typed.current?.destroy()
    typed.current = createTypedInstance(el.current)
  }, [])

  return (
    <div className="my-4 h-8 font-mono text-lg text-amber-200">
      <ul id="bios" className="hidden">
        {
          homeConfig.bios.map(({text, icon: iconKey}, i) => {
            const icon = iconKey ? bioIcons[iconKey] : null
            return (
              <li key={i}>
                {text[locale]}
                <IconBadge icon={icon} size={18} className="ml-1.5 inline-block align-text-bottom"/>
              </li>
            )
          })
        }
      </ul>
      <span className="mr-2">&gt;</span>
      <span ref={el} />
    </div>
  )
}
