import { Navbar } from "@/components/dashboard/Navbar";
import { SpaceSideBar } from "@/components/space/SpaceSidebar";

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-screen flex">
      <div className='flex-3'>
        <SpaceSideBar />
      </div>
      <div className='flex-1'>
        <Navbar />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
export default SpaceLayout;
