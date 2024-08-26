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
    title: 'Logic Puzzles Solver',
    description: 'Mô hình hóa và giải các câu đố logic như Sudoku, Binox, Triox, Slitherlink, ...',
    imgSrc: '/projects/LogicPuzzle.jpg',
    builtWith: ['Python', 'MILP'],
    href: 'https://github.com/Tung-hehe/LogicPuzzlesSolver',
  },
  {
    title: 'MIM Python',
    description: 'Trang web dạy lập trình python cho sinh viên khoa Toán - Cơ - Tin trường Đại học Khoa học Tự nhiên',
    imgSrc: '/projects/MIMPython.png',
    builtWith: ['Javascript', 'HTML', 'CSS'],
    href: 'https://mimpython.github.io/',
  },
  {
    title: 'Pixel Adventure Python',
    description: 'Game 2D plartform lập trình bằng python và pygame, đang trong quá trình phát triển.',
    imgSrc: '/projects/PixelAdventurePygame.png',
    builtWith: ['Python', 'Pygame'],
    href: 'https://github.com/Tung-hehe/Pixel-Adventure-Pygame',
  },
]

export default projectsData
