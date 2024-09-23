'use client'

import { Post } from 'contentlayer/generated'

import { PostCard } from '@/components/blog/PostCard'
import { blogConfig, LocaleType } from '@/data/config'


export function ListPosts({ posts, locale }: { posts: Post[], locale: LocaleType}) {
  return (
    <ul className="space-y-14 py-12 min-h-[35rem]">
      {
        !posts.length
        ? blogConfig.noPost[locale]
        : posts.map((post, idx) => (
          <li key={post.slug}>
            <PostCard key={idx} post={post} locale={locale} />
          </li>
        ))
      }
    </ul>
  )
}
