import { Suspense } from "react";
import { SpaceCreateNavbar } from "@/components/space/create/SpaceCreateNavbar";
import { CoverPage } from "@/components/space/create/CoverPage";
import { UserInformation } from "@/components/space/create/UserInformation";
import { TestimonialType } from "@/components/space/create/TestimonialType";
import { TestimonialPage } from "@/components/space/create/TestimonialPage";
import { ThankYouPage } from "@/components/space/create/ThankYouPage";
import { DesignPage } from "@/components/space/create/DesignPage";
import { SpaceCreationDetails } from "@/components/space/create/SpaceCreationDetails";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/data/user";

export default async function SpaceCreatePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/login");
  }

  const user = await getUserById(userId!);

  if (!user) {
    return redirect("/login");
  }

  const page = parseInt(searchParams.page || "1");
  const currentPage = isNaN(page) || page < 1 || page > 7 ? 1 : page;

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <SpaceCreationDetails page="create" disabled={false} />;
      case 2:
        return <CoverPage page="create" />;
      case 3:
        return <UserInformation page="create" />;
      case 4:
        return <TestimonialType page="create" />;
      case 5:
        return <TestimonialPage page="create" />;
      case 6:
        return <ThankYouPage page="create" />;
      case 7:
        return <DesignPage page="create" />;
      default:
        return <CoverPage page="create" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <SpaceCreateNavbar page="create" />
      <main className="px-4 pt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>{renderPage()}</Suspense>
      </main>
    </div>
  );
}
