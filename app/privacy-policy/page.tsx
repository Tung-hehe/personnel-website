import { allPrivacyPolicies } from "@/.contentlayer/generated"
import { useMDXComponent } from 'next-contentlayer/hooks'

import { generatePageSeo } from '@/utils/seo'


export const generateMetadata = () => {
  return generatePageSeo({ title: 'Privacy Policy' })
}

export default function Page() {
  const privacyPolicy = allPrivacyPolicies[0];
  const MDXContent = useMDXComponent(privacyPolicy.body.code)
  return (
    <div className="items-start max-w-none prose pt-12 text-justify">
        <MDXContent/>
    </div>
  )
}
