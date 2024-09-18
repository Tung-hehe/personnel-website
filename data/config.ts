export const headerNavLinks = [
  {label: 'Home', href: '/'},
  {label: 'Blog', href: '/blog'},
  {label: 'Projects', href: '/projects'},
  {label: 'Tags', href: '/tags'},
  {label: 'About', href: '/about'},
]

export const commonConfig = {
  language: 'vi',
  mainContentMinHeight: '78vh',
  search: 'Tìm kiếm',
  pagination: {
    next: 'Next',
    previous: 'Previous'
  }
}

export const homeConfig = {
  featuredPosts: 5,
  greating: "Chào bạn, cảm ơn đã ghé thăm!",
  heading: "Mình là Tùng - một người hay cười",
  description: [
    'Mình thích Toán và lúc nào cũng có nhiều ý tưởng trong đầu.',
    'Lập trình là công cụ giúp mình hiện thực hóa các ý tưởng đó.',
    'Blog này nhằm chia sẻ kiến thức và kinh nghiệm của mình.'
    // 'I love mathematics and always have many ideas in my head.',
    // 'Programming is a tool that helps me to realize those ideas.',
    // 'This blog aims to share my knowledge and experiences.',
  ],
  bios: [
    {text: 'Sinh năm 2001 tại Nam Định.', emoji: null},
    {text: 'Tốt nghiệp HUS - VNU.', emoji: 'graduation-cap'},
    {text: 'Sinh sống và làm việc tại Hà Nội.', emoji: null},
    {text: 'Đang độc thân.', emoji: 'blue-heart'},
    {text: 'Thích Toán học và Lập trình.', emoji: 'computer'},
    {text: 'Ham học hỏi.', emoji: 'face-with-monocle'},
    {text: 'Thích đọc sách.', emoji: 'books'},
    {text: 'Tác giả yêu thích: Jeffery Deaver.', emoji: 'ledger'},
    {text: 'Tác giả yêu thích: Higashino Keigo.', emoji: 'ledger'},
    {text: 'Thích mèo.', emoji: 'cat-face'},
    {text: 'Thích chơi game.', emoji: 'video-game'},
    {text: 'Game yêu thích: League of legend.', emoji: 'video-game'}
  ],
  navigation: [
    {label: 'Posts', href: '/blog', emoji: 'memo'},
    {label: 'Projects', href: '/projects', emoji: 'hammer-and-wrench'},
    {label: 'Tags', href: '/tags', emoji: 'dna'},
    {label: 'About', href: '/about', emoji: 'face-with-monocle'},
  ],
  mobileNavigation: [
    {label: 'Các dự án mình đã làm', href: '/projects', emoji: 'hammer-and-wrench'},
    {label: 'Các bài viết của mình', href: '/blog', emoji: 'memo'},
    {label: 'Các chủ đề bài viết', href: '/tags', emoji: 'dna'},
    {label: 'Nhiều hơn về mình', href: '/about', emoji: 'face-with-monocle'},
  ],
  happyReading: "Chúc bạn đọc vui vẻ!"
}

export const blogConfig = {
  title: 'Tất cả bài viết',
  noPost: 'Không tìm thấy bài viết nào',
  readingTime: 'phút đọc',
  postsPerPage: 10,
  words: 'từ',
  paginationUrl: '/blog'
}

export const tagsConfig = {
  title: 'Tags',
  noTageFound: 'Không tìm thấy tag nào',
  tagSelect: 'Tag'
}

export const projectsConfig = {
  title: 'Các dự án',
  noProject: 'Không tìm thấy dự án nào',
  projectsPerPage: 10,
  detail: 'Chi tiết'
}

export const aboutConfig = {
  title: 'Về Trần Thanh Tùng',
  greating: 'Chào bạn!'
}
