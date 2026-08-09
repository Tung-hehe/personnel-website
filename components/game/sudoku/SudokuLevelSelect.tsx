import { LocaleType, sudokuConfig } from '@/data/config'
import { sudokuDifficulties } from '@/utils/sudoku'
import type { SudokuPuzzle } from '@/utils/sudoku'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type SudokuLevelSelectProps = {
  puzzles: SudokuPuzzle[]
  completed: string[]
  locale: LocaleType
  onSelect: (id: string) => void
}

export function SudokuLevelSelect({ puzzles, completed, locale, onSelect }: SudokuLevelSelectProps) {
  return (
    <LevelSelectLayout
      puzzles={puzzles}
      completed={completed}
      locale={locale}
      config={sudokuConfig}
      difficulties={sudokuDifficulties}
      onSelect={onSelect}
      getSubtitle={(puzzle) => {
        const clueCount = puzzle.puzzle.filter((v) => v !== 0).length
        return `${clueCount} ${sudokuConfig.clues[locale]}`
      }}
    />
  )
}
