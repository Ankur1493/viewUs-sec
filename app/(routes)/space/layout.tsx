import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SpaceSideBar } from "@/components/space/SpaceSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-screen flex">
      <div className="hidden md:flex flex-none md:w-1/6">
        <SpaceSideBar />
      </div>
      <div className="block md:hidden flex-none">
        <SidebarTrigger />
      </div>
      <div className="flex-grow w-full md:w-5/6">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
