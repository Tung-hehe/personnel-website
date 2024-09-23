import { allPosts } from 'contentlayer/generated'
import { dateSortDesc } from '@/utils/date'
import { BlogsLayout } from '@/components/blog/BlogsLayout'

import { generatePageSeo } from '@/utils/seo'

import { tagsConfig, LocaleType } from '@/data/config'
import { kebabCase } from '@/utils/string'


export const generateMetadata = ({ params }: { params: { tag: string } }) => {
  return generatePageSeo({ title: `${tagsConfig.tagSelect} ${params.tag}` })
}

export default function Page({ params }: { params: { tag: string, locale: LocaleType } }) {
  const posts = allPosts.filter(
    post => {
      const tags = post.tags.map(tag => kebabCase(tag))
      return tags.includes(kebabCase(params.tag))
    }
  ).sort((a, b) => dateSortDesc(a.date, b.date))
  return <BlogsLayout
    posts={posts}
    title={`${tagsConfig.tagSelect}: ${kebabCase(params.tag)?.toUpperCase()}`}
    locale={params.locale}
  />
}
