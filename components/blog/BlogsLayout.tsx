'use client'

import { useState } from 'react';
import { Post } from 'contentlayer/generated'

import { Search } from '@/components/common/Search'

import { blogConfig } from '@/data/config'
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
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / blogConfig.postsPerPage))
  let renderedPosts = filteredPosts.slice(
    (currentPage - 1) * blogConfig.postsPerPage,
    currentPage * blogConfig.postsPerPage
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
        <Search onChange={setSearchValue} />
      </header>
      <ListPosts posts={renderedPosts}/>
      {
        totalPages > 1 &&
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </div>
  )
}
