import type { GridDifficulty } from './gridPuzzle'

/**
 * A center is a point on the doubled (track) coordinate grid, ranging over
 * [0, 2*size - 2] on each axis: even values line up with a cell row/col,
 * odd values sit on the edge between two cells. This lets a galaxy's center
 * be a cell, an edge midpoint, or a 4-way corner, all with the same math.
 */
export type GalaxiesCenter = { row: number, col: number }

export type GalaxiesPuzzle = {
  id: string
  difficulty: GridDifficulty
  size: number
  centers: GalaxiesCenter[]
  regions: number[]
}

export function cellIndex(row: number, col: number, size: number): number {
  return row * size + col
}

export function cellRow(index: number, size: number): number {
  return Math.floor(index / size)
}

export function cellCol(index: number, size: number): number {
  return index % size
}

export function hWallKey(row: number, col: number): string {
  return `h:${row}:${col}`
}

export function vWallKey(row: number, col: number): string {
  return `v:${row}:${col}`
}

function solutionHasHWall(regions: number[], size: number, row: number, col: number): boolean {
  return regions[cellIndex(row, col, size)] !== regions[cellIndex(row + 1, col, size)]
}

function solutionHasVWall(regions: number[], size: number, row: number, col: number): boolean {
  return regions[cellIndex(row, col, size)] !== regions[cellIndex(row, col + 1, size)]
}

/**
 * The player only ever draws walls; a puzzle is solved once the drawn walls
 * separate exactly the cells that belong to different regions in the solution.
 */
export function isSolved(walls: Set<string>, puzzle: GalaxiesPuzzle): boolean {
  const { size, regions } = puzzle
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r < size - 1 && walls.has(hWallKey(r, c)) !== solutionHasHWall(regions, size, r, c)) return false
      if (c < size - 1 && walls.has(vWallKey(r, c)) !== solutionHasVWall(regions, size, r, c)) return false
    }
  }
  return true
}

/** Walls the player placed that don't belong in the solution. */
export function findWrongWalls(walls: Set<string>, puzzle: GalaxiesPuzzle): Set<string> {
  const wrong = new Set<string>()
  const { size, regions } = puzzle
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r < size - 1) {
        const key = hWallKey(r, c)
        if (walls.has(key) && !solutionHasHWall(regions, size, r, c)) wrong.add(key)
      }
      if (c < size - 1) {
        const key = vWallKey(r, c)
        if (walls.has(key) && !solutionHasVWall(regions, size, r, c)) wrong.add(key)
      }
    }
  }
  return wrong
}

export function solutionWalls(puzzle: GalaxiesPuzzle): Set<string> {
  const walls = new Set<string>()
  const { size, regions } = puzzle
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (r < size - 1 && solutionHasHWall(regions, size, r, c)) walls.add(hWallKey(r, c))
      if (c < size - 1 && solutionHasVWall(regions, size, r, c)) walls.add(vWallKey(r, c))
    }
  }
  return walls
}

export function regionColor(regionId: number, regionCount: number): string {
  const hue = Math.round((regionId * 360) / regionCount)
  return `hsla(${hue}, 70%, 55%, 0.22)`
}
