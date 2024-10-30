import 'katex/dist/katex.min.css'

import { notFound } from 'next/navigation'
import Link from 'next/link'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts } from 'contentlayer/generated'
import type { MDXComponents } from 'mdx/types'

import { BlogInformation } from '@/components/blog/BlogInfomation'
import { Comments } from '@/components/blog/Comments'
import { Pre } from '@/components/blog/Pre'
import { Tag } from '@/components/blog/Tag'

import { generatePageSeo } from '@/utils/seo'
import { LocaleType } from '@/data/config'

const mdxComponents: MDXComponents = {
  pre: ({ children }) => <Pre>{children}</Pre>,
}

export const generateMetadata = ({ params }: { params: { slug: string, locale: LocaleType } }) => {
  const post = allPosts.find((post) => post.slug === params.slug && post.locale === params.locale)
  if (!post) return null
  return generatePageSeo({ title: post.title, image: post.image, description: post.summary })
}

export default function Page({ params }: { params: { slug: string, locale: LocaleType } }) {
  const post = allPosts.find((post) => post.slug === params.slug && post.locale === params.locale)
  if (!post) notFound()
  const postsInSeries = allPosts.filter(
    p => post.series ? p.series?.title === post.series.title && p.locale === params.locale : false
  ).map(
    p => {return {title: p.title, path: p.path, order: p.series?.order ? p.series.order : 0}}
  ).sort(
    (a, b) => a.order - b.order
  )
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <article>
      <div className='divide-y divide-gray-700'>
        <header className="py-6 xl:pb-8 xl:pt-16">
          <div className="space-y-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-100 text-4xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap">
              {post.tags.map(tag => <Tag key={tag} text={tag} locale={params.locale}/>)}
            </div>
            <BlogInformation
              date={post.date}
              readingTime={post.readingTime.minutes}
              words={post.readingTime.words}
              locale={params.locale}
            />
          </div>
        </header>
        {
          post.series &&
          <div className="prose max-w-none pb-6 pt-6 text-justify leading-6">
            <h1 className="text-xl text-gray-100">
              Series: {post.series.title}
            </h1>
            <span className="text-md text-gray-300">
              Phần: {post.series.order} / {postsInSeries.length}
            </span>
            <ul>
            {
              postsInSeries.map(({title, order, path}) => (
                <li key={order}>
                  {
                    path !== post.path
                    ? <Link className='no-underline' href={path}>{title}</Link>
                    : <span className='text-sky-400'>{title}</span>
                  }
                </li>
              ))
            }
            </ul>
          </div>
        }
        <div className="prose max-w-none pb-8 pt-6 text-justify space-y-6">
          <MDXContent components={mdxComponents}/>
          <Comments/>
        </div>
      </div>
    </article>
  )
}
