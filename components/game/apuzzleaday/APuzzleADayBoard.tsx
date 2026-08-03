'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { Eye, PartyPopper, RotateCcw, RotateCw, FlipHorizontal } from 'lucide-react'

import { LocaleType, APuzzleADayConfig } from '@/data/config'
import {
  BOARD_ROWS,
  BOARD_COLS,
  MONTH_NAMES,
  PIECES,
  boardLabels,
  getOrientedShape,
  isPlacementValid,
  isSolved,
  placementCells,
  solve,
} from '@/utils/aPuzzleADay'
import type { Orientation, Piece, PlacedPiece } from '@/utils/aPuzzleADay'

type APuzzleADayBoardProps = {
  month: number
  day: number
  locale: LocaleType
  config: APuzzleADayConfig
}

const controlButtonClass = clsx(
  'inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-700',
  'bg-primary-dark/30 px-3 py-2.5 text-sm font-medium text-gray-200 transition-colors',
  'hover:border-primary hover:bg-primary-dark hover:text-gray-100',
  'disabled:pointer-events-none disabled:opacity-30'
)

function shapeGrid(shape: [number, number][]): boolean[][] {
  const maxR = Math.max(...shape.map((c) => c[0]))
  const maxC = Math.max(...shape.map((c) => c[1]))
  const grid = Array.from({ length: maxR + 1 }, () => new Array(maxC + 1).fill(false))
  for (const [r, c] of shape) grid[r][c] = true
  return grid
}

