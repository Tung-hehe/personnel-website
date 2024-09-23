import Image from 'next/image'
import Link from 'next/link'
import { Twemoji } from '@/components/common/Twemoji'
import { LocaleType, notFoundConfig } from '@/data/config'

export default function NotFoundCatchAll({ params }: { params: { locale: LocaleType } }) {
  return (
    <div className="flex flex-col items-center justify-center pt-8">
      <div>
        <Image src={'/404.png'} alt="404" width={500} height={500} />
      </div>
      <div className="space-x-2 pt-8 md:space-y-5">
        <div className="max-w-md text-center">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            {notFoundConfig.text1[params.locale]} <Twemoji emoji={'face-with-monocle'} />
          </p>
          <p className="mb-6">{notFoundConfig.text2[params.locale]}</p>
          <Link href={`/${params.locale}`}>
            <button
              className="
                rounded-lg border border-transparent bg-blue-700 px-4
                py-2 font-medium text-white hover:bg-blue-500
              "
            >
              {notFoundConfig.backToHomePage[params.locale]}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
