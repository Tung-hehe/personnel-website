import { allPosts, Post } from 'contentlayer/generated'

import { siteMetadata } from '@/data/siteMetadata'
import { LocaleType, defaultLocale } from '@/data/config'
import { sortPosts } from '@/utils/date'

const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '')

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function localizedUrl(locale: LocaleType, path: string): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${baseUrl}${prefix}${path}`
}

export function generateRssFeed(locale: LocaleType): string {
  const posts = allPosts.filter((post) => post.locale === locale).sort(sortPosts)

  const items = posts.map((post: Post) => {
    const url = localizedUrl(locale, `/blog/${post.slug}`)
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary || '')}</description>
    </item>`
  }).join('')

  const siteUrl = localizedUrl(locale, '')
  const feedUrl = localizedUrl(locale, '/feed.xml')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.siteName)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>${locale}</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`
}
