import { LocaleType, skyscraperConfig } from '@/data/config'
import { skyscraperDifficulties } from '@/utils/skyscraper'
import type { SkyscraperPuzzle } from '@/utils/skyscraper'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type SkyscraperLevelSelectProps = {
  puzzles: SkyscraperPuzzle[]
  completed: string[]
  locale: LocaleType
  onSelect: (id: string) => void
}

export function SkyscraperLevelSelect({ puzzles, completed, locale, onSelect }: SkyscraperLevelSelectProps) {
  return (
    <LevelSelectLayout
      puzzles={puzzles}
      completed={completed}
      locale={locale}
      config={skyscraperConfig}
      difficulties={skyscraperDifficulties}
      onSelect={onSelect}
      getSubtitle={(puzzle) => {
        const clueCount = puzzle.clues.top.filter((v) => v !== null).length
          + puzzle.clues.bottom.filter((v) => v !== null).length
          + puzzle.clues.left.filter((v) => v !== null).length
          + puzzle.clues.right.filter((v) => v !== null).length
        return `${puzzle.size}x${puzzle.size}, ${clueCount} ${skyscraperConfig.clues[locale]}`
      }}
    />
  )
}
