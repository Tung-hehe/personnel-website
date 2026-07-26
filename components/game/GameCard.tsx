import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'

import { gamesConfig, LocaleType } from '@/data/config'
import type { Game } from '@/data/games'

type GameCardProps = {
  game: Game
  locale: LocaleType
}

export function GameCard({ game, locale }: GameCardProps) {
  return (
    <div className="p-4 md:w-1/2">
      <div
        className="
          group flex h-full flex-col overflow-hidden rounded-xl border border-gray-700
          bg-primary-dark/10 transition-all duration-200
          hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-black/30
        "
      >
        <Link href={game.href} className="relative block h-36 overflow-hidden lg:h-48">
          <Image
            alt={game.title[locale]}
            title={game.title[locale]}
            src={game.imgSrc}
            fill
            unoptimized
            priority
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex grow flex-col justify-between p-6">
          <div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              <Link href={game.href} className="hover:text-primary">{game.title[locale]}</Link>
            </h2>
            <p className="prose mb-2 text-gray-400">{game.description[locale]}</p>
          </div>
          <Link
            href={game.href}
            className="
              inline-flex w-fit items-center gap-1.5 rounded-full border border-primary
              px-4 py-1.5 font-medium text-primary transition-colors
              hover:bg-primary hover:text-background
            "
          >
            <Play size={14} fill="currentColor" /> {gamesConfig.play[locale]}
          </Link>
        </div>
      </div>
    </div>
  )
}
