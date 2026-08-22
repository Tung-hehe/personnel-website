import Image from 'next/image'
import Link from 'next/link'
import { Post } from 'contentlayer/generated'

import { Tag } from '@/components/blog/Tag'
import { formatDate } from '@/utils/date'
import { blogConfig, LocaleType } from '@/data/config'
import { siteMetadata } from '@/data/siteMetadata'

export function RelatedPosts({ posts, locale }: { posts: Post[], locale: LocaleType }) {
  if (!posts.length) return null

  return (
    <div className="pb-8 pt-6">
      <h2 className="mb-4 text-xl font-bold text-gray-100">{blogConfig.relatedPosts[locale]}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const image = post.image || siteMetadata.defaultPostImage
          return (
            <div
              key={post.slug}
              className="
                group overflow-hidden rounded-xl border border-gray-700 bg-primary-dark/10
                transition-all duration-200
                hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-black/30
              "
            >
              <Link href={post.path} className="relative block h-36 w-full overflow-hidden">
                <Image
                  alt={post.title}
                  title={post.title}
                  src={image}
                  fill
                  unoptimized={image.endsWith('.svg')}
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <time dateTime={post.date} className="text-xs text-gray-400">
                  {formatDate(post.date, locale)}
                </time>
                <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-6">
                  <Link href={post.path} className="text-gray-100 transition-colors hover:text-primary">
                    {post.title}
                  </Link>
                </h3>
                <div className="mt-2 flex flex-wrap">
                  {post.tags.map((tag) => <Tag key={tag} text={tag} locale={locale} />)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
