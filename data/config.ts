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
  pagination: {
    postsPerPage: 10,
    next: 'Next',
    previous: 'Previous',
    of: 'of'
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
  ],
  bios: [
    {text: 'Sinh năm 2001 tại Nam Định.', emoji: null},
    {text: 'Sinh sống và làm việc tại Hà Nội.', emoji: null},
    {text: 'Đang độc thân.', emoji: 'blue-heart'},
    {text: 'Tốt nghiệp HUS - VNU.', emoji: null},
    {text: 'Thích Toán học và Lập trình.', emoji: 'computer'},
    {text: 'Thích thử nghiệm, học hỏi.', emoji: null},
    {text: 'Thích đọc sách.', emoji: 'open-book'},
    {text: 'Tác giả yêu thích: Jeffery Deaver.', emoji: 'blue-book'},
    {text: 'Tác giả yêu thích: Higashino Keigo.', emoji: 'blue-book'},
    {text: 'Thích mèo.', emoji: 'cat2'},
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
  search: 'Tìm kiếm',
  noPost: 'Không tìm thấy bài viết nào',
  // post information
  readingTime: 'phút đọc',
  words: 'từ',
  paginationUrl: '/blog'
}

export const tagsConfig = {
  title: 'Tags',
  noTageFound: 'Không tìm thấy tag nào',
  tagSelect: 'Tag'
}

export const aboutConfig = {
  title: 'Về Trần Thanh Tùng'
}
