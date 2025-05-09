import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

import { kebabCase } from '@/utils/string'
import { getTagsCount } from "@/utils/tag"
import { Tag } from '@/components/blog/Tag'
import { LocaleType, tagsConfig } from '@/data/config'
import { generatePageSeo } from '@/utils/seo'


export const generateMetadata = () => {
  return generatePageSeo({ title: tagsConfig.title })
}

export default function Page({ params }: { params: { locale: LocaleType } }) {
  const tags = getTagsCount(allPosts, params.locale)
  const sortTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <div
      className="
        flex flex-col items-start justify-start
        divide-y divide-gray-700 md:mt-24 md:flex-row
        md:items-center md:justify-center md:space-x-6 md:divide-y-0
      "
    >
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h2
            className="
              text-3xl font-bold leading-9 tracking-tight
              text-gray-100 sm:text-4xl sm:leading-10
              md:border-r-2 md:px-6 md:text-6xl md:leading-14
            "
          >
            {tagsConfig.title}
          </h2>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {sortTags.map((tag) => {
            return (
              <div key={tag} className="mb-2 mr-5 mt-2">
                <Tag text={tag} locale={params.locale}/>
                <Link
                  href={`/${params.locale}/${kebabCase(tag)}`}
                  className="-ml-2 text-sm uppercase text-gray-300"
                >
                  ({tags[tag]})
                </Link>
              </div>
            )
          })}
        </div>
      </div>
  )
}
