import { Suspense } from 'react'
import { Button } from '../ui/button'
import { Video } from 'lucide-react'
import { CardWrapper } from './CardWrapper'
import { SpacesListed } from "@/components/dashboard/SpacesListed"
import { SpacesLoadingSkeleton } from '../loaders/SpacesLoadingSkeleton'

export const DashBoard = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-full md:w-[90%] -ml-6 md:ml-0'>
        <div>
          <h2 className='text-2xl md:text-3xl font-bold '>Overview</h2>
          <div className="flex flex-wrap lg:flex-nowrap space-y-4 lg:space-y-0 lg:space-x-4 py-4">
            <CardWrapper title="Total Videos" content="3" Icon={Video} />
            <CardWrapper title="Total Spaces" content="1" Icon={() => <span className="text-3xl">✨</span>} />
            <CardWrapper title="Current Plan" content="Basic" Icon={() => <Button className="ml-2 px-2 text-sm bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-opacity-80">✨ Upgrade</Button>} />
          </div>
        </div>
        <div className='flex flex-row flex-wrap w-[90%] lg:w-full space-y-6 lg:space-y-0 justify-between items-center mt-12 bg-gray-50 p-6 rounded-md border'>
          <span className='font-medium'>Start collecting testimonials in as little as 5 minutes.</span>
          <Button className="rounded-3xl py-5 px-8">Create Project</Button>
        </div>
        <div className='w-full mt-12'>
          <Suspense fallback={<SpacesLoadingSkeleton />}>
            <SpacesListed />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

