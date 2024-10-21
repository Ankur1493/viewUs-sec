import { Skeleton } from "../ui/skeleton"

export const SpacesLoadingSkeleton = () => {
  return (
    <div className="flex flex-row space-x-3">
      <Skeleton className="h-[250px] w-[350px] rounded-xl" />
      <Skeleton className="h-[250px] w-[350px] rounded-xl" />
      <Skeleton className="h-[250px] w-[350px] rounded-xl" />
    </div>
  )
}
