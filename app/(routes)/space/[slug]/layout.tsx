import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full h-screen w-screen flex">
      <div className="flex-grow w-full h-full overflow-x-hidden">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
