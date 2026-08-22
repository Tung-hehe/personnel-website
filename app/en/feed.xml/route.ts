import { generateRssFeed } from '@/utils/rss'

export async function GET() {
  const xml = generateRssFeed('en')
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
