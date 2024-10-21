import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";

const ExtraLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-screen flex">
      <div className="flex-3">
        <SideBar />
      </div>
      <div className="flex-1">
        <DashboardNavbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default ExtraLayout;
