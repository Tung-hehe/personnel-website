import { allPosts } from 'contentlayer/generated'
import { dateSortDesc } from '@/utils/date'
import { BlogsLayout } from '@/components/blog/BlogsLayout'

import { generatePageSeo } from '@/utils/seo'

import { commonConfig } from '@/data/config'


export const generateMetadata = () => {
  return generatePageSeo({ title: commonConfig.blog.title })
}

export default function Page() {
  const posts = allPosts.sort((a, b) => dateSortDesc(a.date, b.date))

  return <BlogsLayout posts={posts} title={commonConfig.blog.title}/>
}
