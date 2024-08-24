export type Project = {
  title: string
  description: string
  builtWith: string[],
  imgSrc: string
  href: string
}

const projectsData: Project[] = [
  {
    title: 'Blog cá nhân',
    description: 'Trang web cá nhân của mình - nơi lưu trữ các bài viết về Toán học, Lập trình, các ý tưởng cá nhân, ...',
    imgSrc: '/projects/TungTT.png',
    builtWith: ['Typescript', 'Tailwind', 'Next.js'],
    href: '/',
  },
  {
    title: 'Logic Puzzle Solver',
    description: 'Mô hình hóa và giải các câu đố logic như Sudoku, Binox, Triox, Slitherlink, ...',
    imgSrc: '/projects/LogicPuzzle.jpg',
    builtWith: ['Python', 'MILP'],
    href: 'https://github.com/Tung-hehe/LogicPuzzlesSolver',
  }
]

export default projectsData
