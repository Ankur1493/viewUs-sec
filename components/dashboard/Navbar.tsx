import React from 'react'
import { Bell, Settings } from 'lucide-react'
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
    <div className='h-[60px] w-full p-4 flex items-center justify-end gap-4'>
        <Link href="#" className='cursor-pointer'><Bell /></Link>
        <Link href="#" className='cursor-pointer'><Settings className='cursor-pointer' /></Link>
        
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center'>
                <div className='w-9 h-9 rounded-full bg-black'></div> 
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

