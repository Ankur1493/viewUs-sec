import React from 'react'
import { Bell, Settings, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'



export const Navbar = () => {
  return (
    <div className='h-[100px] w-full p-4 flex items-center justify-end gap-4'>
        <Link href="#" className='cursor-pointer'><Bell /></Link>
        <Link href="#" className='cursor-pointer'><Settings className='cursor-pointer' /></Link>
        <Link href="#" className='cursor-pointer'><Button className='bg-transparent text-black border border-[2px] border-[#71D4FF] rounded-3xl px-8 hover:bg-[#71D4ff] shadow-md'>Upgrade</Button></Link>
        
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center'>
                <div className='w-10 h-10 rounded-full bg-black'></div> 
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mr-4 mt-2'>
            <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer'>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
  )
}

