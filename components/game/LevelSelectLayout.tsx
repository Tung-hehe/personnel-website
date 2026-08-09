'use client'

import { useState } from 'react'
import clsx from 'clsx'

import { Twemoji } from '@/components/common/Twemoji'
import { PuzzleGameConfig, LocaleType } from '@/data/config'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

type LevelSelectPuzzle = {
  id: string
  difficulty: Difficulty
}

type LevelSelectLayoutProps<P extends LevelSelectPuzzle> = {
  puzzles: P[]
  completed: string[]
  locale: LocaleType
  config: PuzzleGameConfig
  difficulties: Difficulty[]
  onSelect: (id: string) => void
  getSubtitle: (puzzle: P) => string
}

export function LevelSelectLayout<P extends LevelSelectPuzzle>({
  puzzles, completed, locale, config, difficulties, onSelect, getSubtitle,
}: LevelSelectLayoutProps<P>) {
  const availableDifficulties = difficulties.filter((d) => puzzles.some((p) => p.difficulty === d))
  const [active, setActive] = useState<Difficulty>(availableDifficulties[0])

  const progress = Math.round((completed.length / puzzles.length) * 100)
  const activeLevels = puzzles.filter((p) => p.difficulty === active)

  function renderLevelGrid(levels: P[], theme: (typeof difficultyTheme)[Difficulty]) {
    return (
      <div className="flex flex-wrap justify-between gap-y-3 sm:justify-start sm:gap-4">
        {levels.map((puzzle, i) => {
          const isDone = completed.includes(puzzle.id)
          return (
            <button
              key={puzzle.id}
              onClick={() => onSelect(puzzle.id)}
              title={isDone ? config.completed[locale] : getSubtitle(puzzle)}
              aria-label={`${config.level[locale]} ${i + 1}`}
              className={clsx(
                'relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 text-lg font-bold',
                'transition-transform hover:-translate-y-0.5',
                isDone
                  ? clsx(theme.border, theme.bg, theme.text)
                  : clsx(theme.borderMuted, 'bg-primary-dark/20 text-gray-100', theme.ring)
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
    )
  }

  return (
    <div>
      <p className="mb-4 text-gray-400">{config.rules[locale]}</p>

      <div className="mb-6 rounded-xl border border-gray-700 bg-primary-dark/30 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-300">{config.chooseLevel[locale]}</span>
          <span className="font-semibold text-gray-100">{completed.length}/{puzzles.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Mobile: tabbed single-difficulty view, to avoid a very long scroll */}
      <div className="sm:hidden">
        <div className="mb-6 grid grid-cols-2 gap-2">
          {availableDifficulties.map((difficulty) => {
            const theme = difficultyTheme[difficulty]
            const levelsInDifficulty = puzzles.filter((p) => p.difficulty === difficulty)
            const doneCount = levelsInDifficulty.filter((p) => completed.includes(p.id)).length
            const isActive = difficulty === active
            return (
              <button
                key={difficulty}
                onClick={() => setActive(difficulty)}
                className={clsx(
                  'flex w-full items-center justify-center gap-2 rounded-full border-2 px-3 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? clsx(theme.border, theme.bg, theme.text)
                    : 'border-gray-700 bg-primary-dark/20 text-gray-400 hover:border-gray-500'
                )}
              >
                <span className={clsx('h-2.5 w-2.5 rounded-full', theme.dot)} />
                {config.difficulty[difficulty][locale]}
                <span className={clsx('text-xs font-normal', isActive ? '' : 'text-gray-500')}>
                  {doneCount}/{levelsInDifficulty.length}
                </span>
              </button>
            )
          })}
        </div>
        {renderLevelGrid(activeLevels, difficultyTheme[active])}
      </div>

      {/* Desktop: all difficulties shown at once, in 2 equal balanced columns */}
      <div className="hidden sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8">
        {availableDifficulties.map((difficulty, i) => {
          const theme = difficultyTheme[difficulty]
          const levelsInDifficulty = puzzles.filter((p) => p.difficulty === difficulty)
          const doneCount = levelsInDifficulty.filter((p) => completed.includes(p.id)).length
          const isRightColumn = i % 2 === 1
          return (
            <div key={difficulty} className={clsx('min-w-0', isRightColumn && 'sm:justify-self-end')}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-100">
                <span className={clsx('h-2.5 w-2.5 rounded-full', theme.dot)} />
                {config.difficulty[difficulty][locale]}
                <span className="text-sm font-normal text-gray-500">({doneCount}/{levelsInDifficulty.length})</span>
              </h2>
              {renderLevelGrid(levelsInDifficulty, theme)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
