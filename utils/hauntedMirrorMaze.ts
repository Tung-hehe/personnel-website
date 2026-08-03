export type HauntedMirrorMazeDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

// Monster types: 0 = vampire, 1 = ghost, 2 = zombie.
export const VAMPIRE = 0
export const GHOST = 1
export const ZOMBIE = 2

// Mirror types: 0 = '\', 1 = '/'.
export type MirrorType = 0 | 1

export type HauntedMirrorMazeClues = {
  top: (number | null)[]
  bottom: (number | null)[]
  left: (number | null)[]
  right: (number | null)[]
}

export type HauntedMirrorMazePuzzle = {
  id: string
  difficulty: HauntedMirrorMazeDifficulty
  size: number
  mirrors: (MirrorType | null)[]
  clues: HauntedMirrorMazeClues
  puzzle: number[]
  solution: number[]
}

export const EMPTY_CELL = -1

export const hauntedMirrorMazeDifficulties: HauntedMirrorMazeDifficulty[] = ['easy', 'medium', 'hard', 'expert']

export function cellRow(index: number, size: number): number {
  return Math.floor(index / size)
}

export function cellCol(index: number, size: number): number {
  return index % size
}

export function isBoardFilled(board: number[], mirrors: (MirrorType | null)[]): boolean {
  return board.every((v, i) => mirrors[i] != null || v !== EMPTY_CELL)
}

export function isBoardSolved(board: number[], solution: number[], mirrors: (MirrorType | null)[]): boolean {
  return board.every((v, i) => mirrors[i] != null || v === solution[i])
}

/**
 * Walks a sight line through the maze, bending 90° at every mirror it crosses,
 * until it exits the grid. Returns the non-mirror cells seen before the first
 * mirror (H, "head-on") and after (R, "reflected").
 */
export type SightLine = { H: number[], R: number[], mirrorPath: number[] }

export function traceLine(
  startRow: number,
  startCol: number,
  dr: number,
  dc: number,
  mirrors: (MirrorType | null)[],
  size: number,
): SightLine {
  let r = startRow
  let c = startCol
  let seenMirror = false
  const H: number[] = []
  const R: number[] = []
  const mirrorPath: number[] = []
  while (r >= 0 && r < size && c >= 0 && c < size) {
    const idx = r * size + c
    const mirror = mirrors[idx]
    if (mirror != null) {
      seenMirror = true
      mirrorPath.push(idx)
      if (mirror === 0) { const t = dr; dr = dc; dc = t }
      else { const t = dr; dr = -dc; dc = -t }
    } else {
      (seenMirror ? R : H).push(idx)
    }
    r += dr
    c += dc
  }
  return { H, R, mirrorPath }
}

export function sightLineCells(
  direction: 'top' | 'bottom' | 'left' | 'right',
  idx: number,
  mirrors: (MirrorType | null)[],
  size: number,
): SightLine {
  if (direction === 'top') return traceLine(0, idx, 1, 0, mirrors, size)
  if (direction === 'bottom') return traceLine(size - 1, idx, -1, 0, mirrors, size)
  if (direction === 'left') return traceLine(idx, 0, 0, 1, mirrors, size)
  return traceLine(idx, size - 1, 0, -1, mirrors, size)
}

/** Visible-monster count for a traced sight line, given the current board values. */
export function lineVisibleCount(seg: { H: number[], R: number[] }, board: number[]): number {
  let count = 0
  for (const idx of seg.H) { const t = board[idx]; if (t === VAMPIRE || t === ZOMBIE) count++ }
  for (const idx of seg.R) { const t = board[idx]; if (t === GHOST || t === ZOMBIE) count++ }
  return count
}
