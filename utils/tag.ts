import { Post } from 'contentlayer/generated'
import { LocaleType } from '@/data/config'

export function getTagsCount(posts: Post[], locale: LocaleType): Record<string, number> {
  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    if (post.tags && post.locale ===  locale) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    }
  })
  return tagCount
}
