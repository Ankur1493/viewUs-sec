import { SpaceListCard } from "./SpaceListCard";

export const SpacesLoadingSkeleton = () => {
  return (
    <div className=" flex flex-col gap-[24px]">
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-medium">Active Projects</h2>
      </div>
      <div className="flex flex-row space-x-3">
        <SpaceListCard />
      </div>
    </div>
  );
};
