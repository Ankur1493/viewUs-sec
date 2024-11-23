import { Suspense } from "react";
import { SpaceCreateNavbar } from "@/components/space/create/SpaceCreateNavbar";
import { CoverPage } from "@/components/space/create/CoverPage";
import { UserInformation } from "@/components/space/create/UserInformation";
import { TestimonialType } from "@/components/space/create/TestimonialType";
import { TestimonialPage } from "@/components/space/create/TestimonialPage";
import { ThankYouPage } from "@/components/space/create/ThankYouPage";
import { DesignPage } from "@/components/space/create/DesignPage";
import { SpaceCreationDetails } from "@/components/space/create/SpaceCreationDetails";

export default function SpaceCreatePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const currentPage = isNaN(page) || page < 1 || page > 7 ? 1 : page;

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <SpaceCreationDetails />;
      case 2:
        return <CoverPage />;
      case 3:
        return <UserInformation />;
      case 4:
        return <TestimonialType />;
      case 5:
        return <TestimonialPage />;
      case 6:
        return <ThankYouPage />;
      case 7:
        return <DesignPage />;
      default:
        return <CoverPage />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <SpaceCreateNavbar />
      <main className="px-4 pt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>{renderPage()}</Suspense>
      </main>
    </div>
  );
}
