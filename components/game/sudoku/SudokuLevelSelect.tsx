import clsx from 'clsx'

import { Twemoji } from '@/components/common/Twemoji'
import { LocaleType, sudokuConfig } from '@/data/config'
import { sudokuDifficulties } from '@/utils/sudoku'
import type { SudokuPuzzle } from '@/utils/sudoku'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type SudokuLevelSelectProps = {
  puzzles: SudokuPuzzle[]
  completed: string[]
  locale: LocaleType
  onSelect: (id: string) => void
}

export function SudokuLevelSelect({ puzzles, completed, locale, onSelect }: SudokuLevelSelectProps) {
  const progress = Math.round((completed.length / puzzles.length) * 100)

  return (
    <div>
      <p className="mb-4 text-gray-400">{sudokuConfig.rules[locale]}</p>
      <div className="mb-8 rounded-xl border border-gray-700 bg-primary-dark/30 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-300">{sudokuConfig.chooseLevel[locale]}</span>
          <span className="font-semibold text-gray-100">{completed.length}/{puzzles.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {sudokuDifficulties.map((difficulty) => {
        const levels = puzzles.filter((puzzle) => puzzle.difficulty === difficulty)
        if (levels.length === 0) return null
        const theme = difficultyTheme[difficulty]
        const doneCount = levels.filter((p) => completed.includes(p.id)).length

        return (
          <div key={difficulty} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-100">
              <span className={clsx('h-2.5 w-2.5 rounded-full', theme.dot)} />
              {sudokuConfig.difficulty[difficulty][locale]}
              <span className="text-sm font-normal text-gray-500">({doneCount}/{levels.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {levels.map((puzzle, i) => {
                const isDone = completed.includes(puzzle.id)
                const clueCount = puzzle.puzzle.filter((v) => v !== 0).length
                return (
                  <button
                    key={puzzle.id}
                    onClick={() => onSelect(puzzle.id)}
                    title={isDone ? sudokuConfig.completed[locale] : `${clueCount} ${sudokuConfig.clues[locale]}`}
                    aria-label={`${sudokuConfig.level[locale]} ${i + 1}`}
                    className={clsx(
                      'relative flex h-16 w-16 items-center justify-center rounded-xl border-2 text-lg font-bold',
                      'transition-transform hover:-translate-y-0.5',
                      isDone
                        ? clsx(theme.border, theme.bg, theme.text)
                        : clsx('border-gray-700 bg-primary-dark/20 text-gray-100', theme.ring)
                    )}
                  >
                    {i + 1}
                    {isDone && (
                      <span className="absolute -right-2 -top-2 rounded-full bg-background">
                        <Twemoji emoji="white-check-mark" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
