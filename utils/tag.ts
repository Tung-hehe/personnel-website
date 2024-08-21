import { Post } from 'contentlayer/generated'
import { kebabCase } from './string'

export function getTagsCount(posts: Post[]): Record<string, number> {
  const tagCount: Record<string, number> = {}
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        tagCount[tag] = (tagCount[tag] || 0) + 1
      })
    }
  })
  return tagCount
}
