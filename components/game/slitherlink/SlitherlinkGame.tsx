'use client'

import { useEffect, useState } from 'react'

import slitherlinkPuzzles from '@/data/games/slitherlinkPuzzles'
import { LocaleType, slitherlinkConfig } from '@/data/config'
import { SlitherlinkBoard } from './SlitherlinkBoard'
import { SlitherlinkLevelSelect } from './SlitherlinkLevelSelect'

const STORAGE_KEY = 'slitherlink-completed-levels'

export function SlitherlinkGame({ locale }: { locale: LocaleType }) {
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

  const selectedPuzzle = slitherlinkPuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {slitherlinkConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <SlitherlinkBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            config={slitherlinkConfig}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <SlitherlinkLevelSelect
            puzzles={slitherlinkPuzzles}
            completed={completed}
            config={slitherlinkConfig}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
