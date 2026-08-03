import { generatePageSeo } from '@/utils/seo'
import { skyscraperConfig, LocaleType } from '@/data/config'
import { SkyscraperGame } from '@/components/game/skyscraper/SkyscraperGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: skyscraperConfig.title[params.locale] })
}

export default function Skyscraper({ params }: { params: { locale: LocaleType } }) {
  return <SkyscraperGame locale={params.locale} />
}
