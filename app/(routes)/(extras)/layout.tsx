import { auth } from "@/auth";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

const ExtraLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const userDetails = await getUserById(user.id!);
  if (!userDetails) {
    return <div>Can not find your profile, maybe try logging out</div>;
  }

  return (
    <div className="relative min-h-screen h-full w-screen flex">
      <div className="flex-3">
        <SideBar email={user.email!} />
      </div>
      <div className="fixed top-3 left-2 block md:hidden flex-none z-50">
        <SidebarTrigger className="z-100" />
      </div>
      <div className="flex-1">
        <DashboardNavbar user={userDetails} />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default ExtraLayout;
