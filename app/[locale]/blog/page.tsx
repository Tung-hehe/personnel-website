import { allPosts } from 'contentlayer/generated'
import { dateSortDesc } from '@/utils/date'
import { BlogsLayout } from '@/components/blog/BlogsLayout'

import { generatePageSeo } from '@/utils/seo'
import { blogConfig, LocaleType } from '@/data/config'


export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: blogConfig.title[params.locale] })
}

export default function Page({ params }: { params: { locale: LocaleType } }) {
  const posts = allPosts.filter(x => x.locale ===  params.locale).sort((a, b) => dateSortDesc(a.date, b.date))

  return <BlogsLayout posts={posts} title={blogConfig.title[params.locale]} locale={params.locale}/>
}