function PiecePreview({ piece, orientation }: { piece: Piece, orientation: Orientation }) {
  const shape = getOrientedShape(piece, orientation.rotation, orientation.flipped)
  const grid = shapeGrid(shape)
  return (
    <div className="flex flex-col">
      {grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((filled, c) => (
            <div
              key={c}
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
              style={{ backgroundColor: filled ? piece.color : 'transparent' }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

type DragSource =
  | { type: 'tray' }
  | { type: 'placed', placement: PlacedPiece }

type DragRefState = {
  pieceId: string
  orientation: Orientation
  grabOffset: [number, number]
  source: DragSource
  wasActiveBefore: boolean
  /** occupied-cells snapshot taken at drag start, with the dragged piece's own cells excluded */
  baseOccupied: Map<number, string>
  cellSize: number
  startX: number
  startY: number
  dragging: boolean
  hoverAnchor: { row: number, col: number } | null
}

type DragVisual = {
  pieceId: string
  cells: number[] | null
  valid: boolean
  pointerX: number
  pointerY: number
}

const DRAG_THRESHOLD = 5

export function APuzzleADayBoard({ month, day, locale, config }: APuzzleADayBoardProps) {
  const excludedCells = useMemo(() => {
    const monthIdx = boardLabels.findIndex((l) => l.type === 'month' && l.month === month)
    const dayIdx = boardLabels.findIndex((l) => l.type === 'day' && l.day === day)
    return new Set([monthIdx, dayIdx])
  }, [month, day])

  const [placed, setPlaced] = useState<PlacedPiece[]>([])
  const [activePieceId, setActivePieceId] = useState<string | null>(null)
  const [orientation, setOrientation] = useState<Orientation>({ rotation: 0, flipped: false })
  const [invalidFlash, setInvalidFlash] = useState(false)
  const [solved, setSolved] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [dragVisual, setDragVisual] = useState<DragVisual | null>(null)

  const boardGridRef = useRef<HTMLDivElement>(null)

  const occupied = useMemo(() => {
    const map = new Map<number, string>()
    for (const p of placed) for (const c of p.cells) map.set(c, p.pieceId)
    return map
  }, [placed])

  const dragRef = useRef<DragRefState | null>(null)

  useEffect(() => {
    if (!solved && !revealed && isSolved(placed, excludedCells)) {
      setSolved(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed, excludedCells, solved, revealed])

  const isFinished = solved || revealed
  const activePiece = PIECES.find((p) => p.id === activePieceId) ?? null

  function flashInvalid() {
    setInvalidFlash(true)
    setTimeout(() => setInvalidFlash(false), 500)
  }

  function getCellFromClientPoint(x: number, y: number): number | null {
    const el = boardGridRef.current
    if (!el) return null
    const rect = el.getBoundingClientRect()
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) return null
    const col = Math.floor(((x - rect.left) / rect.width) * BOARD_COLS)
    const row = Math.floor(((y - rect.top) / rect.height) * BOARD_ROWS)
    if (row < 0 || row >= BOARD_ROWS || col < 0 || col >= BOARD_COLS) return null
    return row * BOARD_COLS + col
  }

  function handlePointerMove(e: PointerEvent) {
    const drag = dragRef.current
    if (!drag) return
    const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY
    if (!drag.dragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      drag.dragging = true
    }
    if (!drag.dragging) return
    e.preventDefault()

    const cellIndex = getCellFromClientPoint(e.clientX, e.clientY)
    const piece = PIECES.find((p) => p.id === drag.pieceId)
    if (cellIndex === null || !piece) {
      drag.hoverAnchor = null
      setDragVisual({ pieceId: drag.pieceId, cells: null, valid: false, pointerX: e.clientX, pointerY: e.clientY })
      return
    }
    const row = Math.floor(cellIndex / BOARD_COLS), col = cellIndex % BOARD_COLS
    const anchorRow = row - drag.grabOffset[0], anchorCol = col - drag.grabOffset[1]
    const shape = getOrientedShape(piece, drag.orientation.rotation, drag.orientation.flipped)
    const cells = placementCells(shape, anchorRow, anchorCol)
    const valid = !!cells && isPlacementValid(cells, excludedCells, drag.baseOccupied)
    drag.hoverAnchor = valid ? { row: anchorRow, col: anchorCol } : null
    setDragVisual({ pieceId: drag.pieceId, cells, valid, pointerX: e.clientX, pointerY: e.clientY })
  }

  function handlePointerUp() {
    const drag = dragRef.current
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)
    dragRef.current = null
    setDragVisual(null)
    if (!drag) return

    if (drag.dragging) {
      if (drag.hoverAnchor) {
        const piece = PIECES.find((p) => p.id === drag.pieceId)
        if (piece) {
          const shape = getOrientedShape(piece, drag.orientation.rotation, drag.orientation.flipped)
          const cells = placementCells(shape, drag.hoverAnchor.row, drag.hoverAnchor.col)
          if (cells) {
            setPlaced((prev) => [
              ...prev,
              { pieceId: drag.pieceId, orientation: drag.orientation, anchorRow: drag.hoverAnchor!.row, anchorCol: drag.hoverAnchor!.col, cells },
            ])
          }
        }
        setActivePieceId(null)
      } else if (drag.source.type === 'placed') {
        const { placement } = drag.source
        setPlaced((prev) => [...prev, placement])
        flashInvalid()
      } else {
        flashInvalid()
      }
    } else if (drag.source.type === 'tray' && drag.wasActiveBefore) {
      // a plain click on the already-selected tray piece toggles it off
      setActivePieceId(null)
    }
    // any other plain click (selecting a tray piece, or picking up a placed
    // piece) was already applied by the pointerdown handler below.
  }

  function beginDrag(pieceId: string, sourceOrientation: Orientation, grabOffset: [number, number], source: DragSource, e: React.PointerEvent) {
    if (isFinished) return
    const baseOccupied = new Map(occupied)
    if (source.type === 'placed') {
      for (const c of source.placement.cells) baseOccupied.delete(c)
    }
    const boardRect = boardGridRef.current?.getBoundingClientRect()
    const cellSize = boardRect ? boardRect.width / BOARD_COLS : 40
    dragRef.current = {
      pieceId,
      orientation: sourceOrientation,
      grabOffset,
      source,
      wasActiveBefore: activePieceId === pieceId,
      baseOccupied,
      cellSize,
      startX: e.clientX,
      startY: e.clientY,
      dragging: false,
      hoverAnchor: null,
    }
    if (source.type === 'placed') {
      setPlaced((prev) => prev.filter((p) => p.pieceId !== pieceId))
    }
    setActivePieceId(pieceId)
    setOrientation(sourceOrientation)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  function handleTrayPointerDown(e: React.PointerEvent, piece: Piece) {
    if (isFinished) return
    e.preventDefault()
    const existing = placed.find((p) => p.pieceId === piece.id)
    if (existing) {
      beginDrag(piece.id, existing.orientation, [0, 0], { type: 'placed', placement: existing }, e)
    } else {
      const startOrientation = activePieceId === piece.id ? orientation : { rotation: 0, flipped: false }
      beginDrag(piece.id, startOrientation, [0, 0], { type: 'tray' }, e)
    }
  }

  function handleBoardPointerDown(e: React.PointerEvent, index: number) {
    if (isFinished) return
    const pieceId = occupied.get(index)
    if (!pieceId) return
    e.preventDefault()
    const placement = placed.find((p) => p.pieceId === pieceId)
    if (!placement) return
    const row = Math.floor(index / BOARD_COLS), col = index % BOARD_COLS
    const grabOffset: [number, number] = [row - placement.anchorRow, col - placement.anchorCol]
    beginDrag(pieceId, placement.orientation, grabOffset, { type: 'placed', placement }, e)
  }

  useEffect(() => () => {
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleReset() {
    setPlaced([])
    setActivePieceId(null)
    setOrientation({ rotation: 0, flipped: false })
    setSolved(false)
    setRevealed(false)
    setDragVisual(null)
    dragRef.current = null
  }

  function handleSolve() {
    const solution = solve(excludedCells)
    if (!solution) return
    setPlaced(solution)
    setActivePieceId(null)
    setRevealed(true)
  }

  const ghostPiece = dragVisual ? PIECES.find((p) => p.id === dragVisual.pieceId) : undefined
  const ghostDrag = dragRef.current

  return (
    <div className="pb-10">
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {placed.length}/{PIECES.length} {config.piecesPlaced[locale]}
          </span>
        </div>

        <div className="rounded-2xl border border-gray-700 bg-primary-dark/20 p-3 shadow-inner shadow-black/20 sm:p-4">
          <div
            ref={boardGridRef}
            className="grid overflow-hidden rounded-lg"
            style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: BOARD_ROWS * BOARD_COLS }, (_, index) => {
              const label = boardLabels[index]
              if (label.type === 'invalid') return <div key={index} />

              const isExcluded = excludedCells.has(index)
              const pieceId = occupied.get(index)
              const piece = pieceId ? PIECES.find((p) => p.id === pieceId) : undefined
              const text = label.type === 'month' ? MONTH_NAMES[label.month - 1] : String(label.day)

              const inDragPreview = dragVisual?.cells?.includes(index) ?? false
              const draggedPiece = inDragPreview ? PIECES.find((p) => p.id === dragVisual!.pieceId) : undefined

              let backgroundColor: string | undefined
              let ringClass = ''
              if (inDragPreview) {
                backgroundColor = dragVisual!.valid ? draggedPiece?.color : '#F87171'
                ringClass = dragVisual!.valid ? 'ring-2 ring-inset ring-white/70' : 'ring-2 ring-inset ring-rose-300'
              } else if (piece) {
                backgroundColor = piece.color
              }

              return (
                <button
                  key={index}
                  type="button"
                  data-cell-index={index}
                  onPointerDown={(e) => handleBoardPointerDown(e, index)}
                  disabled={isFinished}
                  className={clsx(
                    'relative flex aspect-square touch-none select-none items-center justify-center border border-black/20 text-[10px] font-bold transition-colors sm:text-xs',
                    'disabled:pointer-events-none',
                    piece ? 'cursor-grab text-white active:cursor-grabbing' : 'text-gray-300',
                    isExcluded && !piece && !inDragPreview && 'ring-2 ring-inset ring-primary text-primary',
                    !piece && !isExcluded && !inDragPreview && 'bg-gray-800/60 hover:bg-gray-700/60',
                    ringClass,
                  )}
                  style={{ backgroundColor }}
                >
                  {text}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PIECES.map((piece) => {
            const isPlaced = placed.some((p) => p.pieceId === piece.id)
            const isActive = activePieceId === piece.id
            const isBeingDragged = dragVisual?.pieceId === piece.id
            return (
              <button
                key={piece.id}
                type="button"
                disabled={isFinished}
                onPointerDown={(e) => handleTrayPointerDown(e, piece)}
                className={clsx(
                  'flex touch-none select-none items-center justify-center rounded-lg border-2 p-2 transition-colors',
                  'cursor-grab active:cursor-grabbing disabled:pointer-events-none',
                  isActive ? 'border-primary bg-primary-dark/50' : 'border-gray-700 bg-primary-dark/20 hover:border-gray-500',
                  (isPlaced || isBeingDragged) && 'opacity-40',
                )}
              >
                <PiecePreview piece={piece} orientation={isActive ? orientation : { rotation: 0, flipped: false }} />
              </button>
            )
          })}
        </div>

        {activePiece && !isFinished && (
          <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-gray-700 bg-primary-dark/30 p-3">
            <PiecePreview piece={activePiece} orientation={orientation} />
            <button
              type="button"
              onClick={() => setOrientation((o) => ({ ...o, rotation: (o.rotation + 1) % 4 }))}
              className={clsx(controlButtonClass, 'flex-none')}
            >
              <RotateCw size={16} /> {config.rotate[locale]}
            </button>
            <button
              type="button"
              onClick={() => setOrientation((o) => ({ ...o, flipped: !o.flipped }))}
              className={clsx(controlButtonClass, 'flex-none')}
            >
              <FlipHorizontal size={16} /> {config.flip[locale]}
            </button>
          </div>
        )}

        {invalidFlash && (
          <div className="mt-3 rounded-lg border border-rose-400/50 bg-rose-400/10 p-2 text-center text-sm text-rose-400">
            {config.invalidPlacement[locale]}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={handleReset} className={controlButtonClass}>
            <RotateCcw size={16} /> {config.reset[locale]}
          </button>
          <button onClick={handleSolve} disabled={isFinished} className={controlButtonClass}>
            <Eye size={16} /> {config.solve[locale]}
          </button>
        </div>

        {solved && (
          <div className="mt-4 flex w-full items-center gap-3 rounded-xl border border-primary/50 bg-primary-dark/60 p-4">
            <PartyPopper className="shrink-0 text-primary" size={24} />
            <p className="font-bold text-gray-100">{config.congrats[locale]}</p>
          </div>
        )}
        {revealed && !solved && (
          <div className="mt-4 flex w-full items-center gap-3 rounded-xl border border-gray-700 bg-primary-dark/30 p-4 text-gray-300">
            <Eye className="shrink-0" size={20} />
            {config.solved[locale]}
          </div>
        )}
      </div>

      {dragVisual && ghostPiece && ghostDrag && (
        <PieceGhost
          piece={ghostPiece}
          orientation={ghostDrag.orientation}
          grabOffset={ghostDrag.grabOffset}
          cellSize={ghostDrag.cellSize}
          x={dragVisual.pointerX}
          y={dragVisual.pointerY}
        />
      )}
    </div>
  )
}

function PieceGhost({
  piece, orientation, grabOffset, cellSize, x, y,
}: {
  piece: Piece
  orientation: Orientation
  grabOffset: [number, number]
  cellSize: number
  x: number
  y: number
}) {
  const shape = getOrientedShape(piece, orientation.rotation, orientation.flipped)
  const left = x - (grabOffset[1] + 0.5) * cellSize
  const top = y - (grabOffset[0] + 0.5) * cellSize
  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50" style={{ transform: `translate(${left}px, ${top}px)` }}>
      {shape.map(([r, c], i) => (
        <div
          key={i}
          className="absolute rounded-sm opacity-80 shadow-lg"
          style={{
            width: cellSize - 2,
            height: cellSize - 2,
            left: c * cellSize,
            top: r * cellSize,
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  )
}
