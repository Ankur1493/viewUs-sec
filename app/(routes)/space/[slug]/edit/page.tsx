import { Suspense } from "react";
import { SpaceCreateNavbar } from "@/components/space/create/SpaceCreateNavbar";
import { getSpaceDetails } from "@/actions/space";
import { EditSpaceWrapper } from "@/components/space/edit/EditSpaceWrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SpaceCreatePage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const session = await auth();
  const user = session?.user
  if (!user) {
    return redirect("/login")
  }
  const spaceDetails = await getSpaceDetails({ slug: params.slug, userId: user.id! })
  if (!spaceDetails) {
    return (
      <div>We are unable to found your space as of now, please try again later</div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#F9FAFB] overflow-hidden">
      <SpaceCreateNavbar page="edit" id={spaceDetails.id} slug={spaceDetails.slug} />
      <main className="px-4 pt-4 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <EditSpaceWrapper spaceDetail={spaceDetails} currentPage={page} />
        </Suspense>
      </main>
    </div>
  );
}
