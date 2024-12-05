import { Card, CardContent } from "../ui/card";

export const SpaceListCard = () => {
  return (
    <Card className="w-full rounded-lg">
      <CardContent className="flex flex-col py-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="w-32 h-8 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
};
