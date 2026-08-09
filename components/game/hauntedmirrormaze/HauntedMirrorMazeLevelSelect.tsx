import { LocaleType, hauntedMirrorMazeConfig } from '@/data/config'
import { hauntedMirrorMazeDifficulties } from '@/utils/hauntedMirrorMaze'
import type { HauntedMirrorMazePuzzle } from '@/utils/hauntedMirrorMaze'
import { LevelSelectLayout } from '@/components/game/LevelSelectLayout'

type HauntedMirrorMazeLevelSelectProps = {
  puzzles: HauntedMirrorMazePuzzle[]
  completed: string[]
  locale: LocaleType
  onSelect: (id: string) => void
}

export function HauntedMirrorMazeLevelSelect({ puzzles, completed, locale, onSelect }: HauntedMirrorMazeLevelSelectProps) {
  return (
    <LevelSelectLayout
      puzzles={puzzles}
      completed={completed}
      locale={locale}
      config={hauntedMirrorMazeConfig}
      difficulties={hauntedMirrorMazeDifficulties}
      onSelect={onSelect}
      getSubtitle={(puzzle) => {
        const clueCount = puzzle.clues.top.filter((v) => v !== null).length
          + puzzle.clues.bottom.filter((v) => v !== null).length
          + puzzle.clues.left.filter((v) => v !== null).length
          + puzzle.clues.right.filter((v) => v !== null).length
        return `${puzzle.size}x${puzzle.size}, ${clueCount} ${hauntedMirrorMazeConfig.clues[locale]}`
      }}
    />
  )
}
