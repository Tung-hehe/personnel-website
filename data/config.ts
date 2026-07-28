export const repositoryName = 'Tung-hehe/personnel-website'
export const locales = ['vi', 'en']
export const defaultLocale = 'vi'
export type LocaleType = (typeof locales)[number]
export type LocaleDictType = {[locale: LocaleType]: string}

export const headerNavLinks = [
  {label: 'Home', href: '/'},
  {label: 'Blog', href: '/blog'},
  {label: 'Projects', href: '/project'},
  {label: 'Games', href: '/game'},
  {label: 'Tags', href: '/tag'},
  {label: 'About', href: '/about'},
]

export const localeNames : {short: LocaleType, full: string}[] = [
  {short: 'vi', full: 'Tiếng Việt'}, {short: 'en', full: 'English'}
]

export const commonConfig: {
  mainContentMinHeight: string,
  search: {[locale: LocaleType]: string},
  pagination: {next: string, previous: string}
} = {
  mainContentMinHeight: '78vh',
  search: {vi: 'Tìm kiếm', en: 'Search'},
  pagination: {
    next: 'Next',
    previous: 'Previous'
  }
}

export const homeConfig: {
  featuredPosts: number
  greeting: LocaleDictType
  heading: LocaleDictType
  description: {[locale: LocaleType]: string[]}
  bios: {text: LocaleDictType, emoji: null | string}[]
  navigation: {label: string, href: string, emoji: string}[]
  mobileNavigation: {label: LocaleDictType, href: string, emoji: string}[]
  happyReading: LocaleDictType
} = {
  featuredPosts: 5,
  greeting: {vi: "Chào bạn, cảm ơn đã ghé thăm!", en: 'Hello! Thank you for visiting'},
  heading: {vi: "Mình là Tùng - một người hay cười", en: "I'm Tung - a smiley guy"},
  description: {
    vi: [
      'Mình thích Toán và lúc nào cũng có nhiều ý tưởng trong đầu.',
      'Lập trình là công cụ giúp mình hiện thực hóa các ý tưởng đó.',
      'Blog này nhằm chia sẻ kiến thức và kinh nghiệm của mình.'
    ],
    en: [
      'I love mathematics and always have many ideas in my head.',
      'Programming is a tool that helps me to realize those ideas.',
      'This blog aims to share my knowledge and experiences.',
    ]
  },
  bios: [
    {text: {vi: 'Sinh năm 2001 tại Nam Định.', en: 'Born in the year 2001 in Nam Dinh.'}, emoji: null},
    {text: {vi: 'Tốt nghiệp HUS - VNU.', en: 'Graduated from HUS - VNU.'}, emoji: 'graduation-cap'},
    {text: {vi: 'Sinh sống và làm việc tại Hà Nội.', en: 'Living and working in Hanoi.'}, emoji: null},
    {text: {vi: 'Thích Toán học và Lập trình.', en: 'Passionate about math and programming.'}, emoji: 'computer'},
    {text: {vi: 'Ham học hỏi.', en: 'Passionate learner.'}, emoji: 'face-with-monocle'},
    {text: {vi: 'Thích đọc sách.', en: 'Love to read.'}, emoji: 'books'},
    {text: {vi: 'Thích chơi game.', en: 'Love playing video game.'}, emoji: 'video-game'},
  ],
  navigation: [
    {label: 'Posts', href: '/blog', emoji: 'memo'},
    {label: 'Projects', href: '/project', emoji: 'hammer-and-wrench'},
    {label: 'Games', href: '/game', emoji: 'joystick'},
    {label: 'Tags', href: '/tag', emoji: 'dna'},
    {label: 'About', href: '/about', emoji: 'face-with-monocle'},
  ],
  mobileNavigation: [
    {label: {vi: 'Các dự án mình đã làm', en: 'What have I built?'}, href: '/project', emoji: 'hammer-and-wrench'},
    {label: {vi: 'Các bài viết của mình', en: 'My writings'}, href: '/blog', emoji: 'memo'},
    {label: {vi: 'Chơi những game mình đã làm', en: 'Play games I built'}, href: '/game', emoji: 'joystick'},
    {label: {vi: 'Các chủ đề bài viết', en: 'All Post topics'}, href: '/tag', emoji: 'dna'},
    {label: {vi: 'Nhiều hơn về mình', en: 'More about me'}, href: '/about', emoji: 'face-with-monocle'},
  ],
  happyReading: {vi: "Chúc bạn đọc vui vẻ!", en: 'Happy reading!'}
}

