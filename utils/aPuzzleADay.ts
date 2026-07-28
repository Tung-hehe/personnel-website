export const BOARD_ROWS = 7
export const BOARD_COLS = 7

export type CellLabel =
  | { type: 'month', month: number }
  | { type: 'day', day: number }
  | { type: 'invalid' }

const INVALID_CELLS = new Set<number>([
  0 * BOARD_COLS + 6,
  1 * BOARD_COLS + 6,
  6 * BOARD_COLS + 3,
  6 * BOARD_COLS + 4,
  6 * BOARD_COLS + 5,
  6 * BOARD_COLS + 6,
])

export function cellIndex(row: number, col: number): number {
  return row * BOARD_COLS + col
}

function buildLabels(): CellLabel[] {
  const labels: CellLabel[] = new Array(BOARD_ROWS * BOARD_COLS)
  for (let m = 0; m < 12; m++) {
    const row = Math.floor(m / 6), col = m % 6
    labels[cellIndex(row, col)] = { type: 'month', month: m + 1 }
  }
  let day = 1
  for (let row = 2; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_COLS; col++) {
      const idx = cellIndex(row, col)
      if (INVALID_CELLS.has(idx)) continue
      labels[idx] = { type: 'day', day }
      day++
    }
  }
  for (const idx of Array.from(INVALID_CELLS)) labels[idx] = { type: 'invalid' }
  return labels
}

export const boardLabels: CellLabel[] = buildLabels()

export function monthCell(month: number): number {
  const idx = boardLabels.findIndex((l) => l.type === 'month' && l.month === month)
  return idx
}

export function dayCell(day: number): number {
  const idx = boardLabels.findIndex((l) => l.type === 'day' && l.day === day)
  return idx
}

export const validCells: number[] = boardLabels
  .map((_, idx) => idx)
  .filter((idx) => boardLabels[idx].type !== 'invalid')

export const MONTH_NAMES = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// ---------- Pieces ----------
export type Piece = {
  id: string
  color: string
  /** canonical shape at rotation 0, not flipped; normalized (min row/col = 0) */
  cells: [number, number][]
}

// Verified (by exhaustive exact-cover search over every 1-Jan..31-Dec date,
// including a Feb 29th leap day) to always have at least one valid arrangement.
export const PIECES: Piece[] = [
  { id: 'L', color: '#F87171', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1]] },
  { id: 'P', color: '#FACC15', cells: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0]] },
  { id: 'T', color: '#4ADE80', cells: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]] },
  { id: 'U', color: '#2DD4BF', cells: [[0, 0], [0, 2], [1, 0], [1, 1], [1, 2]] },
  { id: 'V', color: '#60A5FA', cells: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]] },
  { id: 'W', color: '#C084FC', cells: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]] },
  { id: 'Y', color: '#F472B6', cells: [[0, 1], [1, 0], [1, 1], [2, 1], [3, 1]] },
  { id: 'H', color: '#FB923C', cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]] },
]

function normalize(cells: [number, number][]): [number, number][] {
  const minR = Math.min(...cells.map((c) => c[0]))
  const minC = Math.min(...cells.map((c) => c[1]))
  return cells
    .map(([r, c]): [number, number] => [r - minR, c - minC])
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
}

function rotate90(cells: [number, number][]): [number, number][] {
  return normalize(cells.map(([r, c]): [number, number] => [c, -r]))
}

function reflectShape(cells: [number, number][]): [number, number][] {
  return normalize(cells.map(([r, c]): [number, number] => [r, -c]))
}

/** The piece's shape at a given rotation (0-3, 90 degrees each) and flip state. */
export function getOrientedShape(piece: Piece, rotation: number, flipped: boolean): [number, number][] {
  let shape = normalize(piece.cells)
  if (flipped) shape = reflectShape(shape)
  const steps = ((rotation % 4) + 4) % 4
  for (let i = 0; i < steps; i++) shape = rotate90(shape)
  return shape
}

export type Orientation = { rotation: number, flipped: boolean }

export type PlacedPiece = {
  pieceId: string
  orientation: Orientation
  anchorRow: number
  anchorCol: number
  cells: number[]
}

/** Cells the piece would occupy anchored with its bounding-box top-left at (row, col); null if any cell falls outside the board. */
export function placementCells(shape: [number, number][], row: number, col: number): number[] | null {
  const cells: number[] = []
  for (const [dr, dc] of shape) {
    const r = row + dr, c = col + dc
    if (r < 0 || r >= BOARD_ROWS || c < 0 || c >= BOARD_COLS) return null
    cells.push(cellIndex(r, c))
  }
  return cells
}

