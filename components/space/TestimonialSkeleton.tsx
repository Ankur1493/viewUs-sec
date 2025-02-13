import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function TestimonialSkeleton() {
  return (
    <Card className={`relative rounded-md overflow-hidden w-[98%] bg-white`}>
      <div className={`absolute inset-0 skeleton-shimmer`}></div>
      <div className="flex-grow">
        <CardHeader>
          <div className="flex gap-2 items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex flex-wrap gap-2 pt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 rounded animate-pulse"
              ></div>
            ))}
          </div>
        </CardContent>
      </div>
      <CardFooter className={`flex justify-between`}>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  );
}
