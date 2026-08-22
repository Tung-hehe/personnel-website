import { generateRssFeed } from '@/utils/rss'
import { defaultLocale } from '@/data/config'

export async function GET() {
  const xml = generateRssFeed(defaultLocale)
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
