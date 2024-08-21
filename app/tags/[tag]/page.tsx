import { allPosts } from 'contentlayer/generated'
import { dateSortDesc } from '@/utils/date'
import { BlogsLayout } from '@/components/blog/BlogsLayout'

import { generatePageSeo } from '@/utils/seo'

import { commonConfig } from '@/data/config'
import { kebabCase } from '@/utils/string'


export const generateMetadata = ({ params }: { params: { tag: string } }) => {
  return generatePageSeo({ title: `${commonConfig.tags.tagSelect} ${params.tag}` })
}

export default function Page({ params }: { params: { tag: string } }) {
  const posts = allPosts.filter(
    post => {
      const tags = post.tags.map(tag => kebabCase(tag))
      return tags.includes(kebabCase(params.tag))
    }
  ).sort((a, b) => dateSortDesc(a.date, b.date))
  return <BlogsLayout
    posts={posts}
    title={`${commonConfig.tags.tagSelect}: ${kebabCase(params.tag)?.toUpperCase()}`}
  />
}
