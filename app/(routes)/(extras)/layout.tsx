import { auth } from "@/auth";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

const ExtraLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  return (
    <div className="relative min-h-screen h-full w-screen flex">
      <div className="flex-3">
        <SideBar email={user.email!} />
      </div>
      <div className="fixed top-3 left-2 block md:hidden flex-none z-50">
        <SidebarTrigger className="z-100" />
      </div>
      <div className="flex-1">
        <DashboardNavbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default ExtraLayout;
