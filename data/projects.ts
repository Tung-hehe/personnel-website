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
      vi: 'Mô hình hóa và giải các câu đố logic như Sudoku, Binox, Troix, Slitherlink, ...',
      en: 'Modeling and solving logic puzzles such as Sudoku, Binox, Troix, Slitherlink, ...'
    },
    imgSrc: '/projects/logic_puzzle_solver.jpg',
    builtWith: ['Python', 'MILP'],
    href: 'https://github.com/Tung-hehe/logic-puzzles-solver',
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
    title: {vi: 'Love Letter Project', en: 'Love Letter Project'},
    description: {
      vi: 'Công cụ tạo thư tình cá nhân hóa với nhiều mẫu giao diện đẹp.',
      en: 'A tool for generating personalized love letters with beautiful templates.'
    },
    imgSrc: '/projects/love_letter_project.png',
    builtWith: ['Python', 'Jinja2', 'HTML/CSS', 'Javascript'],
    href: 'https://love-letter.tungtt.dev/app/index.html',
  },
]

export default projectsData
