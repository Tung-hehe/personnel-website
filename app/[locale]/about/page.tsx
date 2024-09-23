import { allAuthors } from "@/.contentlayer/generated"
import { useMDXComponent } from 'next-contentlayer/hooks'
import { AuthorInfo } from "@/components/about/AuthorInfo"
import { Twemoji } from '@/components/common/Twemoji'

import { generatePageSeo } from '@/utils/seo'
import { aboutConfig, LocaleType } from '@/data/config'


export const generateMetadata = ({ params }: { params: { locale: LocaleType } }) => {
  return generatePageSeo({ title: aboutConfig.title[params.locale] })
}

export default function Page({ params }: { params: { locale: LocaleType } }) {
  const author = allAuthors.filter(a => a.locale === params.locale)[0];
  const MDXContent = useMDXComponent(author.body.code)
  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 pt-12">
      <AuthorInfo author={author}/>
      <div className="prose max-w-none pb-8 xl:col-span-2 pt-6 text-justify">
        <h2>
          {aboutConfig.greating[params.locale]}
          <Twemoji className="mx-2" emoji="waving-hand"/>
        </h2>
        <MDXContent/>
      </div>
    </div>
  )
}
