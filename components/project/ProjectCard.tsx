import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { projectsConfig, LocaleType } from '@/data/config'
import type { Project } from '@/data/projects'

type ProjectCard = {
  project: Project
  locale: LocaleType
}

export function ProjectCard({ project, locale }: ProjectCard) {
  return (
    <div className="p-4 md:w-1/2">
      <div
        className="
          group flex h-full flex-col overflow-hidden rounded-xl border border-gray-700
          bg-primary-dark/10 transition-all duration-200
          hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-black/30
        "
      >
        <Link href={project.href} className="relative block h-36 overflow-hidden lg:h-48">
          <Image
            alt={project.title[locale]}
            title={project.title[locale]}
            src={project.imgSrc}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex grow flex-col justify-between p-6">
          <div>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              <Link href={project.href} className="hover:text-primary">{project.title[locale]}</Link>
            </h2>
            <p className="prose mb-4 text-gray-400">{project.description[locale]}</p>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.builtWith.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-700 bg-primary-dark/40 px-2.5 py-0.5 text-xs font-semibold text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <Link
            href={project.href}
            className="
              inline-flex w-fit items-center gap-1.5 rounded-full border border-primary
              px-4 py-1.5 font-medium text-primary transition-colors
              hover:bg-primary hover:text-background
            "
          >
            {projectsConfig.detail[locale]} <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
