'use client'

import { Post } from 'contentlayer/generated'

import { PostCard } from '@/components/blog/PostCard'
import { blogConfig } from '@/data/config'


export function ListPosts({ posts }: { posts: Post[]}) {
  return (
    <ul className="space-y-14 py-12 min-h-[35rem]">
      {
        !posts.length
        ? blogConfig.noPost
        : posts.map((post, idx) => (
          <li key={post.slug}>
            <PostCard key={idx} {...post} />
          </li>
        ))
      }
    </ul>
  )
}
