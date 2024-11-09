import { useWallTypeStore } from "@/store/useWallTypeStore"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "../ui/button"

export const EditWallOfLove = () => {
  const { data, url, setPage } = useWallTypeStore()
  if (data === null) setPage('all', null)
  if (url === null) setPage('all', null)
  return (
    <div>

      <Button onClick={() => setPage("all", null)}>Go back <ArrowLeftIcon /> </Button>
      <div
        className="w-full h-screen "
        style={{ margin: 0 }}
      >
        <iframe
          src={url!}
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          style={{
            border: "none",
            height: "100%",
          }}
        ></iframe>
      </div>

      <Button onClick={() => setPage("final", null)} >Go Next</Button>
    </div>
  )
}
