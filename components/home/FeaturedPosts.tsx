import { allPosts } from "@/.contentlayer/generated"
import Link from 'next/link'

import { blogConfig, homeConfig, LocaleType } from "@/data/config"
import { dateSortDesc } from '@/utils/date'
import { ListPosts } from "../blog/ListPosts"


export function FeaturePost({ locale }: { locale: LocaleType }) {

  const featuredPosts = allPosts.filter(p => p.locale === locale).sort(
    (a, b) => dateSortDesc(a.date, b.date)
  ).slice(0, homeConfig.featuredPosts)
  return (
    <div>
      <ListPosts posts={featuredPosts} locale={locale}/>
      <div className="flex justify-end font-medium">
        <Link
          href={`/${locale}/blog`}
          className="text-primary hover:text-sky-400"
        >
          <span> {blogConfig.title[locale]} &rarr;</span>
        </Link>
      </div>
    </div>
  )
}
