import { generatePageSeo } from '@/utils/seo'
import { galaxiesConfig, LocaleType } from '@/data/config'
import { GalaxiesGame } from '@/components/game/galaxies/GalaxiesGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: galaxiesConfig.title[params.locale] })
}

export default function Galaxies({ params }: { params: { locale: LocaleType } }) {
  return <GalaxiesGame locale={params.locale} />
}
