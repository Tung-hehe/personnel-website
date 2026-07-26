'use client'

import { useEffect, useState } from 'react'

import starBattlePuzzles from '@/data/games/starBattlePuzzles'
import { LocaleType, starBattleConfig } from '@/data/config'
import { StarBattleBoard } from './StarBattleBoard'
import { StarBattleLevelSelect } from './StarBattleLevelSelect'

const STORAGE_KEY = 'star-battle-completed-levels'

export function StarBattleGame({ locale }: { locale: LocaleType }) {
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

  const selectedPuzzle = starBattlePuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {starBattleConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <StarBattleBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            config={starBattleConfig}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <StarBattleLevelSelect
            puzzles={starBattlePuzzles}
            completed={completed}
            config={starBattleConfig}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
