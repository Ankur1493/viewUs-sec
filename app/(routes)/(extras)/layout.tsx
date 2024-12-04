import { auth } from "@/auth";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { SideBar } from "@/components/dashboard/SideBar";
import { redirect } from "next/navigation";

const ExtraLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()
  const user = session?.user

  if (!user) redirect("/login")

  return (
    <div className="min-h-screen h-full w-screen flex">
      <div className="flex-3">
        <SideBar email={user.email!} />
      </div>
      <div className="flex-1">
        <DashboardNavbar />
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
export default ExtraLayout;
