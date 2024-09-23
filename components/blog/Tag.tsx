import Link from 'next/link'
import { LocaleType } from '@/data/config'
import { kebabCase } from '@/utils/string'

export function Tag({ text, locale }: { text: string, locale: LocaleType }) {
  return (
    <Link
      href={`/${locale}/tag/${kebabCase(text)}`}
      className="mr-3 text-md uppercase text-primary hover:text-sky-400"
    >
      <span>{kebabCase(text)}</span>
    </Link>
  )
}
