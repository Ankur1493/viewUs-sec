import React from 'react'
import { SideBar } from '@/components/dashboard/SideBar'
import { Navbar } from '@/components/dashboard/Navbar'
import { DashBoard } from '@/components/dashboard/DashBoard'

export default function Dashboard() {
  return (
    <div className='min-h-screen h-full w-screen flex'>
      <div className='flex-3'>
        <SideBar />
      </div>
      <div className='flex-1'>
        <Navbar />
        <DashBoard />
      </div>
    </div>
  )
}

