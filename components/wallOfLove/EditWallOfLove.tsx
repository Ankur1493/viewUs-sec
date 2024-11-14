import { useWallTypeStore } from "@/store/useWallTypeStore";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

import { WallSidebar } from "./styleWallComponents/WallSidebar";

export const EditWallOfLove = () => {
  const { url, setPage } = useWallTypeStore();
  const [loading, setLoading] = useState(true);
  console.log({ url });

  return (
    <div>
      <div className="flex pt-2">
        <div className="w-1/4 ">
          <WallSidebar />
        </div>

        <div className="w-full flex justify-center h-screen relative w-full">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
              <div>Loading preview...</div>
            </div>
          )}

          <iframe
            src={url!}
            width="950%"
            height="100%"
            frameBorder={2}
            scrolling="yes"
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            style={{
              border: "none",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
