import { Twemoji } from '@/components/common/Twemoji'

import { blogConfig, LocaleType } from '@/data/config'
import { formatDate } from '@/utils/date'

type BlogInformationProps = {
  date: string
  readingTime: number,
  words: number,
  locale: LocaleType
}

export function BlogInformation({
  date, readingTime, words, locale
}: BlogInformationProps) {
  return (
    <div className="flex flex-wrap text-sm font-medium leading-6 text-gray-400 md:text-base">
      <time dateTime={date} className="flex items-center justify-center">
        <Twemoji emoji="calendar" size="" />
        <span className="ml-1.5 md:ml-2">{formatDate(date, locale)}</span>
      </time>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="hourglass-not-done" size="" />
        <span className="ml-1.5 md:ml-2">
          {`${Math.ceil(readingTime)} ${blogConfig.readingTime[locale]}`}
        </span>
      </div>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        <Twemoji emoji="notebook" size=""/>
        <span className="ml-1.5 md:ml-2">
          {`${Math.ceil(words)} ${blogConfig.words[locale]}`}
        </span>
      </div>
    </div>
  )
}
