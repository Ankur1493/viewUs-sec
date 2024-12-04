import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpaceSideBar } from "@/components/space/SpaceSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SpaceLayout = async ({ children }: { children: React.ReactNode }) => {

  const session = await auth()
  const user = session?.user

  if (!user) redirect("/login")
  return (
    <div className="h-full w-screen flex">
      <div className="hidden md:flex flex-none md:w-1/6 border-none">
        <SpaceSideBar email={user.email!} />
      </div>
      <div className="block md:hidden flex-none">
        <SidebarTrigger />
      </div>
      <div className="flex-grow w-full h-full md:w-5/6 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
