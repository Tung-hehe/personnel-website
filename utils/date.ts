import { Post } from 'contentlayer/generated'

export function formatDate(date: string, language: string = 'en') {
  return new Date(date).toLocaleDateString(language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

// Sắp xếp bài viết theo ngày giảm dần. Nếu hai bài cùng ngày và thuộc cùng
// một series, xếp theo order giảm dần (phần sau đứng trên phần trước) để
// nhất quán với quy ước "mới nhất lên trên" của toàn danh sách.
export function sortPosts(a: Post, b: Post) {
  const dateCompare = dateSortDesc(a.date, b.date)
  if (dateCompare !== 0) return dateCompare
  if (a.series && b.series && a.series.title === b.series.title) {
    return b.series.order - a.series.order
  }
  return 0
}
