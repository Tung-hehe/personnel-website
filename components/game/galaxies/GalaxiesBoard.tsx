'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, PuzzleGameConfig } from '@/data/config'
import {
  cellIndex,
  findWrongWalls,
  hWallKey,
  isSolved,
  regionColor,
  solutionWalls,
  vWallKey,
} from '@/utils/galaxies'
import type { GalaxiesPuzzle } from '@/utils/galaxies'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type GalaxiesBoardProps = {
  puzzle: GalaxiesPuzzle
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

export function GalaxiesBoard({ puzzle, locale, config, onComplete, onBack }: GalaxiesBoardProps) {
  const { size, centers, regions } = puzzle
  const theme = difficultyTheme[puzzle.difficulty]
  const trackCount = 2 * size - 1

  const [walls, setWalls] = useState<Set<string>>(() => new Set())
  const [seconds, setSeconds] = useState(0)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [wrongWalls, setWrongWalls] = useState<Set<string>>(new Set())
  const [showNoConflicts, setShowNoConflicts] = useState(false)
  const hasReportedRef = useRef(false)

  const centerAt = useMemo(() => {
    const map = new Map<string, boolean>()
    for (const center of centers) map.set(`${center.row},${center.col}`, true)
    return map
  }, [centers])

  useEffect(() => {
    if (solved || revealed) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [solved, revealed])

  useEffect(() => {
    if (!solved && !revealed && isSolved(walls, puzzle)) {
      setSolved(true)
    }
  }, [walls, puzzle, solved, revealed])

  useEffect(() => {
    if (solved && !hasReportedRef.current) {
      hasReportedRef.current = true
      onComplete()
    }
  }, [solved, onComplete])

  useEffect(() => {
    if (wrongWalls.size === 0 && !showNoConflicts) return
    const timeout = setTimeout(() => {
      setWrongWalls(new Set())
      setShowNoConflicts(false)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [wrongWalls, showNoConflicts])

  const isFinished = solved || revealed

  function toggleWall(key: string) {
    if (isFinished) return
    setWrongWalls(new Set())
    setShowNoConflicts(false)
    setWalls((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function handleReset() {
    setWalls(new Set())
    setSolved(false)
    setRevealed(false)
    setSeconds(0)
    setWrongWalls(new Set())
    setShowNoConflicts(false)
    hasReportedRef.current = false
  }

  function handleSolve() {
    setWalls(solutionWalls(puzzle))
    setRevealed(true)
    setWrongWalls(new Set())
    setShowNoConflicts(false)
  }

  function handleCheck() {
    const wrong = findWrongWalls(walls, puzzle)
    setWrongWalls(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  const innerTemplate = Array.from({ length: trackCount }, (_, i) => (i % 2 === 0 ? '1fr' : '18px')).join(' ')
  const template = `18px ${innerTemplate} 18px`
  const outerTrackCount = trackCount + 2

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

      <div className="mx-auto w-full max-w-lg rounded-2xl border border-gray-700 bg-primary-dark/20 p-3 shadow-inner shadow-black/20 sm:p-4">
        <div
          className="grid overflow-visible"
          style={{ gridTemplateColumns: template, gridTemplateRows: template }}
        >
          {Array.from({ length: outerTrackCount * outerTrackCount }, (_, i) => {
            const outerRow = Math.floor(i / outerTrackCount)
            const outerCol = i % outerTrackCount
            const isTopEdge = outerRow === 0
            const isBottomEdge = outerRow === outerTrackCount - 1
            const isLeftEdge = outerCol === 0
            const isRightEdge = outerCol === outerTrackCount - 1

            if (isTopEdge || isBottomEdge || isLeftEdge || isRightEdge) {
              if ((isTopEdge || isBottomEdge) && (isLeftEdge || isRightEdge)) {
                return (
                  <div key={i} className="relative flex h-full w-full items-center justify-center">
                    <span className="absolute h-1 w-full rounded-full bg-gray-100" />
                    <span className="absolute h-full w-1 rounded-full bg-gray-100" />
                  </div>
                )
              }
              if (isTopEdge || isBottomEdge) {
                return (
                  <div key={i} className="relative flex h-full w-full items-center justify-center">
                    <span className="h-1 w-full rounded-full bg-gray-100" />
                  </div>
                )
              }
              return (
                <div key={i} className="relative flex h-full w-full items-center justify-center">
                  <span className="h-full w-1 rounded-full bg-gray-100" />
                </div>
              )
            }

            const trackRow = outerRow - 1
            const trackCol = outerCol - 1
            const rowIsCell = trackRow % 2 === 0
            const colIsCell = trackCol % 2 === 0
            const hasCenter = centerAt.has(`${trackRow},${trackCol}`)
            const dot = hasCenter && (
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 shadow shadow-black/50"
              />
            )

            if (rowIsCell && colIsCell) {
              const r = trackRow / 2, c = trackCol / 2
              const bg = isFinished ? regionColor(regions[cellIndex(r, c, size)], centers.length) : undefined
              return (
                <div
                  key={i}
                  style={{ backgroundColor: bg }}
                  className="relative flex aspect-square items-center justify-center transition-colors duration-300"
                >
                  {dot}
                </div>
              )
            }

            if (rowIsCell && !colIsCell) {
              const r = trackRow / 2, c = (trackCol - 1) / 2
              const key = vWallKey(r, c)
              const hasWall = walls.has(key)
              const isWrong = wrongWalls.has(key)
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`wall ${r}-${c}-v`}
                  onClick={() => toggleWall(key)}
                  disabled={isFinished}
                  className={clsx(
                    'group relative flex h-full w-full items-center justify-center transition-colors disabled:pointer-events-none',
                    !hasWall && !isFinished && 'hover:bg-gray-600/30 active:bg-gray-600/50',
                  )}
                >
                  <span
                    className={clsx(
                      'h-full w-1 rounded-full transition-colors',
                      hasWall ? (isWrong ? 'bg-rose-400' : 'bg-gray-100') : 'bg-gray-700 group-hover:bg-gray-500',
                    )}
                  />
                  {dot}
                </button>
              )
            }

            if (!rowIsCell && colIsCell) {
              const r = (trackRow - 1) / 2, c = trackCol / 2
              const key = hWallKey(r, c)
              const hasWall = walls.has(key)
              const isWrong = wrongWalls.has(key)
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`wall ${r}-${c}-h`}
                  onClick={() => toggleWall(key)}
                  disabled={isFinished}
                  className={clsx(
                    'group relative flex h-full w-full items-center justify-center transition-colors disabled:pointer-events-none',
                    !hasWall && !isFinished && 'hover:bg-gray-600/30 active:bg-gray-600/50',
                  )}
                >
                  <span
                    className={clsx(
                      'h-1 w-full rounded-full transition-colors',
                      hasWall ? (isWrong ? 'bg-rose-400' : 'bg-gray-100') : 'bg-gray-700 group-hover:bg-gray-500',
                    )}
                  />
                  {dot}
                </button>
              )
            }

            return <div key={i} className="relative">{dot}</div>
          })}
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-lg flex-wrap gap-2">
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
        <div className="mx-auto mt-4 flex w-full max-w-lg items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
          <PartyPopper className="shrink-0 text-primary" size={24} />
          <div>
            <p className="font-bold text-gray-100">{config.congrats[locale]}</p>
            <p className="text-sm text-gray-400">{config.time[locale]}: {formatTime(seconds)}</p>
          </div>
        </div>
      )}
      {revealed && !solved && (
        <div className="mx-auto mt-4 flex w-full max-w-lg items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <Eye className="shrink-0" size={20} />
          {config.solved[locale]}
        </div>
      )}
      {showNoConflicts && (
        <div className="mx-auto mt-4 flex w-full max-w-lg items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
          <CircleCheck className="shrink-0 text-emerald-400" size={20} />
          {config.noConflictsFound[locale]}
        </div>
      )}
    </div>
  )
}
