import { LocaleType, PuzzleGameConfig } from '@/data/config'
import { gridDifficulties } from '@/utils/gridPuzzle'
import type { SlitherlinkPuzzle } from '@/utils/slitherlink'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type SlitherlinkLevelSelectProps = {
  puzzles: SlitherlinkPuzzle[]
  completed: string[]
  locale: LocaleType
  config: PuzzleGameConfig
  onSelect: (id: string) => void
}

export function SlitherlinkLevelSelect({ puzzles, completed, locale, config, onSelect }: SlitherlinkLevelSelectProps) {
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
