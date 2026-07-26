import gamesData from "@/data/games";

import { generatePageSeo } from '@/utils/seo'
import { gamesConfig, LocaleType } from '@/data/config'
import { GamesLayout } from "@/components/game/GamesLayout";

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: gamesConfig.title[params.locale] })
}

export default function Games({ params }: { params: { locale: LocaleType } }) {
  return <GamesLayout games={gamesData} locale={params.locale}/>
}
