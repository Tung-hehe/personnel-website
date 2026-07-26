export type GridDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type GridPuzzle = {
  id: string
  difficulty: GridDifficulty
  size: number
  puzzle: number[]
  solution: number[]
}

export const gridDifficulties: GridDifficulty[] = ['easy', 'medium', 'hard', 'expert']

export const EMPTY_CELL = -1

export function cellRow(index: number, size: number): number {
  return Math.floor(index / size)
}

export function cellCol(index: number, size: number): number {
  return index % size
}

export function isBoardFilled(board: number[]): boolean {
  return board.every((v) => v !== EMPTY_CELL)
}

export function isBoardSolved(board: number[], solution: number[]): boolean {
  return board.every((v, i) => v === solution[i])
}

/**
 * Flags every cell involved in a rule violation: a run of more than
 * `symbolCount` identical values in a row/col, a symbol appearing more than
 * `size / symbolCount` times in a row/col, or (when `requireUnique`) a row or
 * column that duplicates another one once both are fully filled.
 */
export function findConflicts(
  board: number[],
  size: number,
  symbolCount: number,
  requireUnique: boolean,
): Set<number> {
  const conflicts = new Set<number>()
  const window = symbolCount + 1
  const limit = size / symbolCount

  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - window; c++) {
      const v = board[r * size + c]
      if (v === EMPTY_CELL) continue
      let allEqual = true
      for (let k = 1; k < window; k++) {
        if (board[r * size + c + k] !== v) { allEqual = false; break }
      }
      if (allEqual) {
        for (let k = 0; k < window; k++) conflicts.add(r * size + c + k)
      }
    }
  }

  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - window; r++) {
      const v = board[r * size + c]
      if (v === EMPTY_CELL) continue
      let allEqual = true
      for (let k = 1; k < window; k++) {
        if (board[(r + k) * size + c] !== v) { allEqual = false; break }
      }
      if (allEqual) {
        for (let k = 0; k < window; k++) conflicts.add((r + k) * size + c)
      }
    }
  }

  for (let r = 0; r < size; r++) {
    const idxBySymbol: number[][] = Array.from({ length: symbolCount }, () => [])
    for (let c = 0; c < size; c++) {
      const v = board[r * size + c]
      if (v !== EMPTY_CELL) idxBySymbol[v].push(r * size + c)
    }
    for (const idxs of idxBySymbol) {
      if (idxs.length > limit) idxs.forEach((i) => conflicts.add(i))
    }
  }

  for (let c = 0; c < size; c++) {
    const idxBySymbol: number[][] = Array.from({ length: symbolCount }, () => [])
    for (let r = 0; r < size; r++) {
      const v = board[r * size + c]
      if (v !== EMPTY_CELL) idxBySymbol[v].push(r * size + c)
    }
    for (const idxs of idxBySymbol) {
      if (idxs.length > limit) idxs.forEach((i) => conflicts.add(i))
    }
  }

  if (requireUnique) {
    const rowGroups = new Map<string, number[]>()
    for (let r = 0; r < size; r++) {
      const vals = board.slice(r * size, r * size + size)
      if (vals.includes(EMPTY_CELL)) continue
      const key = vals.join(',')
      if (!rowGroups.has(key)) rowGroups.set(key, [])
      rowGroups.get(key)!.push(r)
    }
    for (const rows of Array.from(rowGroups.values())) {
      if (rows.length > 1) {
        for (const r of rows) for (let c = 0; c < size; c++) conflicts.add(r * size + c)
      }
    }

    const colGroups = new Map<string, number[]>()
    for (let c = 0; c < size; c++) {
      const vals: number[] = []
      for (let r = 0; r < size; r++) vals.push(board[r * size + c])
      if (vals.includes(EMPTY_CELL)) continue
      const key = vals.join(',')
      if (!colGroups.has(key)) colGroups.set(key, [])
      colGroups.get(key)!.push(c)
    }
    for (const cols of Array.from(colGroups.values())) {
      if (cols.length > 1) {
        for (const c of cols) for (let r = 0; r < size; r++) conflicts.add(r * size + c)
      }
    }
  }

  return conflicts
}
