import { useWallTypeStore } from "@/store/useWallTypeStore"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import { SelectBackground } from "./styleWallComponents/SelectBackground"

export const EditWallOfLove = () => {
  const { url, setPage } = useWallTypeStore()
  const [loading, setLoading] = useState(true)

  return (
    <div>
      <Button onClick={() => setPage("all", null)}>Go back <ArrowLeftIcon /> </Button>
      <div className="flex gap-2">
        <div className="w-1/4 bg-red-300">
          <SelectBackground />
        </div>

        <div className="w-full flex justify-center h-screen relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div>Loading preview...</div>
            </div>
          )}

          <iframe
            src={url!}
            width="90%"
            height="100%"
            frameBorder={2}
            scrolling="yes"
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            style={{
              border: "none",
              height: "100%",
            }}
          ></iframe>
        </div>
      </div>

      <Button onClick={() => setPage("final", null)}>Go Next</Button>
    </div>
  )
}

