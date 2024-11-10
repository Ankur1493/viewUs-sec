"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { CostAnimated } from "./CostAnimated"

export const Pricing = () => {

  const [period, setPeriod] = useState<"month" | "year">("month");

  return (
    <div className="dark h-full w-full flex items-center justify-center  bg-gradient-to-tr from-[#141111] to-gray-950">
      <div className="container px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 text-white">Simple pricing for favourite customers</h1>
          <p className="text-gray-400">
            Our paid plans are designed for people who are serious for increasing there credibility among there customers
          </p>
          <p className="text-gray-300">
            PS - We are adding much more features really fast
          </p>
        </div>
        <div className="flex w-full my-6 justify-center items-center">
          <div className="flex justify-center items-center bg-zinc-800 w-fit p-1 rounded-full">
            <Button
              onClick={() => setPeriod("month")}
              className={`px-4 w-[100px] py-2 bg-zinc-800 rounded-l-full  ${period === "month"
                ? "bg-blue-500 text-white hover:bg-blue-500"
                : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setPeriod("year")}
              className={`px-4 w-[100px] py-2 bg-zinc-800 rounded-r-full  ${period === "year"
                ? "bg-blue-500 text-white hover:bg-bg-blue-500"
                : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
            >
              Yearly
            </Button>
          </div>
        </div>
        <div className=" w-2/3  mx-auto">
          <Card className="relative bg-gradient-radial from-zinc-900 to-gray-900 w-full rounded-xl border-zinc-800">
            <CardHeader className="pb-8">
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-white">{period === "month" ? "Monthly" : "Yearly"}</CardTitle>
                <Badge className="bg-gradient-to-r from-red-400 to-orange-200 px-4 text-black hover:from-red-500 hover:to-pink-500">{period === "month" ? "Popular" : "Cost Effective"}</Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <CostAnimated period={period} />
              </div>
            </CardHeader>

            <CardContent className="grid gap-6">
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-3xl py-6 text-base">Upgrade Now</Button>
              <ul className="grid gap-4 grid-cols-2 text-sm">
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Upto 5 video testimonials</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Customizable testimonial forms</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Unlimited Text testimonials</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Import testimonials from popular social platforms</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Personalized support (No AI used, human response)</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Request more features, and get them asap</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Unlimited Wall of Loves</span>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-300">Get a Hall of Fame page</span>
                </li>

              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
