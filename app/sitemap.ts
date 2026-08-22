import { MetadataRoute } from 'next'

import { allPosts } from 'contentlayer/generated'
import gamesData from '@/data/games'
import { siteMetadata } from '@/data/siteMetadata'
import { locales, defaultLocale, LocaleType } from '@/data/config'
import { getTagsCount } from '@/utils/tag'
import { kebabCase } from '@/utils/string'

const baseUrl = siteMetadata.siteUrl.replace(/\/$/, '')

function localizedUrl(locale: LocaleType, path: string) {
  const prefix = locale === defaultLocale ? '' : `/${locale}`
  return `${baseUrl}${prefix}${path}`
}

// Trang tĩnh, không phụ thuộc dữ liệu Contentlayer/data
const staticPaths = ['/', '/blog', '/project', '/game', '/tag', '/about', '/privacy-policy']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales as LocaleType[]) {
    for (const path of staticPaths) {
      entries.push({
        url: localizedUrl(locale, path),
        changeFrequency: 'monthly',
        priority: path === '/' ? 1 : 0.6,
      })
    }
    for (const game of gamesData) {
      entries.push({ url: localizedUrl(locale, game.href), changeFrequency: 'yearly', priority: 0.5 })
    }
    for (const tag of Object.keys(getTagsCount(allPosts, locale))) {
      entries.push({ url: localizedUrl(locale, `/tag/${kebabCase(tag)}`), changeFrequency: 'monthly', priority: 0.4 })
    }
  }

  for (const post of allPosts) {
    entries.push({
      url: localizedUrl(post.locale as LocaleType, `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: 'yearly',
      priority: 0.7,
    })
  }

  return entries
}
