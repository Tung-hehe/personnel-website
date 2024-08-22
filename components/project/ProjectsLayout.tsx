'use client'

import { useState } from 'react';
import { Search } from '@/components/common/Search'

import { projectsConfig } from '@/data/config'
import { toLatin } from '@/utils/string';
import { Pagination } from '../common/Pagination';
import { ProjectCard } from './ProjectCard';

import type { Project } from '@/data/projects'


export function ProjectsLayout({projects}: {projects: Project[]}) {
  let [searchValue, setSearchValue] = useState('')
  let [currentPage, setCurrentPage] = useState(1)
  let filteredProjects = projects.filter((project) => {
    let searchContent = toLatin(project.title + project.description).toLowerCase()
    return searchContent.includes(searchValue)
  })
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / projectsConfig.projectsPerPage))
  let renderedProjects = filteredProjects.slice(
    (currentPage - 1) * projectsConfig.projectsPerPage,
    currentPage * projectsConfig.projectsPerPage
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
          {projectsConfig.title}
        </h1>
        <Search onChange={setSearchValue} />
      </header>
      <div className="container py-8">
        {
          renderedProjects.length > 0
          ? <div className="-m-4 flex flex-wrap">
            {renderedProjects.map((project) => (
                <ProjectCard
                  key={project.title}
                  title={project.title}
                  builtWith={project.builtWith}
                  description={project.description}
                  imgSrc={project.imgSrc}
                  href={project.href}
                />
              ))
            }
          </div>
          : projectsConfig.noProject
        }
      </div>
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
