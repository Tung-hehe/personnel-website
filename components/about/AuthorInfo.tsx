import Image from 'next/image';
import Link from 'next/link';
import { Author } from 'contentlayer/generated'
import { Mail, Github, Facebook } from 'lucide-react';

export default function AuthorInfo({ author }: {author: Author}) {

  return (
    <div className="flex flex-col items-center space-x-2 pt-8 sm:pt-8">
      <Image src={author.avatar as string} alt="avatar" width={300} height={300} className="h-60 w-60 rounded-full" />
      <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{author.name}</h3>
      <div className="text-gray-500 dark:text-gray-400">{author.occupation}</div>
      <div className="text-gray-500 dark:text-gray-400">{author.company}</div>
      <div className="mt-2 flex gap-3">
        {
          author.email && <Link href={`mailto:${author.email}`}>
            <Mail size={24} strokeWidth={1} className='hover:text-sky-400'/>
          </Link>
        }
        {
          author.facebook && <Link href={author.facebook} target="_blank">
            <Facebook size={24} strokeWidth={1} className='hover:text-sky-400'/>
          </Link>
        }
        {
          author.github && <Link href={author.github} target="_blank">
            <Github size={24} strokeWidth={1} className='hover:text-sky-400'/>
          </Link>
        }
      </div>
    </div>
  )
}
