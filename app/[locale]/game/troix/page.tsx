import { generatePageSeo } from '@/utils/seo'
import { troixConfig, LocaleType } from '@/data/config'
import { TroixGame } from '@/components/game/grid/TroixGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: troixConfig.title[params.locale] })
}

export default function Troix({ params }: { params: { locale: LocaleType } }) {
  return <TroixGame locale={params.locale} />
}
