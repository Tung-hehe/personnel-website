import { generatePageSeo } from '@/utils/seo'
import { binoxConfig, LocaleType } from '@/data/config'
import { BinoxGame } from '@/components/game/grid/BinoxGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: binoxConfig.title[params.locale] })
}

export default function Binox({ params }: { params: { locale: LocaleType } }) {
  return <BinoxGame locale={params.locale} />
}
