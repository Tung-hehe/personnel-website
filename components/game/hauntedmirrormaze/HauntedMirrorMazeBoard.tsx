'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Droplet, Eraser, Eye, Ghost, PartyPopper, RotateCcw, Skull, Timer } from 'lucide-react'

import { LocaleType, hauntedMirrorMazeConfig } from '@/data/config'
import {
  EMPTY_CELL,
  GHOST,
  VAMPIRE,
  ZOMBIE,
  cellCol,
  cellRow,
  isBoardFilled,
  isBoardSolved,
  lineVisibleCount,
  sightLineCells,
} from '@/utils/hauntedMirrorMaze'
import type { HauntedMirrorMazePuzzle } from '@/utils/hauntedMirrorMaze'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type HauntedMirrorMazeBoardProps = {
  puzzle: HauntedMirrorMazePuzzle
  locale: LocaleType
  onComplete: () => void
  onBack: () => void
}

type Direction = 'top' | 'bottom' | 'left' | 'right'

const SYMBOLS = ['V', 'G', 'Z']
const SYMBOL_ICONS = [Droplet, Ghost, Skull]
const SYMBOL_COLORS = ['text-rose-400', 'text-sky-300', 'text-emerald-400']
const SYMBOL_KEYS: {[key: string]: number} = {v: VAMPIRE, g: GHOST, z: ZOMBIE, '1': VAMPIRE, '2': GHOST, '3': ZOMBIE}

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

type ClueStatus = 'pending' | 'match' | 'mismatch'

function ClueCell({ clue, status, isActive, onToggle, title }: {
  clue: number, status: ClueStatus, isActive: boolean, onToggle: () => void, title: string,
}) {
  return (
    <button
      onClick={onToggle}
      title={title}
      className={clsx(
        'flex h-full w-full items-center justify-center gap-1 rounded outline-none transition-colors',
        'hover:bg-primary/10',
        isActive && 'bg-primary/20 ring-1 ring-inset ring-primary/70',
        !isActive && status === 'pending' && 'text-gray-300',
        !isActive && status === 'match' && 'text-emerald-400',
        !isActive && status === 'mismatch' && 'animate-pulse text-rose-400',
        isActive && 'text-primary',
      )}
    >
      <Eye size={11} strokeWidth={2.5} className="opacity-80" />
      <span className="text-sm font-bold sm:text-base">{clue}</span>
    </button>
  )
}

