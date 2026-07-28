import { generatePageSeo } from '@/utils/seo'
import { slitherlinkConfig, LocaleType } from '@/data/config'
import { SlitherlinkGame } from '@/components/game/slitherlink/SlitherlinkGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: slitherlinkConfig.title[params.locale] })
}

export default function Slitherlink({ params }: { params: { locale: LocaleType } }) {
  return <SlitherlinkGame locale={params.locale} />
}
