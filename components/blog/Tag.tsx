import Link from 'next/link'
import { LocaleType } from '@/data/config'
import { kebabCase } from '@/utils/string'

export function Tag({ text, locale }: { text: string, locale: LocaleType }) {
  return (
    <Link
      href={`/${locale}/tag/${kebabCase(text)}`}
      className="
        mb-1.5 mr-1.5 inline-block rounded-full border border-gray-700 bg-primary-dark/40
        px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary
        transition-colors hover:border-primary hover:bg-primary-dark hover:text-sky-400
      "
    >
      {kebabCase(text)}
    </Link>
  )
}
