import type { SudokuDifficulty } from '@/utils/sudoku'

export const difficultyTheme: {[key in SudokuDifficulty]: {
  text: string,
  border: string,
  borderMuted: string,
  bg: string,
  dot: string,
  ring: string,
}} = {
  easy: {
    text: 'text-emerald-400',
    border: 'border-emerald-400',
    borderMuted: 'border-emerald-400/30',
    bg: 'bg-emerald-400/10',
    dot: 'bg-emerald-400',
    ring: 'hover:border-emerald-400',
  },
  medium: {
    text: 'text-sky-400',
    border: 'border-sky-400',
    borderMuted: 'border-sky-400/30',
    bg: 'bg-sky-400/10',
    dot: 'bg-sky-400',
    ring: 'hover:border-sky-400',
  },
  hard: {
    text: 'text-amber-400',
    border: 'border-amber-400',
    borderMuted: 'border-amber-400/30',
    bg: 'bg-amber-400/10',
    dot: 'bg-amber-400',
    ring: 'hover:border-amber-400',
  },
  expert: {
    text: 'text-rose-400',
    border: 'border-rose-400',
    borderMuted: 'border-rose-400/30',
    bg: 'bg-rose-400/10',
    dot: 'bg-rose-400',
    ring: 'hover:border-rose-400',
  },
}
