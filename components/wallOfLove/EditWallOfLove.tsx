import { useWallTypeStore } from "@/store/useWallTypeStore";
import { useState } from "react";

import { WallSidebar } from "./styleWallComponents/WallSidebar";

export const EditWallOfLove = () => {
  const { url } = useWallTypeStore();
  const [loading, setLoading] = useState(true);
  const [showSidebar] = useState(true);
  console.log({ url });

  return (
    <div>
      <div className="flex pt-2">
        {showSidebar && (
          <div className="fixed top-0 left-0 h-screen w-1/6 z-10 overflow-y-hidden">
            <WallSidebar />
          </div>
        )}
        <div
          className={`flex-grow h-full overflow-x-hidden ${
            showSidebar ? "ml-[16%]" : "ml-0"
          }`}
        >
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
    </div>
  );
};
