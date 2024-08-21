import 'katex/dist/katex.min.css'

import { notFound } from 'next/navigation'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { allPosts } from 'contentlayer/generated'
import type { MDXComponents } from 'mdx/types'

import { BlogInformation } from '@/components/blog/BlogInfomation'
import { Pre } from '@/components/blog/Pre'
import { Tag } from '@/components/blog/Tag'

import { generatePageSeo } from '@/utils/seo'

const mdxComponents: MDXComponents = {
  pre: ({ children }) => <Pre children={children}/>,
}

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return generatePageSeo({ title: post.title, image: post.image, description: post.summary })
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug)
  if (!post) notFound()
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
              {post.tags.map(tag => <Tag key={tag} text={tag} />)}
            </div>
            <BlogInformation date={post.date} readingTime={post.readingTime.minutes} words={post.readingTime.words}/>
          </div>
        </header>
        <div className="prose max-w-none pb-8 pt-6 text-justify">
          <MDXContent components={mdxComponents}/>
        </div>
      </div>
    </article>
  )
}
