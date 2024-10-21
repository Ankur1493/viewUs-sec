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
import { auth, signOut } from '@/auth'


export const Navbar = async () => {

  const session = await auth()

  return (
    <div className='h-[60px] w-full p-4 flex items-center justify-end gap-4'>
      <Link href="/notifications" className='cursor-pointer'><Bell /></Link>
      <Link href="/settings" className='cursor-pointer'><Settings className='cursor-pointer' /></Link>

      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center'>
          <div className='w-9 h-9 rounded-full bg-black'></div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='mr-4 mt-2'>
          <DropdownMenuItem className='cursor-pointer'>
            <Link href="/profile">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer'>
            {
              session && (
                <form action={async () => {
                  "use server"
                  await signOut()
                }}>
                  <button type='submit'>Sign Out</button>
                </form>)
            }
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

