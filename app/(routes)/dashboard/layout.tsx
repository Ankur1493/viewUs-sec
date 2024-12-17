import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserById } from "@/data/user";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");

  const userDetails = await getUserById(user.id!);
  if (!userDetails) {
    return <div>Can not find your profile, maybe try logging out</div>;
  }
  return (
    <div className="relative min-h-screen h-full w-screen flex">
      <div className="hidden md:flex flex-1">
        <SideBar email={user.email!} />
      </div>
      <div className="absolute top-3 left-2 block md:hidden flex-none z-50">
        <SidebarTrigger className="z-100" />
      </div>
      <div className="flex-grow w-full flex-3">
        <DashboardNavbar user={userDetails} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
