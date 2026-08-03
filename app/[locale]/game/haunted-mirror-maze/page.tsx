import { generatePageSeo } from '@/utils/seo'
import { hauntedMirrorMazeConfig, LocaleType } from '@/data/config'
import { HauntedMirrorMazeGame } from '@/components/game/hauntedmirrormaze/HauntedMirrorMazeGame'

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: hauntedMirrorMazeConfig.title[params.locale] })
}

export default function HauntedMirrorMaze({ params }: { params: { locale: LocaleType } }) {
  return <HauntedMirrorMazeGame locale={params.locale} />
}
