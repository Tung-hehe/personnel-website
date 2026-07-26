'use client'

import { useEffect, useState } from 'react'

import sudokuPuzzles from '@/data/games/sudokuPuzzles'
import { LocaleType, sudokuConfig } from '@/data/config'
import { SudokuBoard } from './SudokuBoard'
import { SudokuLevelSelect } from './SudokuLevelSelect'

const STORAGE_KEY = 'sudoku-completed-levels'

export function SudokuGame({ locale }: { locale: LocaleType }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setCompleted(JSON.parse(raw))
    } catch {
      // localStorage unavailable, ignore
    }
  }, [])

  function markCompleted(id: string) {
    setCompleted((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // localStorage unavailable, ignore
      }
      return next
    })
  }

  const selectedPuzzle = sudokuPuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {sudokuConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <SudokuBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <SudokuLevelSelect
            puzzles={sudokuPuzzles}
            completed={completed}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
