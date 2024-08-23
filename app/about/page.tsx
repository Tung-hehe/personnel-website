import { allAuthors } from "@/.contentlayer/generated"
import { useMDXComponent } from 'next-contentlayer/hooks'
import { AuthorInfo } from "@/components/about/AuthorInfo"
import { Twemoji } from '@/components/common/Twemoji'

import { generatePageSeo } from '@/utils/seo'
import { aboutConfig } from '@/data/config'


// ## Chào bạn! <Twemoji className="mx-2" emoji="waving-hand"/>

export const generateMetadata = () => {
  return generatePageSeo({ title: aboutConfig.title })
}

export default function Page() {
  const author = allAuthors[0];
  const MDXContent = useMDXComponent(author.body.code)
  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 pt-12">
      <AuthorInfo author={author}/>
      <div className="prose max-w-none pb-8 xl:col-span-2 pt-6 text-justify">
        <h2>Chào bạn! <Twemoji className="mx-2" emoji="waving-hand"/></h2>
        <MDXContent/>
      </div>
    </div>
  )
}
