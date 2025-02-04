import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SpaceSideBar } from "@/components/space/SpaceSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

const SpaceLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login");
  return (
    <div className="relative w-screen flex bg-[#FFFFFF]">
      <div className="hidden md:flex flex-none flex-1 border-none">
        <SpaceSideBar email={user.email!} />
      </div>
      <div className="absolute top-3 left-2 block md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-grow flex-3 pt-12">{children}</div>
    </div>
  );
};

export default SpaceLayout;
