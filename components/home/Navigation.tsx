import Link from 'next/link';
import { Twemoji } from '../common/Twemoji';
import { homeConfig } from '@/data/config';

export function Navigation() {
  return (
    <>
      <div className="flex flex-row divide-gray-500 divide-x hidden sm:block">
        {
          homeConfig.navigation.map(({label, href, emoji}, i) => (

            <Link key={i} href={href} className={i !== 0 ? 'pl-3 ml-3': ''}>
              <Twemoji emoji={emoji}/>
              <span className="ml-2 hover:underline">
                {label}
              </span>
            </Link>
          ))
        }
      </div>
      <div className="flex flex-col sm:hidden space-y-1.5">
      {
        homeConfig.mobileNavigation.map(({label, href, emoji}, i) => (
          <Link key={i} href={href}>
            <Twemoji emoji={emoji}/>
            <span className="ml-2 underline">
              {label}
            </span>
          </Link>
        ))
      }
    </div>
    </>
  )
}