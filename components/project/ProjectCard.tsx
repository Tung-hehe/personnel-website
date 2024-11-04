import Image from 'next/image'
import Link from 'next/link'

import { projectsConfig, LocaleType } from '@/data/config'
import type { Project } from '@/data/projects'

type ProjectCard = {
  project: Project
  locale: LocaleType
}

export function ProjectCard({ project, locale }: ProjectCard) {
  return (
    <div className='p-4 md:w-1/2'>
      <div className='flex h-full flex-col overflow-hidden rounded-md border-2 border-opacity-60 border-gray-500'>
        <Link href={project.href}>
          <Image
            alt={project.title[locale]}
            title={project.title[locale]}
            src={project.imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        </Link>
        <div className="flex grow flex-col justify-between p-6 flex flex-col">
          <div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              <Link href={project.href}>{project.title[locale]}</Link>
            </h2>
            <p className="prose mb-2 text-gray-400">{project.description[locale]}</p>
            <div className="flex flex-wrap space-x-1.5 mb-3">
              <span className="font-semibold text-gray-300">
                {project.builtWith.join(', ')}
              </span>
            </div>
          </div>
          <Link href={project.href} className="font-medium text-primary hover:text-sky-400">
            {projectsConfig.detail[locale]} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
