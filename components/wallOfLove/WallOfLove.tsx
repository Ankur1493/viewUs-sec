import { WallCardTypesConstants } from "@/constants"
import { WallCardTypes } from "./WallCardTypes"

export const WallOfLove = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">What kind of wall do you want to cook today??</h1>
      <div className="w-full pr-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {WallCardTypesConstants.map((card) => (
          <WallCardTypes key={card.key} title={card.title} desc={card.desc} img={card.img} url={card.url} />
        ))}
      </div>
    </div>
  )
}
