import { SpaceCreateNavbar } from "@/components/space/create/SpaceCreateNavbar";

export default function SpaceCreatePage({ searchParams }: { searchParams?: { page: number } }) {

  const page = searchParams?.page || 1
  return (
    <div className="h-screen w-full bg-[#F9FAFB]">
      <SpaceCreateNavbar />
    </div>
  )
}
