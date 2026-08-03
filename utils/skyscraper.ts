export type SkyscraperDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type SkyscraperClues = {
  top: (number | null)[]
  bottom: (number | null)[]
  left: (number | null)[]
  right: (number | null)[]
}

export type SkyscraperPuzzle = {
  id: string
  difficulty: SkyscraperDifficulty
  size: number
  clues: SkyscraperClues
  puzzle: number[]
  solution: number[]
}

export const EMPTY_CELL = 0

export const skyscraperDifficulties: SkyscraperDifficulty[] = ['easy', 'medium', 'hard', 'expert']

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

export function visibleCount(line: number[]): number {
  let count = 0
  let max = 0
  for (const h of line) { if (h > max) { count++; max = h } }
  return count
}

/**
 * Flags every cell that duplicates another value in its row or column
 * (a partial Latin square violation), the same way sudoku peer conflicts work.
 */
export function findConflicts(board: number[], size: number): Set<number> {
  const conflicts = new Set<number>()
  for (let r = 0; r < size; r++) {
    const seen = new Map<number, number[]>()
    for (let c = 0; c < size; c++) {
      const idx = r * size + c
      const v = board[idx]
      if (v === EMPTY_CELL) continue
      if (!seen.has(v)) seen.set(v, [])
      seen.get(v)!.push(idx)
    }
    for (const idxs of Array.from(seen.values())) {
      if (idxs.length > 1) idxs.forEach((i) => conflicts.add(i))
    }
  }
  for (let c = 0; c < size; c++) {
    const seen = new Map<number, number[]>()
    for (let r = 0; r < size; r++) {
      const idx = r * size + c
      const v = board[idx]
      if (v === EMPTY_CELL) continue
      if (!seen.has(v)) seen.set(v, [])
      seen.get(v)!.push(idx)
    }
    for (const idxs of Array.from(seen.values())) {
      if (idxs.length > 1) idxs.forEach((i) => conflicts.add(i))
    }
  }
  return conflicts
}
