import "@/styles/globals.css";
import '@/styles/twemoji.css';

import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { Nunito } from "next/font/google"

import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"

import { siteMetadata } from "@/data/siteMetadata"
import { commonConfig } from '@/data/config'
import { ScrollTopButton } from "@/components/common/ScrollTopButton"
import { LocaleType } from "@/data/config";

const font = Nunito({weight: "700", subsets: ['vietnamese']});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  icons: {
    icon: siteMetadata.siteLogo,
  },
  title: {
    default: siteMetadata.siteName,
    template: `%s - ${siteMetadata.siteName}`
  },
  description: siteMetadata.description,
  openGraph: {
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    card: 'summary_large_image'
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width'
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode,
  params: { locale: LocaleType }
}>) {
  return (
    <html lang={locale}>
      <body className={`${font.className} bg-dark text-white mx-auto max-w-5xl px-3 sm:px-6 xl:max-w-5xl xl:px-0`}>
        <Header locale={locale}/>
        <div className="flex flex-col">
          <ScrollTopButton/>
          <main style={{ minHeight: commonConfig.mainContentMinHeight }}>{children}</main>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
