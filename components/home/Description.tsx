import { homeConfig, LocaleType } from "@/data/config"

export function Description({ locale }: { locale: LocaleType }) {
  return (
    <div className="mb-7 mt-3">
      <div className="hidden sm:block tracking-wide">
        {homeConfig.description[locale].map((text, i) => <p key={i}>{text}</p>)}
      </div>
      <div className="sm:hidden break-words hyphens-auto text-justify tracking-wide">
        <p>{homeConfig.description[locale].join(' ')}</p>
      </div>
    </div>
  )
}
