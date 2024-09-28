'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Twemoji } from '@/components/common/Twemoji'
import { LocaleType, notFoundConfig } from '@/data/config'

export default function NotFound() {
  const locale = useParams()?.locale as LocaleType
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div>
        <Image src={'/404.png'} alt="404" width={500} height={500} />
      </div>
      <div className="space-x-2 pt-8 md:space-y-5">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            {notFoundConfig.text1[locale]} <Twemoji emoji={'face-with-monocle'} />
          </p>
          <p className="mb-6">{notFoundConfig.text2[locale]}</p>
          <Link href={`/${locale}`}>
            <button
              className="
                rounded-lg border border-transparent bg-blue-700 px-4
                py-2 font-medium text-white hover:bg-blue-500
              "
            >
              {notFoundConfig.backToHomePage[locale]}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
