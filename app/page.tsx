import { Twemoji } from "@/components/common/Twemoji"
import { Avatar } from "@/components/home/Avatar"
import { Description } from "@/components/home/Description"
import { TypedBios } from "@/components/home/TypedBios"
import { Navigation } from "@/components/home/Navigation"
import { FeaturePost } from "@/components/home/FeaturedPosts"
import { homeConfig } from "@/data/config"


export default function Page() {
  return (
    <div className="relative divide-gray-700 divide-y">
      <div className="mt-8 md:mt-12 pb-8">
        <div className="flex flex-col justify-between md:my-4 xl:flex-row">
          <div className="my-auto text-lg leading-7 text-gray-400">
            <div
              className="
                bg-gradient-to-l from-blue-800 to-sky-500 mb-6 bg-clip-text
                text-4xl font-extrabold tracking-tight text-transparent
              "
            >
              <span>{homeConfig.greating}</span>
              <Twemoji emoji="waving-hand" size="" className="ml-2"/>
            </div>
            <h1 className="text-neutral-200 pb-2">
              <span>{homeConfig.heading}</span>
              <span className="absolute ml-1.5 inline-flex pt-[3px]">
                <Twemoji emoji="winking-face"/>
              </span>
            </h1>
            <TypedBios/>
            <Description/>
            <Navigation/>
            <p className="my-8 flex">
              <span className="mr-2">{homeConfig.happyReading}</span>
              <Twemoji emoji="clinking-beer-mugs" />
            </p>
          </div>
          <div>
            <Avatar/>
          </div>
        </div>
      </div>
      <FeaturePost/>
    </div>
  )
}
