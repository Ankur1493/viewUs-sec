import { useWallTypeStore } from "@/store/useWallTypeStore";
import { useState } from "react";

import { WallSidebar } from "./styleWallComponents/WallSidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export const EditWallOfLove = () => {
  const { url } = useWallTypeStore();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  console.log({ url });
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div>
      <div className="flex pt-2">
        <div className="flex h-screen overflow-hidden">
          {!isSidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              className="fixed top-4 left-4 z-30 md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div
            className={`
          fixed top-0 left-0 h-screen w-64 z-20 bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:w-1/6
        `}
          >
            <WallSidebar
              onClick={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        </div>
        <div className={`flex-grow h-full overflow-x-hidden md:ml-[16%]`}>
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
