import { homeConfig, LocaleType } from "@/data/config"

export function Description({ locale }: { locale: LocaleType }) {
  return (
    <div className="mb-7 mt-3">
      <div className="hidden sm:block">
        {homeConfig.description[locale].map((text, i) => <p key={i}>{text}</p>)}
      </div>
      <div className="sm:hidden text-justify">
        <p>{homeConfig.description[locale].join(' ')}</p>
      </div>
    </div>
  )
}
