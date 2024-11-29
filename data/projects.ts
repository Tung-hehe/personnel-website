import { LocaleType } from './config'

export type Project = {
  title: {[locale: LocaleType]: string},
  description: {[locale: LocaleType]: string},
  builtWith: string[],
  imgSrc: string,
  href: string,
}

const projectsData: Project[] = [
  {
    title: {vi: 'Website cá nhân', en: 'Personal website'},
    description: {
      vi: 'Trang web cá nhân của mình - nơi lưu trữ các bài viết về toán học, lập trình và các ý tưởng cá nhân.',
      en: 'My personal website where I store articles about mathematics, programming and personal ideas'
    },
    imgSrc: '/projects/tungtt.png',
    builtWith: ['Typescript', 'Tailwind', 'Next.js'],
    href: '/',
  },
  {
    title: {vi: 'Logic Puzzles Solver', en: 'Logic Puzzles Solver'},
    description: {
      vi: 'Mô hình hóa và giải các câu đố logic như Sudoku, Binox, Triox, Slitherlink, ...',
      en: 'Modeling and solving logic puzzles such as Sudoku, Binox, Triox, Slitherlink, ...'
    },
    imgSrc: '/projects/logic_puzzle_solver.jpg',
    builtWith: ['Python', 'MILP'],
    href: 'https://github.com/.',
  },
  {
    title: {vi: 'MIM Python', en: 'MIM Python'},
    description: {
      vi: 'Trang web dạy lập trình python cho sinh viên khoa Toán - Cơ - Tin trường Đại học Khoa học Tự nhiên',
      en: 'A Python programming website for students in the faculty of Mathematics, Mechanics, and Informatics of HUS - VNU'
    },
    imgSrc: '/projects/MIM_python.png',
    builtWith: ['Javascript', 'HTML', 'CSS'],
    href: 'https://mimpython.github.io/',
  },
  {
    title: {vi: 'Pixel Adventure Python', en: 'Pixel Adventure Python'},
    description: {
      vi: 'Game 2D plartform lập trình bằng python và pygame, đang trong quá trình phát triển.',
      en: 'A 2D platform game programmed in Python and Pygame, currently under development.',
    },
    imgSrc: '/projects/pixel_adventure_pygame.png',
    builtWith: ['Python', 'Pygame'],
    href: 'https://github.com/Tung-hehe/Pixel-Adventure-Pygame',
  },
]

export default projectsData
