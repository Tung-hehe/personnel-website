import type { GridDifficulty } from './gridPuzzle'

export type StarBattlePuzzle = {
  id: string
  difficulty: GridDifficulty
  size: number
  regions: number[]
  solution: number[]
}

export const CELL_EMPTY = 0
export const CELL_STAR = 1
export const CELL_MARK = 2

export function cellRow(index: number, size: number): number {
  return Math.floor(index / size)
}

export function cellCol(index: number, size: number): number {
  return index % size
}

export function isSolved(board: number[], solution: number[]): boolean {
  return board.every((v, i) => (v === CELL_STAR ? 1 : 0) === solution[i])
}

/**
 * Flags every star cell that breaks a rule: two stars touching (including
 * diagonally), or more than one star in the same row, column or region.
 */
export function findConflicts(board: number[], regions: number[], size: number): Set<number> {
  const conflicts = new Set<number>()
  const stars: number[] = []
  for (let i = 0; i < board.length; i++) if (board[i] === CELL_STAR) stars.push(i)

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const a = stars[i]
      const b = stars[j]
      const ar = cellRow(a, size)
      const ac = cellCol(a, size)
      const br = cellRow(b, size)
      const bc = cellCol(b, size)
      if (Math.abs(ar - br) <= 1 && Math.abs(ac - bc) <= 1) {
        conflicts.add(a)
        conflicts.add(b)
      }
    }
  }

  const byRow = new Map<number, number[]>()
  const byCol = new Map<number, number[]>()
  const byRegion = new Map<number, number[]>()
  for (const idx of stars) {
    const r = cellRow(idx, size)
    const c = cellCol(idx, size)
    const g = regions[idx]
    if (!byRow.has(r)) byRow.set(r, [])
    if (!byCol.has(c)) byCol.set(c, [])
    if (!byRegion.has(g)) byRegion.set(g, [])
    byRow.get(r)!.push(idx)
    byCol.get(c)!.push(idx)
    byRegion.get(g)!.push(idx)
  }
  for (const group of Array.from(byRow.values())) if (group.length > 1) group.forEach((i) => conflicts.add(i))
  for (const group of Array.from(byCol.values())) if (group.length > 1) group.forEach((i) => conflicts.add(i))
  for (const group of Array.from(byRegion.values())) if (group.length > 1) group.forEach((i) => conflicts.add(i))

  return conflicts
}

export function regionColor(regionId: number, regionCount: number): string {
  const hue = Math.round((regionId * 360) / regionCount)
  return `hsla(${hue}, 70%, 55%, 0.22)`
}

export function regionBorderColor(regionId: number, regionCount: number): string {
  const hue = Math.round((regionId * 360) / regionCount)
  return `hsla(${hue}, 70%, 65%, 0.6)`
}
