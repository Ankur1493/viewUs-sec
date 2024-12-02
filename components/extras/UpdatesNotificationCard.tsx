"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface NotificationCardProps {
  message: string
  imageUrl: string
}

export const UpdatesNotificationCard: React.FC<NotificationCardProps> = ({ message, imageUrl }) => {

  const [status, setStatus] = useState(false)
  return (
    <Card className={cn("fixed bg-orange-50 bottom-4 rounded-r-3xl rounded-bl-3xl border-dashed border-orange-400 right-4 w-[450px] h-[250px] shadow-lg", status === true ? "hidden" : "block")}>
      <CardContent className="p-4">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2"
          onClick={() => setStatus(true)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-5 items-start ">
          <Image src={imageUrl} alt="Notification" width={100} height={100} className="w-1/2 h-1/2" />
          <p className="text-md">{message}</p>
        </div>
      </CardContent>
    </Card>
  )
}

