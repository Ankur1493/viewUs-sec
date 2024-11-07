import { WobbleCard } from "@/components/ui/wobble-card"
import { Card, CardContent } from "../ui/card"
import { PencilIcon, VideoIcon } from "lucide-react"
import { Button } from "../ui/button"

export const SettingDetails = () => {
  return (
    <div className=" w-full flex items-center justify-center flex-col gap-8">
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-pink-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-lg">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                <VideoIcon />1 Video Testimonials Left
              </h2>
              <p className="mt-4 max-w-[32rem] text-left  text-base/6 text-neutral-200">
                If you want more video testimonials to boost your sales, Upgrade Now.
                <span className="block">You would be surprised to know that video testimonials are proved to increase trust</span>
              </p>
            </div>
          </WobbleCard>
        </div>
        <div>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-red-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-lg">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                <PencilIcon /> 12 Text Testimonials Left
              </h2>
              <p className="mt-4 max-w-[32rem] text-left  text-base/6 text-neutral-200">
                If you want more video testimonials to boost your sales, Upgrade Now.
                <span className="block">You would be surprised to know that video testimonials are proved to increase trust</span>
              </p>
            </div>
          </WobbleCard>
        </div>
      </div>
      <div className="w-full">
        <Card className="col-span-1 bg-violet-600 min-h-[300px] relative  h-full [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]  sm:mx-0 sm:rounded-2xl overflow-hidden">
          <CardContent className="p-6 pt-6 pb-0">
            <h2 className="max-w-sm md:max-w-4xl  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Easily manage all of your testimonials
              <span className="block">from one place</span>
            </h2>
            <p className="mt-4 max-w-[32rem] text-left  text-base/6 text-neutral-200">
              We have a enriched dashboard to let you manage these testimonials at
              warp speed and let you focus on your product.
            </p>
            <Button className="w-full mt-4 bg-violet-950">
              Upgrade Now
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