function MirrorGlyph({ type, id }: { type: 0 | 1, id: number }) {
  const x1 = type === 0 ? 12 : 88
  const x2 = type === 0 ? 88 : 12
  const gradientId = `mirror-sheen-${id}`
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id={gradientId} x1={x1} y1="12" x2={x2} y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#93C5FD" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <line x1={x1} y1="12" x2={x2} y2="88" stroke={`url(#${gradientId})`} strokeWidth="10" strokeLinecap="round" />
      <line x1={x1} y1="12" x2={x2} y2="88" stroke="#F8FAFC" strokeOpacity="0.9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function HauntedMirrorMazeBoard({ puzzle, locale, onComplete, onBack }: HauntedMirrorMazeBoardProps) {
  const { size, clues, mirrors } = puzzle
  const given = puzzle.puzzle
  const theme = difficultyTheme[puzzle.difficulty]
  const [board, setBoard] = useState<number[]>(() => given.slice())
  const [selected, setSelected] = useState<number | null>(null)
  const [seconds, setSeconds] = useState(0)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [mistakes, setMistakes] = useState<Set<number>>(new Set())
  const [showNoConflicts, setShowNoConflicts] = useState(false)
  const [activeLine, setActiveLine] = useState<{ direction: Direction, idx: number } | null>(null)
  const hasReportedRef = useRef(false)

  const activeSeg = useMemo(() => {
    if (!activeLine) return null
    return sightLineCells(activeLine.direction, activeLine.idx, mirrors, size)
  }, [activeLine, mirrors, size])
  const activeH = useMemo(() => new Set(activeSeg?.H ?? []), [activeSeg])
  const activeR = useMemo(() => new Set(activeSeg?.R ?? []), [activeSeg])
  const activeMirrors = useMemo(() => new Set(activeSeg?.mirrorPath ?? []), [activeSeg])

  function toggleLine(direction: Direction, idx: number) {
    setActiveLine((prev) => (prev && prev.direction === direction && prev.idx === idx ? null : { direction, idx }))
  }

  useEffect(() => {
    if (solved || revealed) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [solved, revealed])

  useEffect(() => {
    if (!solved && !revealed && isBoardFilled(board, mirrors) && isBoardSolved(board, puzzle.solution, mirrors)) {
      setSolved(true)
    }
  }, [board, puzzle.solution, mirrors, solved, revealed])

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

  function setCellValue(index: number, value: number) {
    if (mirrors[index] != null || given[index] !== EMPTY_CELL || solved || revealed) return
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
    const key = e.key.toLowerCase()
    if (key in SYMBOL_KEYS) {
      setCellValue(selected, SYMBOL_KEYS[key])
      return
    }
    if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      setCellValue(selected, EMPTY_CELL)
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
    setActiveLine(null)
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
      if (mirrors[index] == null && given[index] === EMPTY_CELL && value !== EMPTY_CELL && value !== puzzle.solution[index]) {
        wrong.add(index)
      }
    })
    setMistakes(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  function clueStatus(direction: Direction, idx: number, clue: number): ClueStatus {
    const seg = sightLineCells(direction, idx, mirrors, size)
    const cells = [...seg.H, ...seg.R]
    if (cells.some((i) => board[i] === EMPTY_CELL)) return 'pending'
    const count = lineVisibleCount(seg, board)
    return count === clue ? 'match' : 'mismatch'
  }

  function renderClue(key: number, direction: Direction, idx: number) {
    const clue = clues[direction][idx]
    if (clue == null) return <div key={key} className="aspect-square bg-primary-dark/30" />
    const status = clueStatus(direction, idx, clue)
    const isActive = activeLine?.direction === direction && activeLine?.idx === idx
    return (
      <div key={key} className="aspect-square bg-primary-dark/30">
        <ClueCell
          clue={clue}
          status={status}
          isActive={isActive}
          onToggle={() => toggleLine(direction, idx)}
          title={hauntedMirrorMazeConfig.showSightLine[locale]}
        />
      </div>
    )
  }

  const isFinished = solved || revealed
  const canErase = selected !== null && mirrors[selected] == null && given[selected] === EMPTY_CELL && !isFinished
  const cellTextSize = size <= 6 ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
  const tracks = size + 2

  return (
    <div className="pb-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} /> {hauntedMirrorMazeConfig.backToLevels[locale]}
        </button>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide',
              theme.border, theme.bg, theme.text,
            )}
          >
            <span className={clsx('h-1.5 w-1.5 rounded-full', theme.dot)} />
            {hauntedMirrorMazeConfig.difficulty[puzzle.difficulty][locale]}
          </span>
          <span
            aria-label={`${hauntedMirrorMazeConfig.time[locale]} ${formatTime(seconds)}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-700 bg-primary-dark/40 px-3 py-1 text-xs font-semibold text-gray-300"
          >
            <Timer size={14} /> {formatTime(seconds)}
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-primary-dark/30 p-3 shadow-inner shadow-black/20 sm:p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"
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
                return <div key={i} className="aspect-square bg-primary-dark/30" />
              }
              if (row === 0) return renderClue(i, 'top', col - 1)
              if (row === tracks - 1) return renderClue(i, 'bottom', col - 1)
              if (col === 0) return renderClue(i, 'left', row - 1)
              return renderClue(i, 'right', row - 1)
            }

            const boardRow = row - 1
            const boardCol = col - 1
            const index = boardRow * size + boardCol
            const mirror = mirrors[index]
            const value = board[index]
            const isMirror = mirror != null
            const isGiven = !isMirror && given[index] !== EMPTY_CELL
            const isSelected = selected === index
            const isMistake = mistakes.has(index)
            const inSameLine = selected !== null
              && (cellRow(selected, size) === boardRow || cellCol(selected, size) === boardCol)
            const sameValue = !isMirror && value !== EMPTY_CELL && !isSelected
              && selected !== null && board[selected] === value
            const onH = activeH.has(index)
            const onR = activeR.has(index)
            const onMirrorPath = activeMirrors.has(index)
            const onActiveLine = onH || onR
            const isVisibleOnLine = onH
              ? (value === VAMPIRE || value === ZOMBIE)
              : onR
                ? (value === GHOST || value === ZOMBIE)
                : false

            let bgClass = 'bg-background'
            if (isMirror) bgClass = 'bg-gray-800/70'
            if (inSameLine) bgClass = isMirror ? 'bg-gray-700/60' : 'bg-gray-700/50'
            if (onH) bgClass = 'bg-amber-400/15'
            if (onR) bgClass = 'bg-violet-400/15'
            if (sameValue) bgClass = 'bg-primary/15'
            if (isMistake) bgClass = 'bg-rose-400/15'
            if (isSelected) bgClass = 'bg-primary/25'

            const Icon = value !== EMPTY_CELL ? SYMBOL_ICONS[value] : null

            return (
              <button
                key={i}
                onClick={() => !isMirror && setSelected(index)}
                tabIndex={index === 0 ? 0 : -1}
                onKeyDown={handleKeyDown}
                disabled={isMirror}
                className={clsx(
                  'relative flex aspect-square items-center justify-center font-semibold outline-none',
                  cellTextSize,
                  'transition-colors',
                  isSelected && 'ring-2 ring-inset ring-primary',
                  !isSelected && onH && 'ring-1 ring-inset ring-amber-300/70',
                  !isSelected && onR && 'ring-1 ring-inset ring-violet-400/70',
                  onMirrorPath && 'ring-2 ring-inset ring-sky-300/90',
                  isMirror ? 'cursor-default p-2.5' : 'p-1.5',
                  bgClass,
                )}
              >
                {isMirror && <MirrorGlyph type={mirror as 0 | 1} id={index} />}
                {!isMirror && Icon && (
                  <Icon
                    size={size <= 6 ? 26 : 22}
                    strokeWidth={2}
                    className={clsx(
                      'transition-opacity',
                      onActiveLine && isVisibleOnLine
                        ? (onH ? 'drop-shadow-[0_0_6px_rgba(252,211,77,0.85)]' : 'drop-shadow-[0_0_6px_rgba(167,139,250,0.85)]')
                        : 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]',
                      isMistake ? 'text-rose-400' : SYMBOL_COLORS[value],
                      !onActiveLine && isGiven && !isMistake && 'opacity-70',
                      onActiveLine && (isVisibleOnLine ? 'opacity-100' : 'opacity-20'),
                    )}
                  />
                )}
              </button>
            )
          })}
        </div>

        <div
          aria-hidden={!activeLine}
          className={clsx(
            'relative mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-400 transition-opacity',
            activeLine ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-300/70" /> {hauntedMirrorMazeConfig.directView[locale]}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-violet-400/70" /> {hauntedMirrorMazeConfig.reflectedView[locale]}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-md grid-cols-3 gap-2">
        {SYMBOLS.map((symbol, v) => {
          const Icon = SYMBOL_ICONS[v]
          return (
            <button
              key={symbol}
              onClick={() => selected !== null && setCellValue(selected, v)}
              disabled={isFinished}
              className={clsx(
                'flex h-12 items-center justify-center gap-1.5 rounded-lg border text-sm font-semibold',
                'border-gray-700 bg-primary-dark/20 transition-all',
                SYMBOL_COLORS[v],
                'hover:-translate-y-0.5 hover:bg-primary/10 disabled:pointer-events-none disabled:opacity-30',
              )}
            >
              <Icon size={18} strokeWidth={2.25} /> {symbol}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-4 flex max-w-md flex-wrap gap-2">
        <button onClick={() => canErase && setCellValue(selected as number, EMPTY_CELL)} disabled={!canErase} className={controlButtonClass}>
          <Eraser size={16} /> {hauntedMirrorMazeConfig.erase[locale]}
        </button>
        <button onClick={handleCheck} disabled={isFinished} className={controlButtonClass}>
          <CircleCheck size={16} /> {hauntedMirrorMazeConfig.check[locale]}
        </button>
        <button onClick={handleReset} className={controlButtonClass}>
          <RotateCcw size={16} /> {hauntedMirrorMazeConfig.reset[locale]}
        </button>
        <button onClick={handleSolve} disabled={isFinished} className={controlButtonClass}>
          <Eye size={16} /> {hauntedMirrorMazeConfig.solve[locale]}
        </button>
      </div>

      {solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
          <PartyPopper className="shrink-0 text-primary" size={24} />
          <div>
            <p className="font-bold text-gray-100">{hauntedMirrorMazeConfig.congrats[locale]}</p>
            <p className="text-sm text-gray-400">{hauntedMirrorMazeConfig.time[locale]}: {formatTime(seconds)}</p>
          </div>
        </div>
      )}
      {revealed && !solved && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <Eye className="shrink-0" size={20} />
          {hauntedMirrorMazeConfig.solved[locale]}
        </div>
      )}
      {showNoConflicts && (
        <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <CircleCheck className="shrink-0 text-emerald-400" size={20} />
          {hauntedMirrorMazeConfig.noConflictsFound[locale]}
        </div>
      )}
    </div>
  )
}
