import projectsData from "@/data/projects";

import { generatePageSeo } from '@/utils/seo'
import { projectsConfig } from '@/data/config'
import { ProjectsLayout } from "@/components/project/ProjectsLayout";

export const generateMetadata = () => {
  return generatePageSeo({ title: projectsConfig.title })
}

export default function Projects() {
  return <ProjectsLayout projects={projectsData}/>
}
