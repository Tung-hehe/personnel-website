import Image from 'next/image'
import Link from 'next/link'

import { projectsConfig } from '@/data/config'
import type { Project } from '@/data/projects'


export function ProjectCard({ title, description, imgSrc, href, builtWith }: Project) {
  return (
    <div className='p-4 md:w-1/2'>
      <div className='h-full overflow-hidden rounded-md border-2 border-opacity-60 border-gray-500'>
        <Link href={href}>
          <Image
            alt={title}
            title={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={600}
            height={300}
          />
        </Link>
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold tracking-tight">
            <Link href={href}>{title}</Link>
          </h2>
          <p className="prose mb-3 text-gray-400 text-justify">{description}</p>
          <div className="flex flex-wrap space-x-1.5 mb-3">
            <span className="font-semibold text-gray-300">
              {builtWith.join(', ')}
            </span>
          </div>
          <Link href={href} className="flextext-base font-medium text-primary hover:text-sky-400">
            {projectsConfig.detail} &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
