import { generatePageSeo } from '@/utils/seo'
import { aPuzzleADayConfig, LocaleType } from '@/data/config'
import { APuzzleADayGame } from '@/components/game/apuzzleaday/APuzzleADayGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: aPuzzleADayConfig.title[params.locale] })
}

export default function APuzzleADay({ params }: { params: { locale: LocaleType } }) {
  return <APuzzleADayGame locale={params.locale} />
}
