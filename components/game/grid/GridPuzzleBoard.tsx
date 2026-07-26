'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eraser, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, PuzzleGameConfig } from '@/data/config'
import {
  cellCol,
  cellRow,
  findConflicts,
  isBoardFilled,
  isBoardSolved,
} from '@/utils/gridPuzzle'
import type { GridPuzzle } from '@/utils/gridPuzzle'
import { difficultyTheme } from '@/components/game/difficultyTheme'
import type { GridGameDef } from './gridGameDefs'

type GridPuzzleBoardProps = {
  puzzle: GridPuzzle
  def: GridGameDef
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

export function GridPuzzleBoard({ puzzle, def, locale, config, onComplete, onBack }: GridPuzzleBoardProps) {
  const { size } = puzzle
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

  const conflicts = findConflicts(board, size, def.symbolCount, def.requireUnique)

  function setCellValue(index: number, value: number) {
    if (given[index] !== -1 || solved || revealed) return
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
    const key = e.key.toUpperCase()
    const symbolIndex = def.symbols.indexOf(key)
    if (symbolIndex !== -1) {
      setCellValue(selected, symbolIndex)
      return
    }
    if (e.key >= '1' && e.key <= String(def.symbolCount)) {
      setCellValue(selected, Number(e.key) - 1)
      return
    }
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      setCellValue(selected, -1)
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
      if (given[index] === -1 && value !== -1 && value !== puzzle.solution[index]) {
        wrong.add(index)
      }
    })
    setMistakes(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  const selectedValue = selected !== null ? board[selected] : null
  const isFinished = solved || revealed
  const canErase = selected !== null && given[selected] === -1 && !isFinished
  const cellTextSize = size <= 10 ? 'text-lg sm:text-xl' : size <= 14 ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'

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
            const isGiven = given[index] !== -1
            const isSelected = selected === index
            const isConflict = conflicts.has(index)
            const isMistake = mistakes.has(index)
            const isFlagged = isConflict || isMistake
            const inSameLine = selected !== null
              && (cellRow(selected, size) === row || cellCol(selected, size) === col)
            const sameValue = selectedValue !== null && selectedValue !== -1 && !isSelected && value === selectedValue

            let bgClass = 'bg-transparent'
            if (inSameLine) bgClass = 'bg-gray-800/40'
            if (sameValue) bgClass = 'bg-primary/10'
            if (isFlagged) bgClass = 'bg-rose-400/10'
            if (isSelected) bgClass = 'bg-primary/25'

            return (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={clsx(
                  'relative flex aspect-square items-center justify-center font-semibold',
                  cellTextSize,
                  'border-gray-800 transition-[background-color]',
                  col !== size - 1 && 'border-r',
                  row !== size - 1 && 'border-b',
                  isFlagged ? 'text-rose-400' : value !== -1 ? def.symbolColors[value] : 'text-gray-100',
                  isGiven && !isFlagged && 'text-gray-100',
                  isSelected && 'ring-2 ring-inset ring-primary',
                  bgClass,
                )}
              >
                {value !== -1 ? def.symbols[value] : ''}
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="mx-auto mt-4 grid w-full max-w-md gap-2"
        style={{ gridTemplateColumns: `repeat(${def.symbols.length}, minmax(0, 1fr))` }}
      >
        {def.symbols.map((symbol, v) => (
          <button
            key={symbol}
            onClick={() => selected !== null && setCellValue(selected, v)}
            disabled={isFinished}
            className={clsx(
              'flex h-12 items-center justify-center rounded-lg border text-lg font-semibold',
              'border-gray-700 bg-primary-dark/20 text-gray-100 transition-colors',
              'hover:border-primary hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-30',
            )}
          >
            {symbol}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-4 flex max-w-md flex-wrap gap-2">
        <button onClick={() => canErase && setCellValue(selected as number, -1)} disabled={!canErase} className={controlButtonClass}>
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
