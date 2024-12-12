import { verifyUserSpace } from "@/actions/space";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { redirect } from "next/navigation";

const SpaceLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const userSpaceStatus = await verifyUserSpace({ slug: params.slug });
  if (!userSpaceStatus) {
    return redirect("/login");
  }

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
