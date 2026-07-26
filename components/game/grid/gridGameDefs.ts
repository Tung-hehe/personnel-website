export type GridGameDef = {
  symbolCount: number
  requireUnique: boolean
  symbols: string[]
  symbolColors: string[]
}

export const binoxDef: GridGameDef = {
  symbolCount: 2,
  requireUnique: true,
  symbols: ['X', 'O'],
  symbolColors: ['text-primary', 'text-amber-400'],
}

export const troixDef: GridGameDef = {
  symbolCount: 3,
  requireUnique: false,
  symbols: ['X', 'O', 'I'],
  symbolColors: ['text-primary', 'text-amber-400', 'text-emerald-400'],
}
