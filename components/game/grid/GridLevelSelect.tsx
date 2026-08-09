import { LocaleType, PuzzleGameConfig } from '@/data/config'
import { gridDifficulties } from '@/utils/gridPuzzle'
import type { GridPuzzle } from '@/utils/gridPuzzle'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type GridLevelSelectProps = {
  puzzles: GridPuzzle[]
  completed: string[]
  locale: LocaleType
  config: PuzzleGameConfig
  onSelect: (id: string) => void
}

export function GridLevelSelect({ puzzles, completed, locale, config, onSelect }: GridLevelSelectProps) {
  return (
    <LevelSelectLayout
      puzzles={puzzles}
      completed={completed}
      locale={locale}
      config={config}
      difficulties={gridDifficulties}
      onSelect={onSelect}
      getSubtitle={(puzzle) => {
        const clueCount = puzzle.puzzle.filter((v) => v !== -1).length
        return `${puzzle.size}x${puzzle.size}, ${clueCount} ${config.clues[locale]}`
      }}
    />
  )
}
