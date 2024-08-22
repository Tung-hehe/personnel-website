import { allPosts } from "@/.contentlayer/generated"
import Link from 'next/link'

import { blogConfig, homeConfig } from "@/data/config"
import { dateSortDesc } from '@/utils/date'
import { ListPosts } from "../blog/ListPosts"


export function FeaturePost() {

  const featuredPosts = allPosts.sort(
    (a, b) => dateSortDesc(a.date, b.date)
  ).slice(0, homeConfig.featuredPosts)
  return (
    <div>
      <ListPosts posts={featuredPosts}/>
      <div className="flex justify-end font-medium">
        <Link
          href="/blog"
          className="text-primary hover:text-sky-400"
        >
          <span> {blogConfig.title} &rarr;</span>
        </Link>
      </div>
    </div>
  )
}
