"use client"

import { useState } from 'react'

export type LoveLetterTemplateOption = {
  slug: string
  label: string
}

type LoveLetterDemo = {
  templates: LoveLetterTemplateOption[]
  basePath?: string
}

export function LoveLetterDemo({ templates, basePath = '/posts/love_letter_project/templates' }: LoveLetterDemo) {
  const [selected, setSelected] = useState(templates[0]?.slug)

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-gray-700 bg-primary-dark/10">
      <div className="flex flex-wrap gap-2 border-b border-gray-700 p-3">
        {templates.map((template) => (
          <button
            key={template.slug}
            type="button"
            onClick={() => setSelected(template.slug)}
            className={`
              rounded-full border px-3 py-1 text-xs font-medium transition-colors
              ${selected === template.slug
                ? 'border-primary bg-primary text-background'
                : 'border-gray-700 text-gray-300 hover:border-primary hover:text-primary'}
            `}
          >
            {template.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-1.5 border-b border-gray-700 bg-primary-dark/40 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-gray-600" />
      </div>
      <iframe
        key={selected}
        src={`${basePath}/${selected}.html`}
        title={`love-letter-template-${selected}`}
        className="h-[640px] w-full bg-white"
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
    </div>
  )
}
