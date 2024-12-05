import { freeFeatures } from "@/constants";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Highlight } from "../Highlight";
import { Star } from "lucide-react";

export const StartFree = () => {
  return (
    <div className="my-12 flex flex-col gap-8 justify-center items-center min-h-[500px]">
      <div className="flex flex-col items-center gap-4 justify-center px-8">
        <h2 className="text-sky-500 text-2xl font-medium">Start for free</h2>
        <h1 className="text-5xl md:text-7xl text-black font-bold">0$/month</h1>
        <div className="text-[16px] text-center text-gray-700">
          <p className="text-center flex flex-col items-center">
            We provide a generous free tier, you can sign up and try our entire
            platform for free and
            <Highlight className="ml-1 w-fit block text-yellow-400">
              you will love it
            </Highlight>
          </p>
          <p>
            You can switch to paid, if you want to extra features and support us
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {freeFeatures.map((feature, index) => (
          <Card
            key={index}
            className="w-[350px] flex bg-transparent shadow-none border-none"
          >
            <CardContent className="p-6 space-y-1">
              <div className="flex flex-col gap-1 ">
                <Star
                  size={25}
                  className="text-purple-500"
                  fill="currentColor"
                />
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className={`text-gray-600 transition-opacity duration-300`}>
                {feature.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Link
        href={"/login"}
        className="w-fit p-3 z-10 flex-1 px-16 border-white bg-gradient-to-br from-gray-950 to-gray-900 text-white text-[24px] font-bold rounded-xl text-center cursor-pointer hover:from-gray-800 hover:to-gray-900 duration-500"
      >
        Sign up for Free
      </Link>
    </div>
  );
};
