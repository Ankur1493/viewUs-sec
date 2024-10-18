import { SideBar } from "@/components/dashboard/SideBar";
import { Navbar } from "@/components/dashboard/Navbar";

const SpaceLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen h-full w-screen flex">
      <div className='flex-3'>
        <SideBar />
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
