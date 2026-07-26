import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Post } from 'contentlayer/generated'

import { formatDate } from '@/utils/date'
import { Tag } from '@/components/blog/Tag'
import { blogConfig, LocaleType } from '@/data/config'
import { siteMetadata } from '@/data/siteMetadata'

export function PostCard({ post, locale }: { post: Post, locale: LocaleType }) {
  return (
    <article
      className="
        group overflow-hidden rounded-xl border border-gray-700 bg-primary-dark/10
        transition-all duration-200
        hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-black/30
        sm:flex
      "
    >
      <Link
        href={post.path}
        className="relative block h-44 shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64"
      >
        <Image
          alt={post.title}
          title={post.title}
          src={post.image || siteMetadata.defaultPostImage}
          fill
          unoptimized={(post.image || siteMetadata.defaultPostImage).endsWith('.svg')}
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-gray-400">
            <time dateTime={post.date} className="flex items-center gap-1">
              {formatDate(post.date, locale)}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={13} /> {Math.ceil(post.readingTime.minutes)} {blogConfig.readingTime[locale]}
            </span>
          </div>
          <h3 className="mb-2 text-xl font-bold leading-7 tracking-tight sm:text-2xl">
            <Link href={post.path} className="text-gray-100 transition-colors hover:text-primary">
              {post.title}
            </Link>
          </h3>
          {post.summary && (
            <p className="line-clamp-2 text-sm text-gray-400 sm:text-base">{post.summary}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap">
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} locale={locale} />
            ))}
          </div>
          <Link
            href={post.path}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-sky-400"
          >
            {blogConfig.readMore[locale]} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  )
}
