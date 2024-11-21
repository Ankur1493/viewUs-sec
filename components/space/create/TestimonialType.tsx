"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useSpaceDataStore } from "@/store/useSpaceDataStore"

export const TestimonialType = () => {

  const router = useRouter()
  const { testimonialType, setTestimonialType } = useSpaceDataStore()
  const [preferred, setPreferred] = useState<"text" | "video">(testimonialType.text ? "text" : "video")

  return (
    <div className="max-h-screen h-full w-full flex gap-4 ">
      <div className="w-1/2">
        <h1>What kind of testimonial are you looking for?</h1>
        <p>This determines </p>
        <Card
          className={cn(preferred === "text" && "border border-blue-500", "cursor-pointer")}
          onClick={() => {
            setTestimonialType({ text: true, video: false })
            setPreferred("text")
          }}>
          <CardHeader>
            <CardTitle>I prefer something written</CardTitle>
            <CardDescription>Written testimonials can be upto 500 characters long.</CardDescription>
          </CardHeader>
        </Card>
        <Card
          className={cn(preferred === "video" && "border border-blue-500", "cursor-pointer")}
          onClick={() => {
            setTestimonialType({ text: false, video: true })
            setPreferred("video")
          }}>
          <CardHeader>
            <CardTitle>I prefer recorded testimonial</CardTitle>
            <CardDescription>Written testimonials can be upto 500 characters long.</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="w-1/2">
        {/*create preview and add a conditional based preview and change on each click, 
        use the image inside the zustand state, also add a loader if it will take time to render this component */}
        <p>Preview</p>
        {
          preferred === "text" ? (<p>Written</p>) : (<p>Video</p>)
        }
        <div className="flex justify-between mt-6">
          <Button onClick={() => { router.push("/space/create?page=2") }} variant="outline">Back</Button>
          <Button onClick={() => { router.push("/space/create?page=4") }} >Next</Button>
        </div>
      </div>
    </div>
  )
}