export function isPlacementValid(
  cells: number[],
  excludedCells: Set<number>,
  occupied: Map<number, string>,
): boolean {
  for (const cell of cells) {
    if (boardLabels[cell].type === 'invalid') return false
    if (excludedCells.has(cell)) return false
    if (occupied.has(cell)) return false
  }
  return true
}

export function isSolved(placed: PlacedPiece[], excludedCells: Set<number>): boolean {
  if (placed.length !== PIECES.length) return false
  const covered = new Set<number>()
  for (const p of placed) for (const c of p.cells) covered.add(c)
  for (const cell of validCells) {
    if (excludedCells.has(cell)) continue
    if (!covered.has(cell)) return false
  }
  return true
}

// ---------- Exact-cover solver (used by the Solve button) ----------
function allOrientedShapes(piece: Piece): [number, number][][] {
  const seen = new Map<string, [number, number][]>()
  for (const flipped of [false, true]) {
    for (let rotation = 0; rotation < 4; rotation++) {
      const shape = getOrientedShape(piece, rotation, flipped)
      const key = shape.map(([r, c]) => `${r},${c}`).join(';')
      if (!seen.has(key)) seen.set(key, shape)
    }
  }
  return Array.from(seen.values())
}

type Placement = { cells: number[], orientation: Orientation, anchorRow: number, anchorCol: number }

function allPlacementsForPiece(piece: Piece): Placement[] {
  const placements: Placement[] = []
  for (const flipped of [false, true]) {
    for (let rotation = 0; rotation < 4; rotation++) {
      const shape = getOrientedShape(piece, rotation, flipped)
      for (let row = 0; row < BOARD_ROWS; row++) {
        for (let col = 0; col < BOARD_COLS; col++) {
          const cells = placementCells(shape, row, col)
          if (!cells) continue
          if (cells.some((c) => boardLabels[c].type === 'invalid')) continue
          placements.push({ cells, orientation: { rotation, flipped }, anchorRow: row, anchorCol: col })
        }
      }
    }
  }
  return placements
}

let placementsCache: Placement[][] | null = null
function getAllPlacements(): Placement[][] {
  if (!placementsCache) placementsCache = PIECES.map((p) => allPlacementsForPiece(p))
  return placementsCache
}

/** Finds one valid arrangement covering every valid cell except the excluded (month, day) pair. */
export function solve(excludedCells: Set<number>): PlacedPiece[] | null {
  const target = new Set(validCells.filter((c) => !excludedCells.has(c)))
  const allPlacements = getAllPlacements()

  const cellOptions = new Map<number, { pieceIdx: number, placement: Placement }[]>()
  for (const cell of Array.from(target)) cellOptions.set(cell, [])
  allPlacements.forEach((placements, pieceIdx) => {
    for (const placement of placements) {
      if (placement.cells.every((c) => target.has(c))) {
        for (const c of placement.cells) {
          cellOptions.get(c)?.push({ pieceIdx, placement })
        }
      }
    }
  })

  const covered = new Set<number>()
  const usedPiece = new Array(PIECES.length).fill(false)
  const chosen: (Placement | null)[] = new Array(PIECES.length).fill(null)

  function pickCell(): { cell: number, options: { pieceIdx: number, placement: Placement }[] } | null {
    let best: { cell: number, options: { pieceIdx: number, placement: Placement }[] } | null = null
    let bestCount = Infinity
    for (const cell of Array.from(target)) {
      if (covered.has(cell)) continue
      const options = (cellOptions.get(cell) ?? []).filter(
        ({ pieceIdx, placement }) => !usedPiece[pieceIdx] && placement.cells.every((c) => !covered.has(c)),
      )
      if (options.length < bestCount) {
        bestCount = options.length
        best = { cell, options }
        if (bestCount === 0) return best
      }
    }
    return best
  }

  function backtrack(): boolean {
    const pick = pickCell()
    if (!pick) return true
    if (pick.options.length === 0) return false
    for (const { pieceIdx, placement } of pick.options) {
      usedPiece[pieceIdx] = true
      chosen[pieceIdx] = placement
      for (const c of placement.cells) covered.add(c)
      if (backtrack()) return true
      usedPiece[pieceIdx] = false
      chosen[pieceIdx] = null
      for (const c of placement.cells) covered.delete(c)
    }
    return false
  }

  if (!backtrack()) return null

  return PIECES.map((piece, idx) => {
    const placement = chosen[idx]
    if (!placement) throw new Error('unreachable: missing placement after successful solve')
    return {
      pieceId: piece.id,
      orientation: placement.orientation,
      anchorRow: placement.anchorRow,
      anchorCol: placement.anchorCol,
      cells: placement.cells,
    }
  })
}
