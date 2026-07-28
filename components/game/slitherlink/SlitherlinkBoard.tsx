'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { ArrowLeft, CircleCheck, Eye, PartyPopper, RotateCcw, Timer } from 'lucide-react'

import { LocaleType, PuzzleGameConfig } from '@/data/config'
import {
  NO_CLUE,
  cellIndex,
  findConflicts,
  findWrongEdges,
  hEdgeKey,
  isSolved,
  solutionEdgeSet,
  vEdgeKey,
} from '@/utils/slitherlink'
import type { SlitherlinkPuzzle } from '@/utils/slitherlink'
import { difficultyTheme } from '@/components/game/difficultyTheme'

type SlitherlinkBoardProps = {
  puzzle: SlitherlinkPuzzle
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

/**
 * Flood-fill from a virtual exterior node (reachable through any grid-boundary
 * edge that isn't part of the loop) to find cells enclosed by `loopEdges`.
 * A plain "every border cell starts outside" seed would be wrong whenever the
 * loop's region itself touches the grid border.
 */
function computeInsideCells(loopEdges: Set<string>, size: number): Set<number> {
  const EXTERIOR = -1
  const total = size * size
  function idx(r: number, c: number) { return r * size + c }
  const visited = new Set<number>([EXTERIOR])
  const queue: number[] = [EXTERIOR]
  let qi = 0
  while (qi < queue.length) {
    const node = queue[qi]; qi++
    if (node === EXTERIOR) {
      for (let c = 0; c < size; c++) {
        if (!loopEdges.has(hEdgeKey(0, c))) { const id = idx(0, c); if (!visited.has(id)) { visited.add(id); queue.push(id) } }
        if (!loopEdges.has(hEdgeKey(size, c))) { const id = idx(size - 1, c); if (!visited.has(id)) { visited.add(id); queue.push(id) } }
      }
      for (let r = 0; r < size; r++) {
        if (!loopEdges.has(vEdgeKey(r, 0))) { const id = idx(r, 0); if (!visited.has(id)) { visited.add(id); queue.push(id) } }
        if (!loopEdges.has(vEdgeKey(r, size))) { const id = idx(r, size - 1); if (!visited.has(id)) { visited.add(id); queue.push(id) } }
      }
      continue
    }
    const r = Math.floor(node / size), c = node % size
    const neighbors: [number, number, string][] = [
      [r - 1, c, hEdgeKey(r, c)],
      [r + 1, c, hEdgeKey(r + 1, c)],
      [r, c - 1, vEdgeKey(r, c)],
      [r, c + 1, vEdgeKey(r, c + 1)],
    ]
    for (const [nr, nc, edge] of neighbors) {
      if (loopEdges.has(edge)) continue
      const nid = (nr < 0 || nr >= size || nc < 0 || nc >= size) ? EXTERIOR : idx(nr, nc)
      if (!visited.has(nid)) { visited.add(nid); queue.push(nid) }
    }
  }
  const inside = new Set<number>()
  for (let id = 0; id < total; id++) if (!visited.has(id)) inside.add(id)
  return inside
}

export function SlitherlinkBoard({ puzzle, locale, config, onComplete, onBack }: SlitherlinkBoardProps) {
  const { size, clues } = puzzle
  const theme = difficultyTheme[puzzle.difficulty]
  const trackCount = 2 * size + 1

  const [edges, setEdges] = useState<Set<string>>(() => new Set())
  const [seconds, setSeconds] = useState(0)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [wrongEdges, setWrongEdges] = useState<Set<string>>(new Set())
  const [showNoConflicts, setShowNoConflicts] = useState(false)
  const hasReportedRef = useRef(false)

  useEffect(() => {
    if (solved || revealed) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [solved, revealed])

  useEffect(() => {
    if (!solved && !revealed && isSolved(edges, puzzle)) {
      setSolved(true)
    }
  }, [edges, puzzle, solved, revealed])

  useEffect(() => {
    if (solved && !hasReportedRef.current) {
      hasReportedRef.current = true
      onComplete()
    }
  }, [solved, onComplete])

  useEffect(() => {
    if (wrongEdges.size === 0 && !showNoConflicts) return
    const timeout = setTimeout(() => {
      setWrongEdges(new Set())
      setShowNoConflicts(false)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [wrongEdges, showNoConflicts])

  const isFinished = solved || revealed

  const conflicts = useMemo(() => findConflicts(edges, puzzle), [edges, puzzle])
  const insideCells = useMemo(
    () => (isFinished ? computeInsideCells(solutionEdgeSet(puzzle), size) : null),
    [isFinished, puzzle, size],
  )

  function toggleEdge(key: string) {
    if (isFinished) return
    setWrongEdges(new Set())
    setShowNoConflicts(false)
    setEdges((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function handleReset() {
    setEdges(new Set())
    setSolved(false)
    setRevealed(false)
    setSeconds(0)
    setWrongEdges(new Set())
    setShowNoConflicts(false)
    hasReportedRef.current = false
  }

  function handleSolve() {
    setEdges(solutionEdgeSet(puzzle))
    setRevealed(true)
    setWrongEdges(new Set())
    setShowNoConflicts(false)
  }

  function handleCheck() {
    const wrong = findWrongEdges(edges, puzzle)
    setWrongEdges(wrong)
    setShowNoConflicts(wrong.size === 0)
  }

  const template = Array.from({ length: trackCount }, (_, i) => (i % 2 === 0 ? '18px' : '1fr')).join(' ')

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
          {Array.from({ length: trackCount * trackCount }, (_, i) => {
            const trackRow = Math.floor(i / trackCount)
            const trackCol = i % trackCount
            const rowIsVertex = trackRow % 2 === 0
            const colIsVertex = trackCol % 2 === 0

            if (rowIsVertex && colIsVertex) {
              return (
                <div key={i} className="relative flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                </div>
              )
            }

            if (rowIsVertex && !colIsVertex) {
              // horizontal edge at vertex-row trackRow/2, between columns
              const vr = trackRow / 2, vc = (trackCol - 1) / 2
              const key = hEdgeKey(vr, vc)
              const hasEdge = edges.has(key)
              const isWrong = wrongEdges.has(key) || conflicts.edges.has(key)
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`edge h-${vr}-${vc}`}
                  onClick={() => toggleEdge(key)}
                  disabled={isFinished}
                  className={clsx(
                    'group relative flex h-full w-full items-center justify-center transition-colors disabled:pointer-events-none',
                    !hasEdge && !isFinished && 'hover:bg-gray-600/30 active:bg-gray-600/50',
                  )}
                >
                  <span
                    className={clsx(
                      'h-1 w-full rounded-full transition-colors',
                      hasEdge ? (isWrong ? 'bg-rose-400' : 'bg-gray-100') : 'bg-gray-700 group-hover:bg-gray-500',
                    )}
                  />
                </button>
              )
            }

            if (!rowIsVertex && colIsVertex) {
              const vr = (trackRow - 1) / 2, vc = trackCol / 2
              const key = vEdgeKey(vr, vc)
              const hasEdge = edges.has(key)
              const isWrong = wrongEdges.has(key) || conflicts.edges.has(key)
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`edge v-${vr}-${vc}`}
                  onClick={() => toggleEdge(key)}
                  disabled={isFinished}
                  className={clsx(
                    'group relative flex h-full w-full items-center justify-center transition-colors disabled:pointer-events-none',
                    !hasEdge && !isFinished && 'hover:bg-gray-600/30 active:bg-gray-600/50',
                  )}
                >
                  <span
                    className={clsx(
                      'h-full w-1 rounded-full transition-colors',
                      hasEdge ? (isWrong ? 'bg-rose-400' : 'bg-gray-100') : 'bg-gray-700 group-hover:bg-gray-500',
                    )}
                  />
                </button>
              )
            }

            // cell
            const r = (trackRow - 1) / 2, c = (trackCol - 1) / 2
            const clue = clues[cellIndex(r, c, size)]
            const isConflict = conflicts.cells.has(cellIndex(r, c, size))
            const isInside = insideCells?.has(cellIndex(r, c, size))
            return (
              <div
                key={i}
                className={clsx(
                  'relative flex aspect-square items-center justify-center text-sm font-bold transition-colors duration-300 sm:text-base',
                  isConflict ? 'text-rose-400' : 'text-gray-200',
                )}
                style={{ backgroundColor: isInside ? 'hsla(217, 70%, 60%, 0.12)' : undefined }}
              >
                {clue !== NO_CLUE ? clue : ''}
              </div>
            )
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
