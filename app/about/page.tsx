import { allAuthors } from "@/.contentlayer/generated";
import { useMDXComponent } from 'next-contentlayer/hooks'
import AuthorInfo from "@/components/about/AuthorInfo";

export default function Page() {
  const author = allAuthors[0];
  const MDXContent = useMDXComponent(author.body.code)
  return (
    <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0 pt-12">
      <AuthorInfo author={author}/>
      <div className="prose max-w-none pb-8 dark:prose-dark xl:col-span-2 pt-6 text-justify">
        <MDXContent/>
      </div>
    </div>
  )
}