export const blogConfig: {
  title: LocaleDictType
  noPost: LocaleDictType
  readingTime: LocaleDictType
  postsPerPage: number
  words: LocaleDictType
  paginationUrl: string
  readMore: LocaleDictType
} = {
  title: {vi: 'Tất cả bài viết', en: 'All posts'},
  noPost: {vi: 'Không tìm thấy bài viết nào', en: 'No posts were found'},
  readingTime: {vi: 'phút đọc', en: 'minutes'},
  postsPerPage: 10,
  words: {vi: 'từ', en: 'words'},
  paginationUrl: '/blog',
  readMore: {vi: 'Đọc tiếp', en: 'Read more'},
}

export const tagsConfig = {title: 'Tags', tagSelect: 'Tag'}

export const projectsConfig : {
  title: {[locale: LocaleType]: string},
  noProject: {[locale: LocaleType]: string},
  projectsPerPage: number,
  detail: {[locale: LocaleType]: string}
} = {
  title: {vi: 'Các dự án', en: 'All projects'},
  noProject: {vi: 'Không tìm thấy dự án nào', en: 'No projects were found'},
  projectsPerPage: 10,
  detail: {vi: 'Chi tiết', en: 'Learn more'}
}

export const gamesConfig: {
  title: LocaleDictType,
  subtitle: LocaleDictType,
  noGame: LocaleDictType,
  play: LocaleDictType,
} = {
  title: {vi: 'Games', en: 'Games'},
  subtitle: {
    vi: 'Những trò chơi mình đã mô hình hóa và lập trình.',
    en: 'Games I modeled and programmed myself.',
  },
  noGame: {vi: 'Không tìm thấy game nào', en: 'No games were found'},
  play: {vi: 'Chơi ngay', en: 'Play now'},
}

export type PuzzleGameConfig = {
  title: LocaleDictType,
  rules: LocaleDictType,
  chooseLevel: LocaleDictType,
  backToLevels: LocaleDictType,
  level: LocaleDictType,
  difficulty: {[key in 'easy' | 'medium' | 'hard' | 'expert']: LocaleDictType},
  clues: LocaleDictType,
  completed: LocaleDictType,
  reset: LocaleDictType,
  check: LocaleDictType,
  solve: LocaleDictType,
  erase: LocaleDictType,
  time: LocaleDictType,
  noConflictsFound: LocaleDictType,
  congrats: LocaleDictType,
  solved: LocaleDictType,
}

const commonPuzzleGameConfig = {
  chooseLevel: {vi: 'Chọn một màn chơi', en: 'Choose a level'},
  backToLevels: {vi: 'Danh sách màn chơi', en: 'Back to levels'},
  level: {vi: 'Màn', en: 'Level'},
  difficulty: {
    easy: {vi: 'Dễ', en: 'Easy'},
    medium: {vi: 'Trung bình', en: 'Medium'},
    hard: {vi: 'Khó', en: 'Hard'},
    expert: {vi: 'Rất khó', en: 'Expert'},
  },
  clues: {vi: 'ô gợi ý', en: 'clues'},
  completed: {vi: 'Đã hoàn thành', en: 'Completed'},
  reset: {vi: 'Chơi lại', en: 'Reset'},
  check: {vi: 'Kiểm tra', en: 'Check'},
  solve: {vi: 'Xem lời giải', en: 'Solve'},
  erase: {vi: 'Xoá', en: 'Erase'},
  time: {vi: 'Thời gian', en: 'Time'},
  noConflictsFound: {vi: 'Không có lỗi nào!', en: 'No conflicts found!'},
  congrats: {vi: 'Chúc mừng bạn đã hoàn thành!', en: 'Congratulations, you solved it!'},
  solved: {vi: 'Đây là lời giải của màn chơi này.', en: 'Here is the solution for this level.'},
}

export const sudokuConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Sudoku', en: 'Sudoku'},
  rules: {
    vi: 'Điền số 1-9 vào mỗi hàng, cột và khối 3x3 sao cho không có số nào lặp lại.',
    en: 'Fill 1-9 into every row, column and 3x3 box so that no number repeats.',
  },
}

export const binoxConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Binox', en: 'Binox'},
  rules: {
    vi: 'Điền X và O sao cho không có quá 2 ô liền kề cùng ký hiệu, mỗi hàng/cột có số X bằng số O, và không có hai hàng hay hai cột nào giống hệt nhau.',
    en: 'Fill X and O so that no more than 2 identical symbols touch in a row, each row/column has an equal count of X and O, and no two rows or columns are identical.',
  },
}

