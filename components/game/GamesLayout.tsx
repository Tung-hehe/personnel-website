import { gamesConfig, LocaleType } from '@/data/config'
import { GameCard } from './GameCard'

import type { Game } from '@/data/games'

export function GamesLayout({ games, locale }: {games: Game[], locale: LocaleType}) {
  return (
    <div className="divide-y divide-gray-700">
      <header className="space-y-4 pt-6 md:space-y-3">
        <h1
          className="
            text-4xl font-extrabold leading-9 tracking-tight
            text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-12
          "
        >
          {gamesConfig.title[locale]}
        </h1>
        <p className="text-gray-400">{gamesConfig.subtitle[locale]}</p>
      </header>
      <div className="container py-8">
        {
          games.length > 0
          ? <div className="-m-4 flex flex-wrap">
            {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  locale={locale}
                />
              ))
            }
          </div>
          : gamesConfig.noGame[locale]
        }
      </div>
    </div>
  )
}
