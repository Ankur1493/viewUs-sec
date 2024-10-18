import React from "react";
import { SideBar } from "@/components/dashboard/SideBar";
import { Navbar } from "@/components/dashboard/Navbar";
// import { DashBoard } from "@/components/dashboard/DashBoard";
import { ImportPosts } from "@/components/space/ImportPosts";
import SpaceInfo from "@/components/space/SpaceInfo";

export default function Dashboard() {
  return (
    <div className="h-screen w-screen flex">
      <div className="flex-3">
        <SideBar />
      </div>
      <div className="flex-1">
        <Navbar />
        {/* <DashBoard /> */}
        <div className="w-full flex justify-center items-center">
          <SpaceInfo />
        </div>
        <ImportPosts />
      </div>
    </div>
  );
}
