import { generatePageSeo } from '@/utils/seo'
import { starBattleConfig, LocaleType } from '@/data/config'
import { StarBattleGame } from '@/components/game/starbattle/StarBattleGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: starBattleConfig.title[params.locale] })
}

export default function StarBattle({ params }: { params: { locale: LocaleType } }) {
  return <StarBattleGame locale={params.locale} />
}
