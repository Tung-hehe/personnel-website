import { Metadata } from 'next'
import { siteMetadata } from "@/data/siteMetadata"

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  url?: string
  [key: string]: any
}

export function generatePageSeo({
  title,
  description,
  image,
  url,
}: PageSEOProps): Metadata {
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: title || siteMetadata.siteName,
      description: description || siteMetadata.description,
      url,
      type: 'article',
      images: image ? [image] : siteMetadata.socialBanner,
    },
    twitter: {
      card: 'summary_large_image'
    },
  }
}
