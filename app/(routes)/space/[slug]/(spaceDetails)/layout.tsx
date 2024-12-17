import { verifyUserSpace } from "@/actions/space";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const SpaceLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await auth();
  const user = session?.user;
  if (!user) redirect("/login");

  const userSpaceStatus = await verifyUserSpace({ slug: params.slug });
  if (!userSpaceStatus) {
    return redirect("/login");
  }

  const userDetails = await getUserById(user.id!);
  if (!userDetails) {
    return <div>Can not find your profile, maybe try logging out</div>;
  }

  return (
    <div className="relative flex">
      <div className="flex-grow overflow-x-hidden">
        <div className="absolute top-0 right-0">
          <DashboardNavbar user={userDetails} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default SpaceLayout;
