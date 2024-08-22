'use client'

import { useState } from 'react';
import { Post } from 'contentlayer/generated'

import { PostCard } from '@/components/blog/PostCard'
import { PostsSearch } from '@/components/blog/PostSearch'

import { commonConfig } from '@/data/config'
import { toLatin } from '@/utils/string';
import { Pagination } from '../common/Pagination';
import { ListPosts } from './ListPosts';


export function BlogsLayout({posts, title}: {posts: Post[], title: string}) {
  let [searchValue, setSearchValue] = useState('')
  let [currentPage, setCurrentPage] = useState(1)
  let filteredPosts = posts.filter((post) => {
    let searchContent = toLatin(post.title + post.summary + post.tags.join(' ')).toLowerCase()
    return searchContent.includes(searchValue)
  })
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / commonConfig.pagination.postsPerPage))
  let renderedPosts = filteredPosts.slice(
    (currentPage - 1) * commonConfig.pagination.postsPerPage,
    currentPage * commonConfig.pagination.postsPerPage
  )

  return (
    <div className="divide-y divide-gray-700">
      <header className="space-y-4 pt-6 md:space-y-3">
        <h1
          className="
            text-4xl font-extrabold leading-9 tracking-tight
            text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-12
          "
        >
          {title}
        </h1>
        <PostsSearch onChange={setSearchValue} />
      </header>
      <ListPosts posts={renderedPosts}/>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
