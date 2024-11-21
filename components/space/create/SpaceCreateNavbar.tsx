'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const testimonialTypes = [
  { page: '1', label: 'Cover Page' },
  { page: '2', label: 'User Information' },
  { page: '3', label: 'Testimonial Type' },
  { page: '4', label: 'Testimonial Page' },
  { page: '5', label: 'Thank You Page' },
  { page: '6', label: 'Design' },
]

export const SpaceCreateNavbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState('1')

  useEffect(() => {
    const page = searchParams.get('page') || '1'
    setCurrentPage(page)
  }, [searchParams])

  const handleExit = () => {
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    setIsSaveDialogOpen(true)
  }

  const handleExitConfirm = (confirm: boolean) => {
    setIsDialogOpen(false)
    if (confirm) {
      router.push('/')
    }
  }

  const handleSaveConfirm = (confirm: boolean) => {
    setIsSaveDialogOpen(false)
    //also call saving space function
    //update this route to go to space/${spaceslug}/form
    if (confirm) {
      router.push('/space/bakedUI')
    }
  }


  const currentPageData = useMemo(() => {
    return testimonialTypes.find(type => parseInt(type.page) === parseInt(currentPage)) || testimonialTypes[0]
  }, [currentPage])

  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4">
        <Select value={currentPage} onValueChange={(value) => {
          router.push(`/space/create?page=${value}`)
        }}>
          <SelectTrigger className="w-[180px] border-none">
            <SelectValue className='text-lg font-bold'>{currentPageData.label}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {testimonialTypes.map((type) => (
              <SelectItem
                key={type.page}
                value={type.page}
              >
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button variant="outline" onClick={handleSave} className="mr-2">Save</Button>
          <Button variant="outline" onClick={handleExit}>Exit</Button>
        </div>
      </div>
      <Progress value={(parseInt(currentPage) / testimonialTypes.length) * 100} className="h-1" />
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Are you ready to collect Testimonials</DialogTitle>
            <DialogDescription>
              Your will be redirected in a minute.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleSaveConfirm(false)}>No</Button>
            <Button onClick={() => handleSaveConfirm(true)}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Are you sure you want to exit?</DialogTitle>
            <DialogDescription>
              Your progress will be lost if you exit now.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleExitConfirm(false)}>No</Button>
            <Button onClick={() => handleExitConfirm(true)}>Yes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


