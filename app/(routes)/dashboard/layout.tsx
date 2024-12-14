import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="relative min-h-screen h-full w-screen flex">
      <div className="hidden md:flex flex-1">
        <SideBar email={user.email!} />
      </div>
      <div className="absolute top-3 left-2 block md:hidden flex-none z-50">
        <SidebarTrigger className="z-100" />
      </div>
      <div className="flex-grow w-full flex-3">
        <DashboardNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
