'use client'

import { useEffect, useState } from 'react'

import troixPuzzles from '@/data/games/troixPuzzles'
import { LocaleType, troixConfig } from '@/data/config'
import { GridPuzzleBoard } from './GridPuzzleBoard'
import { GridLevelSelect } from './GridLevelSelect'
import { troixDef } from './gridGameDefs'

const STORAGE_KEY = 'troix-completed-levels'

export function TroixGame({ locale }: { locale: LocaleType }) {
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

  const selectedPuzzle = troixPuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {troixConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <GridPuzzleBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            def={troixDef}
            config={troixConfig}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <GridLevelSelect
            puzzles={troixPuzzles}
            completed={completed}
            config={troixConfig}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
