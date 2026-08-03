'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eraser, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, skyscraperConfig } from '@/data/config'
import {
  cellCol,
  cellRow,
  findConflicts,
  isBoardFilled,
  isBoardSolved,
  visibleCount,
} from '@/utils/skyscraper'
import type { SkyscraperPuzzle } from '@/utils/skyscraper'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type SkyscraperBoardProps = {
  puzzle: SkyscraperPuzzle
  locale: LocaleType
  onComplete: () => void
  onBack: () => void
}

const HEIGHT_COLORS = ['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#60A5FA', '#818CF8', '#C084FC']

function heightColor(value: number): string {
  return HEIGHT_COLORS[(value - 1) % HEIGHT_COLORS.length]
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}

const controlButtonClass = clsx(
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-700',
  'bg-primary-dark/30 px-3 py-2.5 text-sm font-medium text-gray-200 transition-colors',
  'hover:border-primary hover:bg-primary-dark hover:text-gray-100',
  'disabled:pointer-events-none disabled:opacity-30'
)

export function SkyscraperBoard({ puzzle, locale, onComplete, onBack }: SkyscraperBoardProps) {
  const { size, clues } = puzzle
  const given = puzzle.puzzle
  const theme = difficultyTheme[puzzle.difficulty]
  const [board, setBoard] = useState<number[]>(() => given.slice())
  const [selected, setSelected] = useState<number | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [mistakes, setMistakes] = useState<Set<number>>(new Set())
  const [showNoConflicts, setShowNoConflicts] = useState(false)
  const hasReportedRef = useRef(false)

  useEffect(() => {
    if (solved || revealed) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [solved, revealed])

  useEffect(() => {
    if (!solved && !revealed && isBoardFilled(board) && isBoardSolved(board, puzzle.solution)) {
      setSolved(true)
    }
  }, [board, puzzle.solution, solved, revealed])

  useEffect(() => {
    if (solved && !hasReportedRef.current) {
      hasReportedRef.current = true
      onComplete()
    }
  }, [solved, onComplete])

  useEffect(() => {
    if (mistakes.size === 0 && !showNoConflicts) return
    const timeout = setTimeout(() => {
      setMistakes(new Set())
      setShowNoConflicts(false)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [mistakes, showNoConflicts])

  const conflicts = findConflicts(board, size)

  function setCellValue(index: number, value: number) {
    if (given[index] !== 0 || solved || revealed) return
    setMistakes(new Set())
    setShowNoConflicts(false)
    setBoard((prev) => {
      const next = prev.slice()
      next[index] = value
      return next
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (selected === null) return
    const digit = Number(e.key)
    if (!Number.isNaN(digit) && digit >= 1 && digit <= size) {
      setCellValue(selected, digit)
      return
    }
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      setCellValue(selected, 0)
      return
    }
    const row = cellRow(selected, size)
    const col = cellCol(selected, size)
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(((row + size - 1) % size) * size + col) }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(((row + 1) % size) * size + col) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setSelected(row * size + ((col + size - 1) % size)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setSelected(row * size + ((col + 1) % size)) }
  }

  function handleReset() {
    setBoard(given.slice())
    setSelected(null)
    setSolved(false)
    setRevealed(false)
    setSeconds(0)
    setMistakes(new Set())
    setShowNoConflicts(false)
    hasReportedRef.current = false
  }

  function handleSolve() {
    setBoard(puzzle.solution.slice())
    setRevealed(true)
    setSelected(null)
    setMistakes(new Set())
    setShowNoConflicts(false)
  }

  function handleCheck() {
    const wrong = new Set<number>()
    board.forEach((value, index) => {
      if (given[index] === 0 && value !== 0 && value !== puzzle.solution[index]) {
        wrong.add(index)
      }
    })
    setMistakes(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  function rowValues(row: number): number[] {
    return board.slice(row * size, row * size + size)
  }
  function colValues(col: number): number[] {
    const vals = []
    for (let r = 0; r < size; r++) vals.push(board[r * size + col])
    return vals
  }

  function clueStatus(direction: 'top' | 'bottom' | 'left' | 'right', idx: number, clue: number | null) {
    if (clue == null) return 'empty' as const
    const vals = direction === 'top' || direction === 'bottom' ? colValues(idx) : rowValues(idx)
    if (vals.some((v) => v === 0)) return 'pending' as const
    const reversed = direction === 'bottom' || direction === 'right'
    const count = visibleCount(reversed ? vals.slice().reverse() : vals)
    return count === clue ? 'match' as const : 'mismatch' as const
  }

  function ClueCell({ direction, idx }: { direction: 'top' | 'bottom' | 'left' | 'right', idx: number }) {
    const clue = clues[direction][idx]
    const status = clueStatus(direction, idx, clue)
    if (status === 'empty') return <div />
    return (
      <div
        className={clsx(
          'flex items-center justify-center gap-1 py-1.5 transition-colors',
          status === 'pending' && 'text-gray-300',
          status === 'match' && 'text-emerald-400',
          status === 'mismatch' && 'animate-pulse text-rose-400',
        )}
      >
        <Eye size={11} strokeWidth={2.5} className="opacity-80" />
        <span className="text-sm font-bold sm:text-base">{clue}</span>
      </div>
    )
  }

  const selectedValue = selected !== null ? board[selected] : null
  const isFinished = solved || revealed
  const canErase = selected !== null && given[selected] === 0 && !isFinished
  const cellTextSize = size <= 5 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
  const tracks = size + 2

  return (
    <div className="pb-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> {skyscraperConfig.backToLevels[locale]}
        </button>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              theme.border, theme.bg, theme.text,
            )}
          >
            <span className={clsx('h-1.5 w-1.5 rounded-full', theme.dot)} />
            {skyscraperConfig.difficulty[puzzle.difficulty][locale]}
          </span>
          <span
            aria-label={`${skyscraperConfig.time[locale]} ${formatTime(seconds)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-primary-dark/40 px-3 py-1 text-xs font-semibold text-gray-300"
          >
            <Timer size={14} /> {formatTime(seconds)}
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-primary-dark/30 p-3 shadow-inner shadow-black/20 sm:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />
        <div
          className="relative grid gap-px rounded-lg bg-gray-700/60"
          style={{ gridTemplateColumns: `repeat(${tracks}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: tracks * tracks }).map((_, i) => {
            const row = Math.floor(i / tracks)
            const col = i % tracks

            if (row === 0 || row === tracks - 1 || col === 0 || col === tracks - 1) {
              if ((row === 0 || row === tracks - 1) && (col === 0 || col === tracks - 1)) {
                return <div key={i} className="bg-primary-dark/30" />
              }
              if (row === 0) return <div key={i} className="bg-primary-dark/30"><ClueCell direction="top" idx={col - 1} /></div>
              if (row === tracks - 1) return <div key={i} className="bg-primary-dark/30"><ClueCell direction="bottom" idx={col - 1} /></div>
              if (col === 0) return <div key={i} className="bg-primary-dark/30"><ClueCell direction="left" idx={row - 1} /></div>
              return <div key={i} className="bg-primary-dark/30"><ClueCell direction="right" idx={row - 1} /></div>
            }

            const boardRow = row - 1
            const boardCol = col - 1
            const index = boardRow * size + boardCol
            const value = board[index]
            const isGiven = given[index] !== 0
            const isSelected = selected === index
            const isConflict = conflicts.has(index)
            const isMistake = mistakes.has(index)
            const isFlagged = isConflict || isMistake
            const inSameLine = selected !== null
              && (cellRow(selected, size) === boardRow || cellCol(selected, size) === boardCol)
            const sameValue = !!selectedValue && !isSelected && value === selectedValue

            let bgClass = 'bg-background'
            if (inSameLine) bgClass = 'bg-gray-700/50'
            if (sameValue) bgClass = 'bg-primary/15'
            if (isFlagged) bgClass = 'bg-rose-400/15'
            if (isSelected) bgClass = 'bg-primary/25'

            const color = value !== 0 ? heightColor(value) : null

            return (
              <button
                key={i}
                onClick={() => setSelected(index)}
                tabIndex={index === 0 ? 0 : -1}
                onKeyDown={handleKeyDown}
                className={clsx(
                  'relative flex aspect-square items-center justify-center font-extrabold outline-none',
                  cellTextSize,
                  'transition-colors',
                  isSelected && 'ring-2 ring-inset ring-primary',
                  bgClass,
                )}
                style={color && !isFlagged ? { boxShadow: `inset 0 -3px 0 0 ${color}` } : undefined}
              >
                <span
                  className={clsx(
                    isFlagged ? 'text-rose-400' : isGiven ? 'text-gray-300' : 'text-gray-50',
                  )}
                  style={color && !isFlagged && !isGiven ? { color } : undefined}
                >
                  {value !== 0 ? value : ''}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-full max-w-md flex-wrap justify-center gap-1.5 sm:gap-2">
        {Array.from({ length: size }, (_, i) => i + 1).map((n) => {
          const color = heightColor(n)
          return (
            <button
              key={n}
              disabled={isFinished}
              onClick={() => selected !== null && setCellValue(selected, n)}
              className={clsx(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-base font-semibold sm:h-11 sm:w-11 sm:text-lg',
                'border-gray-700 bg-primary-dark/20 text-gray-100 transition-all',
                'hover:-translate-y-0.5 hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-30',
              )}
              style={{ borderColor: `${color}55`, boxShadow: `inset 0 -3px 0 0 ${color}` }}
            >
              {n}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-md flex-wrap gap-2">
        <button onClick={() => canErase && setCellValue(selected as number, 0)} disabled={!canErase} className={controlButtonClass}>
          <Eraser size={16} /> {skyscraperConfig.erase[locale]}
        </button>
        <button onClick={handleCheck} disabled={isFinished} className={controlButtonClass}>
          <CircleCheck size={16} /> {skyscraperConfig.check[locale]}
        </button>
        <button onClick={handleReset} className={controlButtonClass}>
          <RotateCcw size={16} /> {skyscraperConfig.reset[locale]}
        </button>
        <button onClick={handleSolve} disabled={isFinished} className={controlButtonClass}>
          <Eye size={16} /> {skyscraperConfig.solve[locale]}
        </button>
      </div>

      {solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
          <PartyPopper className="shrink-0 text-primary" size={24} />
          <div>
            <p className="font-bold text-gray-100">{skyscraperConfig.congrats[locale]}</p>
            <p className="text-sm text-gray-400">{skyscraperConfig.time[locale]}: {formatTime(seconds)}</p>
          </div>
        </div>
      )}
      {revealed && !solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <Eye className="shrink-0" size={20} />
          {skyscraperConfig.solved[locale]}
        </div>
      )}
      {showNoConflicts && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <CircleCheck className="shrink-0 text-emerald-400" size={20} />
          {skyscraperConfig.noConflictsFound[locale]}
        </div>
      )}
    </div>
  )
}
