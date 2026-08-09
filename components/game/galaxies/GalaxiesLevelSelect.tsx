import { LocaleType, PuzzleGameConfig } from '@/data/config'
import { gridDifficulties } from '@/utils/gridPuzzle'
import type { GalaxiesPuzzle } from '@/utils/galaxies'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type GalaxiesLevelSelectProps = {
  puzzles: GalaxiesPuzzle[]
  completed: string[]
  locale: LocaleType
  config: PuzzleGameConfig
  onSelect: (id: string) => void
}

export function GalaxiesLevelSelect({ puzzles, completed, locale, config, onSelect }: GalaxiesLevelSelectProps) {
  return (
    <LevelSelectLayout
      puzzles={puzzles}
      completed={completed}
      locale={locale}
      config={config}
      difficulties={gridDifficulties}
      onSelect={onSelect}
      getSubtitle={(puzzle) => `${puzzle.size}x${puzzle.size}`}
    />
  )
}
