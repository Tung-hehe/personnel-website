import type { GridDifficulty } from './gridPuzzle'

export type SlitherlinkPuzzle = {
  id: string
  difficulty: GridDifficulty
  size: number
  /** length size*size, row-major; -1 = no clue, 0-4 = required edge count around the cell */
  clues: number[]
  /** edge keys that are part of the solution loop */
  solution: string[]
}

export const NO_CLUE = -1

export function cellIndex(row: number, col: number, size: number): number {
  return row * size + col
}

export function cellRow(index: number, size: number): number {
  return Math.floor(index / size)
}

export function cellCol(index: number, size: number): number {
  return index % size
}

/** Horizontal edge between vertex(row,col) and vertex(row,col+1). */
export function hEdgeKey(row: number, col: number): string {
  return `h:${row}:${col}`
}

/** Vertical edge between vertex(row,col) and vertex(row+1,col). */
export function vEdgeKey(row: number, col: number): string {
  return `v:${row}:${col}`
}

/** The 4 edges surrounding cell (row, col). */
export function cellEdges(row: number, col: number): [string, string, string, string] {
  return [hEdgeKey(row, col), hEdgeKey(row + 1, col), vEdgeKey(row, col), vEdgeKey(row, col + 1)]
}

/** The up-to-4 edges meeting at vertex (row, col) on a `size`x`size` cell grid. */
export function vertexEdges(row: number, col: number, size: number): string[] {
  const edges: string[] = []
  if (col - 1 >= 0) edges.push(hEdgeKey(row, col - 1))
  if (col < size) edges.push(hEdgeKey(row, col))
  if (row - 1 >= 0) edges.push(vEdgeKey(row - 1, col))
  if (row < size) edges.push(vEdgeKey(row, col))
  return edges
}

export function isSolved(edges: Set<string>, puzzle: SlitherlinkPuzzle): boolean {
  if (edges.size !== puzzle.solution.length) return false
  for (const key of puzzle.solution) if (!edges.has(key)) return false
  return true
}

/** Edges the player drew that aren't part of the solution loop. */
export function findWrongEdges(edges: Set<string>, puzzle: SlitherlinkPuzzle): Set<string> {
  const solutionSet = new Set(puzzle.solution)
  const wrong = new Set<string>()
  Array.from(edges).forEach((key) => { if (!solutionSet.has(key)) wrong.add(key) })
  return wrong
}

/**
 * Cells whose drawn-edge count already exceeds their clue, and vertices
 * touched by more than 2 drawn edges: both are unambiguous mistakes that
 * can be flagged without revealing the solution.
 */
export function findConflicts(edges: Set<string>, puzzle: SlitherlinkPuzzle): { cells: Set<number>, edges: Set<string> } {
  const { size, clues } = puzzle
  const conflictCells = new Set<number>()
  const conflictEdges = new Set<string>()

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const clue = clues[cellIndex(r, c, size)]
      if (clue === NO_CLUE) continue
      const es = cellEdges(r, c)
      const count = es.filter((e) => edges.has(e)).length
      if (count > clue) {
        conflictCells.add(cellIndex(r, c, size))
        for (const e of es) if (edges.has(e)) conflictEdges.add(e)
      }
    }
  }

  for (let r = 0; r <= size; r++) {
    for (let c = 0; c <= size; c++) {
      const es = vertexEdges(r, c, size).filter((e) => edges.has(e))
      if (es.length > 2) for (const e of es) conflictEdges.add(e)
    }
  }

  return { cells: conflictCells, edges: conflictEdges }
}

export function solutionEdgeSet(puzzle: SlitherlinkPuzzle): Set<string> {
  return new Set(puzzle.solution)
}
