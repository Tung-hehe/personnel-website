export type SudokuDifficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type SudokuPuzzle = {
  id: string
  difficulty: SudokuDifficulty
  puzzle: number[]
  solution: number[]
}

export type SudokuBoard = number[]

export function emptyMask(size: number): boolean[] {
  return new Array(size).fill(false)
}

export function cellRow(index: number): number {
  return Math.floor(index / 9)
}

export function cellCol(index: number): number {
  return index % 9
}

export function cellBox(index: number): number {
  return Math.floor(cellRow(index) / 3) * 3 + Math.floor(cellCol(index) / 3)
}

export function peersOf(index: number): number[] {
  const row = cellRow(index)
  const col = cellCol(index)
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  const peers = new Set<number>()
  for (let k = 0; k < 9; k++) {
    peers.add(row * 9 + k)
    peers.add(k * 9 + col)
  }
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      peers.add(r * 9 + c)
    }
  }
  peers.delete(index)
  return Array.from(peers)
}

const PEERS_CACHE: number[][] = Array.from({ length: 81 }, (_, i) => peersOf(i))

export function findConflicts(board: SudokuBoard): Set<number> {
  const conflicts = new Set<number>()
  for (let i = 0; i < 81; i++) {
    if (board[i] === 0) continue
    for (const p of PEERS_CACHE[i]) {
      if (board[p] === board[i]) {
        conflicts.add(i)
        conflicts.add(p)
      }
    }
  }
  return conflicts
}

export function isBoardFilled(board: SudokuBoard): boolean {
  return board.every((v) => v !== 0)
}

export function isBoardSolved(board: SudokuBoard, solution: SudokuBoard): boolean {
  return board.every((v, i) => v === solution[i])
}

export const sudokuDifficulties: SudokuDifficulty[] = ['easy', 'medium', 'hard', 'expert']
