import Link from 'next/link'
import { Post } from 'contentlayer/generated'

import { formatDate } from '@/utils/date'
import { Tag } from '@/components/blog/Tag'
import { LocaleType } from '@/data/config'


export function PostCard({ post, locale }: { post: Post, locale: LocaleType }) {
  return (
    <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
      <dd className="font-medium leading-6 text-gray-400">
        <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
      </dd>
      <div className="space-y-3 xl:col-span-3">
        <div className="space-y-3">
          <h3 className="text-2xl leading-8 tracking-tight">
            <Link href={post.path} className="text-gray-100">
              <span>{post.title}</span>
            </Link>
          </h3>
          <div className="flex flex-wrap">
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} locale={locale}/>
            ))}
          </div>
        </div>
        <div className="prose max-w-none text-gray-400">{post.summary}</div>
      </div>
    </article>
  )
}
