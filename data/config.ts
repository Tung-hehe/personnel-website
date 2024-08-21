export const headerNavLinks = [
  {label: 'Home', href: '/'},
  {label: 'Blog', href: '/blog'},
  {label: 'Tags', href: '/tags'},
  {label: 'Projects', href: '/projects'},
  {label: 'About', href: '/about'},
]

export const commonConfig = {
  language: 'vi',
  mainContentMinHeight: '78vh',

  home: {

  },

  blog: {
    title: 'Tất cả bài viết',
    search: 'Tìm kiếm',
    noPost: 'Không tìm thấy bài viết nào',
    // post information
    readingTime: 'phút đọc',
    words: 'từ',
    paginationUrl: '/blog'
  },

  tags: {
    title: 'Tags',
    noTageFound: 'Không tìm thấy tag nào',
    tagSelect: 'Tag'
  },

  pagination: {
    postsPerPage: 10,
    next: 'Next',
    previous: 'Previous',
    of: 'of'
  }
}
