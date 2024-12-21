"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { generateVerificationTokens } from "@/actions/tokens"
import { toast } from "sonner"

export const VerificationButton = ({ email }: { email: string }) => {

  const [sent, setSent] = useState(false)
  const sendVerificationLink = async () => {
    setSent(true)
    const response = await generateVerificationTokens(email)
    if (response.status) {
      setSent(true)
    }
    toast(response.message)
    setSent(false)
  }

  return (
    <div>
      <Button onClick={sendVerificationLink} disabled={sent} variant="link" className="p-0">Resend email</Button>
    </div>
  )
}
