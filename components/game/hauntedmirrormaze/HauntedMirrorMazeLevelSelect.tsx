import clsx from 'clsx'

import { Twemoji } from '@/components/common/Twemoji'
import { LocaleType, hauntedMirrorMazeConfig } from '@/data/config'
import { hauntedMirrorMazeDifficulties } from '@/utils/hauntedMirrorMaze'
import type { HauntedMirrorMazePuzzle } from '@/utils/hauntedMirrorMaze'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type HauntedMirrorMazeLevelSelectProps = {
  puzzles: HauntedMirrorMazePuzzle[]
  completed: string[]
  locale: LocaleType
  onSelect: (id: string) => void
}

export function HauntedMirrorMazeLevelSelect({ puzzles, completed, locale, onSelect }: HauntedMirrorMazeLevelSelectProps) {
  const progress = Math.round((completed.length / puzzles.length) * 100)

  return (
    <div>
      <p className="mb-4 text-gray-400">{hauntedMirrorMazeConfig.rules[locale]}</p>
      <div className="mb-8 rounded-xl border border-gray-700 bg-primary-dark/30 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-300">{hauntedMirrorMazeConfig.chooseLevel[locale]}</span>
          <span className="font-semibold text-gray-100">{completed.length}/{puzzles.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {hauntedMirrorMazeDifficulties.map((difficulty) => {
        const levels = puzzles.filter((puzzle) => puzzle.difficulty === difficulty)
        if (levels.length === 0) return null
        const theme = difficultyTheme[difficulty]
        const doneCount = levels.filter((p) => completed.includes(p.id)).length

        return (
          <div key={difficulty} className="mb-8">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-100">
              <span className={clsx('h-2.5 w-2.5 rounded-full', theme.dot)} />
              {hauntedMirrorMazeConfig.difficulty[difficulty][locale]}
              <span className="text-sm font-normal text-gray-500">({doneCount}/{levels.length})</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              {levels.map((puzzle, i) => {
                const isDone = completed.includes(puzzle.id)
                const clueCount = puzzle.clues.top.filter((v) => v !== null).length
                  + puzzle.clues.bottom.filter((v) => v !== null).length
                  + puzzle.clues.left.filter((v) => v !== null).length
                  + puzzle.clues.right.filter((v) => v !== null).length
                return (
                  <button
                    key={puzzle.id}
                    onClick={() => onSelect(puzzle.id)}
                    title={isDone ? hauntedMirrorMazeConfig.completed[locale] : `${puzzle.size}x${puzzle.size}, ${clueCount} ${hauntedMirrorMazeConfig.clues[locale]}`}
                    aria-label={`${hauntedMirrorMazeConfig.level[locale]} ${i + 1}`}
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
