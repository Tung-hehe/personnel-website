'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import binoxPuzzles from '@/data/games/binoxPuzzles'
import { LocaleType, binoxConfig } from '@/data/config'
import { BoardLoading } from '@/components/game/BoardLoading'
import { GridLevelSelect } from './GridLevelSelect'
import { binoxDef } from './gridGameDefs'

const GridPuzzleBoard = dynamic(
  () => import('./GridPuzzleBoard').then((m) => m.GridPuzzleBoard),
  { loading: () => <BoardLoading />, ssr: false },
)

const STORAGE_KEY = 'binox-completed-levels'

export function BinoxGame({ locale }: { locale: LocaleType }) {
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

  // Warm the Board chunk while the player is still browsing levels, so
  // selecting one doesn't add a network round trip on top of rendering it.
  useEffect(() => {
    import('./GridPuzzleBoard')
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

  const selectedPuzzle = binoxPuzzles.find((p) => p.id === selectedId) ?? null

  return (
    <div className="pt-6">
      <h1 className="mb-6 text-4xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl sm:leading-10">
        {binoxConfig.title[locale]}
      </h1>
      {
        selectedPuzzle
        ? <GridPuzzleBoard
            key={selectedPuzzle.id}
            puzzle={selectedPuzzle}
            def={binoxDef}
            config={binoxConfig}
            locale={locale}
            onComplete={() => markCompleted(selectedPuzzle.id)}
            onBack={() => setSelectedId(null)}
          />
        : <GridLevelSelect
            puzzles={binoxPuzzles}
            completed={completed}
            config={binoxConfig}
            locale={locale}
            onSelect={setSelectedId}
          />
      }
    </div>
  )
}
