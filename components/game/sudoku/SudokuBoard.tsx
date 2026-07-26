'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eraser, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, sudokuConfig } from '@/data/config'
import {
  cellBox,
  cellCol,
  cellRow,
  findConflicts,
  isBoardFilled,
  isBoardSolved,
} from '@/utils/sudoku'
import type { SudokuPuzzle } from '@/utils/sudoku'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type SudokuBoardProps = {
  puzzle: SudokuPuzzle
  locale: LocaleType
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

export function SudokuBoard({ puzzle, locale, onComplete, onBack }: SudokuBoardProps) {
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

  const conflicts = findConflicts(board)

  const digitCounts = useMemo(() => {
    const counts = new Array(10).fill(0)
    board.forEach((v) => { if (v !== 0) counts[v]++ })
    return counts
  }, [board])

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
    if (e.key >= '1' && e.key <= '9') {
      setCellValue(selected, Number(e.key))
      return
    }
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      setCellValue(selected, 0)
      return
    }
    const row = cellRow(selected)
    const col = cellCol(selected)
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(((row + 8) % 9) * 9 + col) }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(((row + 1) % 9) * 9 + col) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); setSelected(row * 9 + ((col + 8) % 9)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setSelected(row * 9 + ((col + 1) % 9)) }
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

  const selectedValue = selected !== null ? board[selected] : null
  const isFinished = solved || revealed
  const canErase = selected !== null && given[selected] === 0 && !isFinished

  return (
    <div className="pb-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> {sudokuConfig.backToLevels[locale]}
        </button>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              theme.border, theme.bg, theme.text,
            )}
          >
            <span className={clsx('h-1.5 w-1.5 rounded-full', theme.dot)} />
            {sudokuConfig.difficulty[puzzle.difficulty][locale]}
          </span>
          <span
            aria-label={`${sudokuConfig.time[locale]} ${formatTime(seconds)}`}
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
          className="grid grid-cols-9 overflow-hidden rounded-lg border border-gray-500 outline-none"
        >
          {board.map((value, index) => {
            const row = cellRow(index)
            const col = cellCol(index)
            const box = cellBox(index)
            const isGiven = given[index] !== 0
            const isSelected = selected === index
            const isConflict = conflicts.has(index)
            const isMistake = mistakes.has(index)
            const isFlagged = isConflict || isMistake
            const boxShade = (Math.floor(box / 3) + (box % 3)) % 2 === 1
            const inSameLine = selected !== null
              && (cellRow(selected) === row || cellCol(selected) === col || cellBox(selected) === box)
            const sameValue = !!selectedValue && !isSelected && value === selectedValue

            let bgClass = boxShade ? 'bg-white/[0.03]' : 'bg-transparent'
            if (inSameLine) bgClass = boxShade ? 'bg-gray-700/40' : 'bg-gray-800/40'
            if (sameValue) bgClass = 'bg-primary/10'
            if (isFlagged) bgClass = 'bg-rose-400/10'
            if (isSelected) bgClass = 'bg-primary/25'

            return (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={clsx(
                  'relative flex aspect-square items-center justify-center text-lg font-semibold sm:text-xl',
                  'border-gray-800 transition-[background-color]',
                  col !== 8 && 'border-r',
                  row !== 8 && 'border-b',
                  col % 3 === 0 && col !== 0 && 'border-l-2 border-l-gray-500',
                  row % 3 === 0 && row !== 0 && 'border-t-2 border-t-gray-500',
                  isFlagged ? 'text-rose-400' : isGiven ? 'text-gray-100' : 'text-primary',
                  isSelected && 'ring-2 ring-inset ring-primary',
                  bgClass,
                )}
              >
                {value !== 0 ? value : ''}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-md grid-cols-9 gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => {
          const isExhausted = digitCounts[n] >= 9
          return (
            <button
              key={n}
              disabled={isExhausted || isFinished}
              onClick={() => selected !== null && setCellValue(selected, n)}
              className={clsx(
                'flex aspect-square items-center justify-center rounded-lg border text-lg font-semibold',
                'transition-colors disabled:pointer-events-none',
                isExhausted
                  ? 'border-gray-800 text-gray-700'
                  : 'border-gray-700 bg-primary-dark/20 text-gray-100 hover:border-primary hover:bg-primary/10'
              )}
            >
              {n}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-md flex-wrap gap-2">
        <button onClick={() => canErase && setCellValue(selected as number, 0)} disabled={!canErase} className={controlButtonClass}>
          <Eraser size={16} /> {sudokuConfig.erase[locale]}
        </button>
        <button onClick={handleCheck} disabled={isFinished} className={controlButtonClass}>
          <CircleCheck size={16} /> {sudokuConfig.check[locale]}
        </button>
        <button onClick={handleReset} className={controlButtonClass}>
          <RotateCcw size={16} /> {sudokuConfig.reset[locale]}
        </button>
        <button onClick={handleSolve} disabled={isFinished} className={controlButtonClass}>
          <Eye size={16} /> {sudokuConfig.solve[locale]}
        </button>
      </div>

      {solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
          <PartyPopper className="shrink-0 text-primary" size={24} />
          <div>
            <p className="font-bold text-gray-100">{sudokuConfig.congrats[locale]}</p>
            <p className="text-sm text-gray-400">{sudokuConfig.time[locale]}: {formatTime(seconds)}</p>
          </div>
        </div>
      )}
      {revealed && !solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <Eye className="shrink-0" size={20} />
          {sudokuConfig.solved[locale]}
        </div>
      )}
      {showNoConflicts && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <CircleCheck className="shrink-0 text-emerald-400" size={20} />
          {sudokuConfig.noConflictsFound[locale]}
        </div>
      )}
    </div>
  )
}
