import { Suspense } from "react";
import { SpaceCreateNavbar } from "@/components/space/create/SpaceCreateNavbar";
import { getSpaceDetails } from "@/actions/space";
import { EditSpaceWrapper } from "@/components/space/edit/EditSpaceWrapper";

export default async function SpaceCreatePage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const currentPage = isNaN(page) || page < 1 || page > 7 ? 1 : page;
  const spaceDetails = await getSpaceDetails(params.slug)
  if (!spaceDetails) {
    return (
      <div>We are unable to found your space as of now, please try again later</div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <SpaceCreateNavbar />
      <main className="px-4 pt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <EditSpaceWrapper spaceDetail={spaceDetails} currentPage={page} />
        </Suspense>
      </main>
    </div>
  );
}
