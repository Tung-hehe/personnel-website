import { LocaleType } from '../config'

export type Game = {
  id: string,
  title: {[locale: LocaleType]: string},
  description: {[locale: LocaleType]: string},
  imgSrc: string,
  href: string,
}

const gamesData: Game[] = [
  {
    id: 'sudoku',
    title: {vi: 'Sudoku', en: 'Sudoku'},
    description: {
      vi: '20 màn chơi Sudoku với 4 mức độ khó, từ Dễ đến Rất khó. Câu đố được sinh tự động, luôn có nghiệm duy nhất.',
      en: '20 Sudoku puzzles across 4 difficulty levels, from Easy to Expert. Auto-generated puzzles, each with a unique solution.',
    },
    imgSrc: '/games/sudoku.svg',
    href: '/game/sudoku',
  },
  {
    id: 'binox',
    title: {vi: 'Binox', en: 'Binox'},
    description: {
      vi: '20 màn chơi Binox (giống Binairo/Takuzu): điền X và O sao cho mỗi hàng, cột cân bằng và không hàng/cột nào trùng nhau.',
      en: '20 Binox puzzles (Binairo/Takuzu style): fill X and O so every row and column is balanced and unique.',
    },
    imgSrc: '/games/binox.svg',
    href: '/game/binox',
  },
  {
    id: 'troix',
    title: {vi: 'Troix', en: 'Troix'},
    description: {
      vi: '20 màn chơi Troix: phiên bản 3 ký hiệu X, O, I của Binox, đòi hỏi tư duy logic cao hơn.',
      en: '20 Troix puzzles: a 3-symbol (X, O, I) variant of Binox that demands sharper logical reasoning.',
    },
    imgSrc: '/games/troix.svg',
    href: '/game/troix',
  },
  {
    id: 'star-battle',
    title: {vi: 'Star Battle', en: 'Star Battle'},
    description: {
      vi: '20 màn chơi Star Battle: đặt sao vào mỗi hàng, cột và vùng màu sao cho không có 2 sao nào chạm nhau.',
      en: '20 Star Battle puzzles: place stars in every row, column and region so that no two stars touch.',
    },
    imgSrc: '/games/star-battle.svg',
    href: '/game/star-battle',
  },
]

export default gamesData
