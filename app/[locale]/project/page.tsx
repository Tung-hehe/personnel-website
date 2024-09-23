import projectsData from "@/data/projects";

import { generatePageSeo } from '@/utils/seo'
import { projectsConfig, LocaleType } from '@/data/config'
import { ProjectsLayout } from "@/components/project/ProjectsLayout";

export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: projectsConfig.title[params.locale] })
}

export default function Projects({ params }: { params: { locale: LocaleType } }) {
  return <ProjectsLayout projects={projectsData} locale={params.locale}/>
}
