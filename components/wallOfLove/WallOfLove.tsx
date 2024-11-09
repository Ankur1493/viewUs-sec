"use client"

import { WallCardTypesConstants } from "@/constants"
import { WallCardTypes } from "./WallCardTypes"
import { useWallTypeStore } from "@/store/useWallTypeStore"
import { Button } from "../ui/button"
import { ArrowLeftIcon } from "lucide-react"

export const WallOfLove = () => {

  const { page, data, setPage } = useWallTypeStore()

  return (
    <div>
      {
        page === "all" &&
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-semibold">What kind of wall do you want to cook today??</h1>
          <div className="w-full pr-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {WallCardTypesConstants.map((card) => (
              <WallCardTypes key={card.key} title={card.title} desc={card.desc} img={card.img} slug={card.slug} />
            ))}
          </div>
        </div>
      }
      {
        page === "editing" && (
          <div>
            <Button onClick={() => setPage("all", null)}>Go back <ArrowLeftIcon /> </Button>
            <div>{page} ----- {data}</div>
          </div>
        )
      }
      {
        page === "final" && (
          <div>
            <Button onClick={() => setPage("editing", data)}>Go back <ArrowLeftIcon /> </Button>
            <div>{page} ----- {data}</div>
          </div>
        )
      }

    </div>
  )
}
