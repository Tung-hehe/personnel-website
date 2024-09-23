export const locales = ['vi', 'en']
export const defaultLocale = 'vi'
export type LocaleType = (typeof locales)[number]
export type LocaleDictType = {[locale: LocaleType]: string}

export const headerNavLinks = [
  {label: 'Home', href: '/'},
  {label: 'Blog', href: '/blog'},
  {label: 'Projects', href: '/project'},
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
  greating: LocaleDictType
  heading: LocaleDictType
  description: {[locale: LocaleType]: string[]}
  bios: {text: LocaleDictType, emoji: null | string}[]
  navigation: {label: string, href: string, emoji: string}[]
  mobileNavigation: {label: LocaleDictType, href: string, emoji: string}[]
  happyReading: LocaleDictType
} = {
  featuredPosts: 5,
  greating: {vi: "Chào bạn, cảm ơn đã ghé thăm!", en: 'Hello! Thank you for visiting'},
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
    {text: {vi: 'Sinh sống và làm việc tại Hà Nội.', en: 'Living and working in Hano.i'}, emoji: null},
    {text: {vi: 'Đang độc thân.', en: 'Currently single.'}, emoji: 'blue-heart'},
    {text: {vi: 'Thích Toán học và Lập trình.', en: 'Passionate about math and programming.'}, emoji: 'computer'},
    {text: {vi: 'Ham học hỏi.', en: 'Passionate learner,'}, emoji: 'face-with-monocle'},
    {text: {vi: 'Thích đọc sách.', en: 'Love to read.'}, emoji: 'books'},
    {text: {vi: 'Tác giả yêu thích: Jeffery Deaver.', en: 'Favorite author: Jeffery Deaver.'}, emoji: 'ledger'},
    {text: {vi: 'Tác giả yêu thích: Higashino Keigo.', en: 'Favorite author: Higashino Keigo.'}, emoji: 'ledger'},
    {text: {vi: 'Thích mèo.', en: 'Love cats'}, emoji: 'cat-face'},
    {text: {vi: 'Thích chơi game.', en: 'Love playing video game'}, emoji: 'video-game'},
    {text: {vi: 'Game yêu thích: League of legend.', en: 'Favorite video game: League of legend.'}, emoji: 'video-game'}
  ],
  navigation: [
    {label: 'Posts', href: '/blog', emoji: 'memo'},
    {label: 'Projects', href: '/projects', emoji: 'hammer-and-wrench'},
    {label: 'Tags', href: '/tags', emoji: 'dna'},
    {label: 'About', href: '/about', emoji: 'face-with-monocle'},
  ],
  mobileNavigation: [
    {label: {vi: 'Các dự án mình đã làm', en: 'What have I built?'}, href: '/projects', emoji: 'hammer-and-wrench'},
    {label: {vi: 'Các bài viết của mình', en: 'My writtings'}, href: '/blog', emoji: 'memo'},
    {label: {vi: 'Các chủ đề bài viết', en: 'All tags'}, href: '/tags', emoji: 'dna'},
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
} = {
  title: {vi: 'Tất cả bài viết', en: 'All posts'},
  noPost: {vi: 'Không tìm thấy bài viết nào', en: 'No posts were found'},
  readingTime: {vi: 'phút đọc', en: 'minutes'},
  postsPerPage: 10,
  words: {vi: 'từ', en: 'words'},
  paginationUrl: '/blog'
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

export const aboutConfig: {
  title: LocaleDictType
  greating: LocaleDictType
} = {
  title: {vi: 'Về Trần Thanh Tùng', en: 'About Tran Thanh Tung'},
  greating: {vi: 'Chào bạn!', en: 'Hello!'}
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