export const troixConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Troix', en: 'Troix'},
  rules: {
    vi: 'Điền X, O và I sao cho không có quá 2 ô liền kề cùng ký hiệu, và mỗi hàng/cột có số lượng X, O, I bằng nhau.',
    en: 'Fill X, O and I so that no more than 2 identical symbols touch in a row, and each row/column has an equal count of X, O and I.',
  },
}

export const starBattleConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Star Battle', en: 'Star Battle'},
  rules: {
    vi: 'Đặt đúng số sao vào mỗi hàng, cột và vùng màu (tùy độ khó), sao cho không có 2 ngôi sao nào chạm nhau kể cả theo đường chéo.',
    en: 'Place the right number of stars in every row, column and colored region (depending on difficulty), with no two stars touching, even diagonally.',
  },
}

export const galaxiesConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Galaxies', en: 'Galaxies'},
  rules: {
    vi: 'Vẽ đường chia bảng thành các vùng (thiên hà), mỗi vùng chứa đúng một tâm và đối xứng qua tâm đó khi xoay 180 độ.',
    en: 'Draw borders to split the grid into regions (galaxies), each containing exactly one center dot and symmetric under a 180-degree rotation about it.',
  },
}

export const slitherlinkConfig: PuzzleGameConfig = {
  ...commonPuzzleGameConfig,
  title: {vi: 'Slitherlink', en: 'Slitherlink'},
  rules: {
    vi: 'Nối các chấm để tạo thành một vòng khép kín duy nhất, sao cho số cạnh bao quanh mỗi ô đúng bằng số ghi trong ô đó.',
    en: 'Connect the dots to form a single closed loop, so that the number of edges around each numbered cell matches the number shown.',
  },
}

export type APuzzleADayConfig = {
  title: LocaleDictType,
  rules: LocaleDictType,
  pickDate: LocaleDictType,
  today: LocaleDictType,
  rotate: LocaleDictType,
  flip: LocaleDictType,
  reset: LocaleDictType,
  solve: LocaleDictType,
  piecesPlaced: LocaleDictType,
  congrats: LocaleDictType,
  solved: LocaleDictType,
  invalidPlacement: LocaleDictType,
}

export const aPuzzleADayConfig: APuzzleADayConfig = {
  title: {vi: 'A Puzzle A Day', en: 'A Puzzle A Day'},
  rules: {
    vi: 'Xếp cả 8 mảnh ghép vào bảng lịch sao cho phủ kín mọi ô, chỉ chừa lại đúng ô tháng và ô ngày bạn chọn.',
    en: 'Place all 8 pieces on the calendar board to cover every cell except the month and day you pick.',
  },
  pickDate: {vi: 'Chọn ngày', en: 'Pick a date'},
  today: {vi: 'Hôm nay', en: 'Today'},
  rotate: {vi: 'Xoay', en: 'Rotate'},
  flip: {vi: 'Lật', en: 'Flip'},
  reset: {vi: 'Chơi lại', en: 'Reset'},
  solve: {vi: 'Xem lời giải', en: 'Solve'},
  piecesPlaced: {vi: 'mảnh đã đặt', en: 'pieces placed'},
  congrats: {vi: 'Chúc mừng bạn đã hoàn thành!', en: 'Congratulations, you solved it!'},
  solved: {vi: 'Đây là một lời giải cho ngày này.', en: 'Here is one solution for this date.'},
  invalidPlacement: {vi: 'Không thể đặt mảnh ghép ở đây', en: "Can't place the piece there"},
}

export const aboutConfig: {
  title: LocaleDictType
  greeting: LocaleDictType
} = {
  title: {vi: 'Về Trần Thanh Tùng', en: 'About Tran Thanh Tung'},
  greeting: {vi: 'Chào bạn!', en: 'Hello!'}
}

export const privacyPolicyConfig: {
  title: LocaleDictType
} = {
  title: {vi: 'Chính sách quyền riêng tư', en: 'Privacy Policy'}
}

export const notFoundConfig: {
  text1: LocaleDictType,
  text2: LocaleDictType,
  backToHomePage: LocaleDictType
} = {
  text1: {vi: 'Hmm.. có vẻ như bạn đã bị lạc', en: "Hmm.. it seems that you're lost"},
  text2: {
    vi: 'Nhưng đừng lo, bạn sẽ tìm thấy nhiều thứ khác ở trang chủ.',
    en: "But don't worry, you can find plenty of other things on homepage."
  },
  backToHomePage: {vi: 'Về trang chủ', en: 'Back to homepage'}
}
