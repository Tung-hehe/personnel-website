import { LocaleType, PuzzleGameConfig } from '@/data/config'
import { gridDifficulties } from '@/utils/gridPuzzle'
import type { StarBattlePuzzle } from '@/utils/starBattle'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type StarBattleLevelSelectProps = {
  puzzles: StarBattlePuzzle[]
  completed: string[]
  locale: LocaleType
  config: PuzzleGameConfig
  onSelect: (id: string) => void
}

export function StarBattleLevelSelect({ puzzles, completed, locale, config, onSelect }: StarBattleLevelSelectProps) {
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
