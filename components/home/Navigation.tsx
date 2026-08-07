import Link from 'next/link';
import { FileText, Hammer, Gamepad2, Tags, CircleUserRound } from 'lucide-react';
import { homeConfig, LocaleType } from '@/data/config';
import { IconBadge, type IconMap } from '@/components/common/IconBadge';

const navIcons: IconMap = {
  'posts': { Icon: FileText, color: 'text-primary' },
  'projects': { Icon: Hammer, color: 'text-amber-400' },
  'games': { Icon: Gamepad2, color: 'text-emerald-400' },
  'tags': { Icon: Tags, color: 'text-pink-400' },
  'about': { Icon: CircleUserRound, color: 'text-violet-400' },
}

export function Navigation({ locale }: { locale: LocaleType }) {
  return (
    <>
      <div className="hidden flex-row flex-wrap gap-2 sm:flex">
        {
          homeConfig.navigation.map(({label, href, icon: iconKey}, i) => {
            const icon = navIcons[iconKey]
            return (
              <Link
                key={i}
                href={`/${locale}${href}`}
                className="
                  inline-flex items-center gap-1.5 rounded-full border border-gray-700
                  bg-primary-dark/30 px-3.5 py-1.5 text-sm font-medium text-gray-300
                  transition-colors hover:border-primary hover:bg-primary-dark
                "
              >
                <IconBadge icon={icon}/>
                <span>{label}</span>
              </Link>
            )
          })
        }
      </div>
      <div className="flex flex-col gap-2 sm:hidden">
        {
          homeConfig.mobileNavigation.map(({label, href, icon: iconKey}, i) => {
            const icon = navIcons[iconKey]
            return (
              <Link
                key={i}
                href={`/${locale}${href}`}
                className="
                  flex items-center gap-3 rounded-lg border border-gray-700 bg-primary-dark/20
                  px-3.5 py-2.5 text-sm text-gray-300
                  transition-colors hover:border-primary hover:bg-primary-dark
                "
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-dark">
                  <IconBadge icon={icon}/>
                </span>
                <span>{label[locale]}</span>
              </Link>
            )
          })
        }
      </div>
    </>
  )
}
