import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex">
      <div className="flex-grow overflow-x-hidden">
        <div className="absolute top-0 right-0">
          <DashboardNavbar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
