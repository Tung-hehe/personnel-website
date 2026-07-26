'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eraser, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, PuzzleGameConfig } from '@/data/config'
import {
  CELL_EMPTY,
  CELL_MARK,
  CELL_STAR,
  cellCol,
  cellRow,
  findConflicts,
  isSolved,
  regionBorderColor,
  regionColor,
} from '@/utils/starBattle'
import type { StarBattlePuzzle } from '@/utils/starBattle'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type StarBattleBoardProps = {
  puzzle: StarBattlePuzzle
  locale: LocaleType
  config: PuzzleGameConfig
  onComplete: () => void
  onBack: () => void
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

function nextCellValue(value: number): number {
  if (value === CELL_EMPTY) return CELL_STAR
  if (value === CELL_STAR) return CELL_MARK
  return CELL_EMPTY
}

export function StarBattleBoard({ puzzle, locale, config, onComplete, onBack }: StarBattleBoardProps) {
  const { size, regions } = puzzle
  const theme = difficultyTheme[puzzle.difficulty]
  const [board, setBoard] = useState<number[]>(() => new Array(size * size).fill(CELL_EMPTY))
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
    if (!solved && !revealed && isSolved(board, puzzle.solution)) {
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

  const conflicts = findConflicts(board, regions, size)

  function setCellValue(index: number, value: number) {
    if (solved || revealed) return
    setMistakes(new Set())
    setShowNoConflicts(false)
    setBoard((prev) => {
      const next = prev.slice()
      next[index] = value
      return next
    })
  }

  function cycleCell(index: number) {
    setCellValue(index, nextCellValue(board[index]))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (selected === null) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      cycleCell(selected)
      return
    }
    if (e.key === '1') { setCellValue(selected, CELL_STAR); return }
    if (e.key === '2' || e.key.toLowerCase() === 'x') { setCellValue(selected, CELL_MARK); return }
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') { setCellValue(selected, CELL_EMPTY); return }
    const row = cellRow(selected, size)
    const col = cellCol(selected, size)
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(((row + size - 1) % size) * size + col) }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(((row + 1) % size) * size + col) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setSelected(row * size + ((col + size - 1) % size)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setSelected(row * size + ((col + 1) % size)) }
  }

  function handleReset() {
    setBoard(new Array(size * size).fill(CELL_EMPTY))
    setSelected(null)
    setSolved(false)
    setRevealed(false)
    setSeconds(0)
    setMistakes(new Set())
    setShowNoConflicts(false)
    hasReportedRef.current = false
  }

  function handleSolve() {
    setBoard(puzzle.solution.map((v) => (v === 1 ? CELL_STAR : CELL_EMPTY)))
    setRevealed(true)
    setSelected(null)
    setMistakes(new Set())
    setShowNoConflicts(false)
  }

  function handleCheck() {
    const wrong = new Set<number>()
    board.forEach((value, index) => {
      if (value === CELL_STAR && puzzle.solution[index] !== 1) wrong.add(index)
    })
    setMistakes(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  const isFinished = solved || revealed
  const canErase = selected !== null && board[selected] !== CELL_EMPTY && !isFinished

  return (
    <div className="pb-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> {config.backToLevels[locale]}
        </button>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              theme.border, theme.bg, theme.text,
            )}
          >
            <span className={clsx('h-1.5 w-1.5 rounded-full', theme.dot)} />
            {config.difficulty[puzzle.difficulty][locale]}
          </span>
          <span
            aria-label={`${config.time[locale]} ${formatTime(seconds)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-primary-dark/40 px-3 py-1 text-xs font-semibold text-gray-300"
          >
            <Timer size={14} /> {formatTime(seconds)}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-700 bg-primary-dark/20 p-3 shadow-inner shadow-black/20 sm:p-4">
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="grid overflow-hidden rounded-lg border border-gray-500 outline-none"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        >
          {board.map((value, index) => {
            const row = cellRow(index, size)
            const col = cellCol(index, size)
            const region = regions[index]
            const isSelected = selected === index
            const isFlagged = conflicts.has(index) || mistakes.has(index)
            const rightRegion = col !== size - 1 ? regions[index + 1] : null
            const bottomRegion = row !== size - 1 ? regions[index + size] : null

            return (
              <button
                key={index}
                onClick={() => { setSelected(index); cycleCell(index) }}
                style={{
                  backgroundColor: isFlagged ? undefined : regionColor(region, size),
                  borderRightColor: rightRegion !== null && rightRegion !== region ? regionBorderColor(region, size) : undefined,
                  borderBottomColor: bottomRegion !== null && bottomRegion !== region ? regionBorderColor(region, size) : undefined,
                }}
                className={clsx(
                  'relative flex aspect-square items-center justify-center text-lg font-semibold sm:text-xl',
                  col !== size - 1 && (rightRegion !== region ? 'border-r-2' : 'border-r border-r-black/10'),
                  row !== size - 1 && (bottomRegion !== region ? 'border-b-2' : 'border-b border-b-black/10'),
                  isFlagged && 'bg-rose-400/25',
                  isSelected && 'ring-2 ring-inset ring-primary',
                )}
              >
                {value === CELL_STAR && <span className={isFlagged ? 'text-rose-400' : 'text-gray-100'}>&#9733;</span>}
                {value === CELL_MARK && <span className="text-gray-500">&middot;</span>}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-md flex-wrap gap-2">
        <button onClick={() => canErase && setCellValue(selected as number, CELL_EMPTY)} disabled={!canErase} className={controlButtonClass}>
          <Eraser size={16} /> {config.erase[locale]}
        </button>
        <button onClick={handleCheck} disabled={isFinished} className={controlButtonClass}>
          <CircleCheck size={16} /> {config.check[locale]}
        </button>
        <button onClick={handleReset} className={controlButtonClass}>
          <RotateCcw size={16} /> {config.reset[locale]}
        </button>
        <button onClick={handleSolve} disabled={isFinished} className={controlButtonClass}>
          <Eye size={16} /> {config.solve[locale]}
        </button>
      </div>

      {solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
          <PartyPopper className="shrink-0 text-primary" size={24} />
          <div>
            <p className="font-bold text-gray-100">{config.congrats[locale]}</p>
            <p className="text-sm text-gray-400">{config.time[locale]}: {formatTime(seconds)}</p>
          </div>
        </div>
      )}
      {revealed && !solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <Eye className="shrink-0" size={20} />
          {config.solved[locale]}
        </div>
      )}
      {showNoConflicts && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <CircleCheck className="shrink-0 text-emerald-400" size={20} />
          {config.noConflictsFound[locale]}
        </div>
      )}
    </div>
  )
}
