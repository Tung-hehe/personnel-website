'use client'

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Twemoji } from '../common/Twemoji';
import { homeConfig, LocaleType } from '@/data/config';

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 40,
    backSpeed: 10,
    loop: true,
    backDelay: 1000,
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
    <div className="h-10">
      <ul id="bios" className="hidden">
        {
          homeConfig.bios.map(({text, emoji}, i) => (
            <li key={i}>
              {text[locale]}
              {emoji && <Twemoji emoji={emoji} size='md' className='ml-1.5'/>}
            </li>
          ))
        }
      </ul>
      <span ref={el} className="text-neutral-200" />
    </div>
  )
}
