import { allPosts } from "@/.contentlayer/generated"
import Link from 'next/link'

import { blogConfig, homeConfig, LocaleType } from "@/data/config"
import { pinnedPostSlugs } from "@/data/pinnedPosts"
import { sortPosts } from '@/utils/date'
import { ListPosts } from "../blog/ListPosts"


export function FeaturePost({ locale }: { locale: LocaleType }) {

  const localePosts = allPosts.filter(p => p.locale === locale)
  // Giữ đúng thứ tự khai báo trong data/pinnedPosts.ts thay vì sắp theo ngày.
  const pinnedPosts = pinnedPostSlugs
    .map(slug => localePosts.find(p => p.slug === slug))
    .filter((post): post is typeof localePosts[number] => post !== undefined)
  // Chưa ghim bài nào thì tạm hiện các bài mới nhất, để mục này không bị trống.
  const featuredPosts = (
    pinnedPosts.length > 0 ? pinnedPosts : localePosts.sort(sortPosts)
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
