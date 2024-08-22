import { homeConfig } from "@/data/config"

export function Description() {
  return (
    <div className="mb-7 mt-3">
      <div className="hidden sm:block">
        {homeConfig.description.map((text, i) => <p key={i}>{text}</p>)}
      </div>
      <div className="sm:hidden text-justify">
        <p>{homeConfig.description.join(' ')}</p>
      </div>
    </div>
  )
}
