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
    id: 'a-puzzle-a-day',
    title: {vi: 'A Puzzle A Day', en: 'A Puzzle A Day'},
    description: {
      vi: 'Xếp 8 mảnh ghép vào bảng lịch sao cho chỉ chừa lại đúng ngày bạn chọn',
      en: 'Fit 8 pieces onto a calendar board leaving only the date you pick uncovered.',
    },
    imgSrc: '/games/a-puzzle-a-day.svg',
    href: '/game/a-puzzle-a-day',
  },
  {
    id: 'haunted-mirror-maze',
    title: {vi: 'Haunted Mirror Maze', en: 'Haunted Mirror Maze'},
    description: {
      vi: 'Điền ma cà rồng, bóng ma và thây ma vào mê cung gương sao cho số quái vật nhìn thấy từ mỗi gợi ý ở cạnh lưới là chính xác.',
      en: 'Fill vampires, ghosts and zombies into the mirror maze so the number of monsters visible at every clue around the grid is correct.',
    },
    imgSrc: '/games/haunted-mirror-maze.svg',
    href: '/game/haunted-mirror-maze',
  },
  {
    id: 'sudoku',
    title: {vi: 'Sudoku', en: 'Sudoku'},
    description: {
      vi: 'Điền số 1-9 vào mỗi hàng, cột và khối 3x3 sao cho không có số nào lặp lại.',
      en: 'Fill 1-9 into every row, column and 3x3 box so that no number repeats.',
    },
    imgSrc: '/games/sudoku.svg',
    href: '/game/sudoku',
  },
  {
    id: 'star-battle',
    title: {vi: 'Star Battle', en: 'Star Battle'},
    description: {
      vi: 'Đặt đúng số sao vào mỗi hàng, cột và vùng màu (tùy độ khó), sao cho không có 2 ngôi sao nào chạm nhau kể cả theo đường chéo.',
      en: 'Place the right number of stars in every row, column and colored region (depending on difficulty), with no two stars touching, even diagonally.',
    },
    imgSrc: '/games/star-battle.svg',
    href: '/game/star-battle',
  },
  {
    id: 'galaxies',
    title: {vi: 'Galaxies', en: 'Galaxies'},
    description: {
      vi: 'Vẽ đường chia bảng thành các vùng (thiên hà), mỗi vùng chứa đúng một tâm và đối xứng qua tâm đó khi xoay 180 độ.',
      en: 'Draw borders to split the grid into regions (galaxies), each containing exactly one center dot and symmetric under a 180-degree rotation about it.',
    },
    imgSrc: '/games/galaxies.svg',
    href: '/game/galaxies',
  },
  {
    id: 'slitherlink',
    title: {vi: 'Slitherlink', en: 'Slitherlink'},
    description: {
      vi: 'Nối các chấm để tạo thành một vòng khép kín duy nhất, sao cho số cạnh bao quanh mỗi ô đúng bằng số ghi trong ô đó.',
      en: 'Connect the dots to form a single closed loop, so that the number of edges around each numbered cell matches the number shown.',
    },
    imgSrc: '/games/slitherlink.svg',
    href: '/game/slitherlink',
  },
  {
    id: 'skyscraper',
    title: {vi: 'Skyscraper', en: 'Skyscraper'},
    description: {
      vi: 'Điền chiều cao 1-N vào lưới sao cho mỗi hàng/cột có đủ các chiều cao, và số tòa nhà nhìn thấy từ mỗi gợi ý ở cạnh lưới là chính xác.',
      en: 'Fill heights 1-N into the grid so every row/column has each height once, and the visible-building count at every clue is correct.',
    },
    imgSrc: '/games/skyscraper.svg',
    href: '/game/skyscraper',
  },
  {
    id: 'binox',
    title: {vi: 'Binox', en: 'Binox'},
    description: {
      vi: 'Điền X và O sao cho không có quá 2 ô liền kề cùng ký hiệu, mỗi hàng/cột có số X bằng số O, và không có hai hàng hay hai cột nào giống hệt nhau.',
      en: 'Fill X and O so that no more than 2 identical symbols touch in a row, each row/column has an equal count of X and O, and no two rows or columns are identical.',
    },
    imgSrc: '/games/binox.svg',
    href: '/game/binox',
  },
  {
    id: 'troix',
    title: {vi: 'Troix', en: 'Troix'},
    description: {
      vi: 'Điền X, O và I sao cho không có quá 2 ô liền kề cùng ký hiệu, và mỗi hàng/cột có số lượng X, O, I bằng nhau.',
      en: 'Fill X, O and I so that no more than 2 identical symbols touch in a row, and each row/column has an equal count of X, O and I.',
    },
    imgSrc: '/games/troix.svg',
    href: '/game/troix',
  },
]

export default gamesData
