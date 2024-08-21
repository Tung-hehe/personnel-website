import Link from 'next/link'
import { kebabCase } from '@/utils/string'

export function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-md uppercase text-primary hover:text-sky-400"
    >
      <span>{kebabCase(text)}</span>
    </Link>
  )
}
