'use client'

import { useEffect, useState } from 'react'

import galaxiesPuzzles from '@/data/games/galaxiesPuzzles'
import { LocaleType, galaxiesConfig } from '@/data/config'
import { GalaxiesBoard } from './GalaxiesBoard'
import { GalaxiesLevelSelect } from './GalaxiesLevelSelect'

const STORAGE_KEY = 'galaxies-completed-levels'

export function GalaxiesGame({ locale }: { locale: LocaleType }) {
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

  const selectedPuzzle = galaxiesPuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {galaxiesConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <GalaxiesBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            config={galaxiesConfig}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <GalaxiesLevelSelect
            puzzles={galaxiesPuzzles}
            completed={completed}
            config={galaxiesConfig}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
